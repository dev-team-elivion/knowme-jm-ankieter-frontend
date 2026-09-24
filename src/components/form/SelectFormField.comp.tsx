import { FormControl, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import { JSX, useId } from 'react';
import { FieldPath, FieldValues, useController, useFormContext } from 'react-hook-form';

import { FormFieldLabel } from '@/components/form/FormFieldLabel.comp.tsx';
import { useFormProviderKnowMeContext } from '@/components/form/FormProviderKnowMe.context.ts';
import { FormFieldProps, SelectOption } from '@/components/form/model/FormProps.model.ts';
import { isFormFieldRequired } from '@/components/form/util/isFormFieldRequired.util.ts';

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  options: SelectOption[];
} & FormFieldProps<TFieldValues, TName>;

export const SelectFormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  disabled,
  helperText,
  label,
  name,
  options,
  placeholder,
}: Props<TFieldValues, TName>): JSX.Element => {
  const theme = useTheme();
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
        select
        slotProps={{
          select: {
            displayEmpty: true,
            renderValue: selected => {
              const option = options.find(item => item.value === selected);
              return option ? (
                option.label
              ) : (
                <Typography component="span" sx={{ color: theme.colors.iconMuted }}>
                  {placeholder}
                </Typography>
              );
            },
          },
        }}
        value={field.value ?? ''}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};
