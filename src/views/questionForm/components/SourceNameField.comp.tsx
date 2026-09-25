import { Autocomplete, FormControl, TextField } from '@mui/material';
import { JSX, useDeferredValue, useId } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { QuestionSourceDto } from '@/api/generated';
import { FormFieldLabel } from '@/components/form/FormFieldLabel.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';
import { useGetProcedureNames } from '@/views/questionForm/util/useGetProcedureNames.util.ts';

export const SourceNameField = (): JSX.Element => {
  const inputId = useId();
  const { t } = useTranslationWithPrefix('views.questionForm.classification');
  const { control } = useFormContext<QuestionFormModel>();
  const source = useWatch({ control, name: 'source' });
  const {
    field,
    fieldState: { error },
  } = useController({ control, name: 'sourceName' });
  const search = useDeferredValue(field.value);
  const { procedureNames } = useGetProcedureNames({
    enabled: source === QuestionSourceDto.Procedure,
    search,
  });

  return (
    <FormControl fullWidth>
      <FormFieldLabel htmlFor={inputId} isRequired={false} label={t('sourceName')} />
      <Autocomplete<string, false, false, true>
        filterOptions={items => items}
        freeSolo
        id={inputId}
        inputValue={field.value}
        onBlur={field.onBlur}
        onChange={(_event, value) => field.onChange(value ?? '')}
        onInputChange={(_event, value) => field.onChange(value)}
        options={source === QuestionSourceDto.Procedure ? procedureNames : []}
        renderInput={params => (
          <TextField
            {...params}
            error={error !== undefined}
            helperText={error?.message}
            inputRef={field.ref}
            placeholder={t('sourceNamePlaceholder')}
          />
        )}
        value={field.value}
      />
    </FormControl>
  );
};
