import { FieldPath, FieldValues } from 'react-hook-form';

export type FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  disabled?: boolean;
  helperText?: string;
  label: string;
  name: TName;
  placeholder?: string;
};

export type SelectOption = {
  label: string;
  value: string;
};
