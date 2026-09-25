import { Box, Radio, RadioGroup, Stack, Typography, useTheme } from '@mui/material';
import { JSX, useId } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormFieldLabel } from '@/components/form/FormFieldLabel.comp.tsx';
import { innerPanelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { SCORING_RULES } from '@/views/questionForm/model/QuestionForm.constants.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';

type Props = {
  label: string;
};

export const ScoringRuleField = ({ label }: Props): JSX.Element => {
  const theme = useTheme();
  const groupId = useId();
  const labelId = useId();
  const { t } = useTranslationWithPrefix('views.dictionaries.scoringRule');
  const { control } = useFormContext<QuestionFormModel>();
  const { field } = useController({ control, name: 'scoringRule' });

  return (
    <Box>
      <FormFieldLabel htmlFor={groupId} id={labelId} isRequired label={label} />
      <RadioGroup
        aria-labelledby={labelId}
        id={groupId}
        name={field.name}
        onChange={field.onChange}
        sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
        value={field.value}
      >
        {SCORING_RULES.map(rule => {
          const isSelected = field.value === rule;
          return (
            <Stack
              component="label"
              direction="row"
              key={rule}
              spacing={1}
              sx={{
                ...innerPanelSx(theme.colors),
                '&:hover': { borderColor: theme.colors.borderStrong },
                alignItems: 'flex-start',
                background: isSelected ? theme.colors.accentBg : theme.colors.bgCard2,
                borderColor: isSelected ? theme.colors.accentBorder : theme.colors.border,
                cursor: 'pointer',
                p: 1.5,
                transition: 'border-color 0.18s, background 0.18s',
              }}
            >
              <Radio
                slotProps={{ input: { ref: isSelected ? field.ref : undefined } }}
                sx={{ mt: -0.5 }}
                value={rule}
              />
              <Stack spacing={0.5}>
                <Typography sx={{ color: theme.colors.textPrimary }} variant="subtitle2">
                  {t(`${rule}.label`)}
                </Typography>
                <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
                  {t(`${rule}.description`)}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </RadioGroup>
    </Box>
  );
};
