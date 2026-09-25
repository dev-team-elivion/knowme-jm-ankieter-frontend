import { Autocomplete, FormControl, TextField } from '@mui/material';
import { JSX, useId } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormFieldLabel } from '@/components/form/FormFieldLabel.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';

const NO_SUGGESTIONS: string[] = [];

const normalizeCodes = (codes: string[]): string[] => [
  ...new Set(codes.map(code => code.trim()).filter(Boolean)),
];

export const PositionCodesField = (): JSX.Element => {
  const inputId = useId();
  const { t } = useTranslationWithPrefix('views.questionForm.classification');
  const { control } = useFormContext<QuestionFormModel>();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name: 'positionCodes' });

  return (
    <FormControl fullWidth>
      <FormFieldLabel htmlFor={inputId} isRequired={false} label={t('positionCodes')} />
      <Autocomplete<string, true, false, true>
        autoSelect
        freeSolo
        id={inputId}
        multiple
        onBlur={field.onBlur}
        onChange={(_event, codes) => field.onChange(normalizeCodes(codes))}
        options={NO_SUGGESTIONS}
        renderInput={params => (
          <TextField
            {...params}
            error={error !== undefined}
            helperText={error?.message}
            inputRef={field.ref}
            placeholder={field.value.length === 0 ? t('positionCodesPlaceholder') : undefined}
          />
        )}
        value={field.value}
      />
    </FormControl>
  );
};
