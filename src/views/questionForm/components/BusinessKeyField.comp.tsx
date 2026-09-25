import { Checkbox, FormControlLabel, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { TextFormField } from '@/components/form/TextFormField.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';

type Props = {
  keyExample: string | undefined;
};

export const BusinessKeyField = ({ keyExample }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionForm.classification');
  const { control } = useFormContext<QuestionFormModel>();
  const { field } = useController({ control, name: 'hasManualKey' });

  return (
    <Stack spacing={1}>
      <FormControlLabel
        control={
          <Checkbox
            checked={field.value}
            onBlur={field.onBlur}
            onChange={event => field.onChange(event.target.checked)}
            slotProps={{ input: { ref: field.ref } }}
          />
        }
        label={t('businessKeyManual')}
        sx={{ alignSelf: 'flex-start' }}
      />
      {field.value ? (
        <TextFormField<QuestionFormModel, 'businessKey'>
          helperText={t('businessKeyManualHelper')}
          label={t('businessKey')}
          name="businessKey"
        />
      ) : (
        <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
          {keyExample
            ? t('businessKeyAuto', { example: keyExample })
            : t('businessKeyAutoNoCategory')}
        </Typography>
      )}
    </Stack>
  );
};
