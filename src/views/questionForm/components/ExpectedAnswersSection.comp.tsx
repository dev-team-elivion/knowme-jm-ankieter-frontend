import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SpellcheckRoundedIcon from '@mui/icons-material/SpellcheckRounded';
import { Box, Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { TextFormField } from '@/components/form/TextFormField.comp.tsx';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { innerPanelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { MAX_EXPECTED_ANSWERS } from '@/views/questionForm/model/QuestionForm.constants.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';
import { createEmptyExpectedAnswer } from '@/views/questionForm/util/expectedAnswer.util.ts';

const REMOVE_BUTTON_SX = { alignItems: 'center', display: 'flex', height: 40, mt: 3 } as const;

type Props = {
  revealIndex: number;
};

export const ExpectedAnswersSection = ({ revealIndex }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionForm.expectedAnswers');
  const {
    control,
    formState: { errors, isSubmitted },
    trigger,
  } = useFormContext<QuestionFormModel>();
  const { append, fields, remove } = useFieldArray({ control, name: 'expectedAnswers' });
  const listError = errors.expectedAnswers?.root?.message ?? errors.expectedAnswers?.message;
  const canAdd = fields.length < MAX_EXPECTED_ANSWERS;
  const canRemove = fields.length > 1;

  const handleRemove = (index: number): void => {
    remove(index);
    if (isSubmitted) {
      void trigger('expectedAnswers');
    }
  };

  return (
    <SectionPanel
      description={t('description')}
      icon={SpellcheckRoundedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <Stack spacing={1.5}>
        {fields.map((field, index) => {
          const number = index + 1;
          return (
            <Stack
              direction="row"
              key={field.id}
              spacing={1.5}
              sx={{ ...innerPanelSx(theme.colors), alignItems: 'flex-start', px: 2, py: 1.5 }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <TextFormField<QuestionFormModel, `expectedAnswers.${number}.value`>
                  label={t('answerLabel', { number })}
                  name={`expectedAnswers.${index}.value`}
                  placeholder={t('answerPlaceholder')}
                />
              </Box>
              <Box sx={REMOVE_BUTTON_SX}>
                <Tooltip title={canRemove ? t('remove', { number }) : t('removeDisabled')}>
                  <span>
                    <IconButton
                      aria-label={t('remove', { number })}
                      disabled={!canRemove}
                      onClick={() => handleRemove(index)}
                      size="small"
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </Stack>
          );
        })}
        {listError && (
          <Typography role="alert" sx={{ color: theme.colors.red }} variant="caption">
            {listError}
          </Typography>
        )}
        <Box>
          <Tooltip title={canAdd ? '' : t('addDisabled', { max: MAX_EXPECTED_ANSWERS })}>
            <span>
              <Button
                disabled={!canAdd}
                onClick={() => append(createEmptyExpectedAnswer())}
                startIcon={<AddRoundedIcon />}
                variant="outlined"
              >
                {t('add')}
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Stack>
    </SectionPanel>
  );
};
