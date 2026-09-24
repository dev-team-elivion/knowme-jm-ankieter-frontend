import { FormControl, TextField } from '@mui/material';
import { HTMLInputTypeAttribute, JSX, useId } from 'react';
import { FieldPath, FieldValues, useController, useFormContext } from 'react-hook-form';

import { FormFieldLabel } from '@/components/form/FormFieldLabel.comp.tsx';
import { useFormProviderKnowMeContext } from '@/components/form/FormProviderKnowMe.context.ts';
import { FormFieldProps } from '@/components/form/model/FormProps.model.ts';
import { isFormFieldRequired } from '@/components/form/util/isFormFieldRequired.util.ts';

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  maxRows?: number;
  minRows?: number;
  multiline?: boolean;
  type?: HTMLInputTypeAttribute;
} & FormFieldProps<TFieldValues, TName>;

export const TextFormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  disabled,
  helperText,
  label,
  maxRows,
  minRows,
  multiline = false,
  name,
  placeholder,
  type = 'text',
}: Props<TFieldValues, TName>): JSX.Element => {
  const inputId = useId();
  const { control } = useFormContext<TFieldValues>();
  const { validation } = useFormProviderKnowMeContext();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <FormControl fullWidth>
      <FormFieldLabel
        htmlFor={inputId}
        isRequired={isFormFieldRequired(name, validation)}
        label={label}
      />
      <TextField
        {...field}
        disabled={disabled}
        error={error !== undefined}
        fullWidth
        helperText={error?.message ?? helperText}
        id={inputId}
        maxRows={multiline ? (maxRows ?? (minRows ?? 3) + 4) : undefined}
        minRows={multiline ? (minRows ?? 3) : undefined}
        multiline={multiline}
        placeholder={placeholder}
        type={type}
        value={field.value ?? ''}
      />
    </FormControl>
  );
};
