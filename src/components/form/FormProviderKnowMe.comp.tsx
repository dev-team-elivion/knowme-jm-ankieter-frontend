import { JSX, useMemo } from 'react';
import { FieldValues, FormProvider, FormProviderProps } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';

import { FormProviderKnowMeContext } from '@/components/form/FormProviderKnowMe.context.ts';

type Props<TFieldValues extends FieldValues> = {
  validation: AnyObjectSchema;
} & FormProviderProps<TFieldValues>;

export const FormProviderKnowMe = <TFieldValues extends FieldValues>({
  children,
  validation,
  ...form
}: Props<TFieldValues>): JSX.Element => {
  const contextValue = useMemo(() => ({ validation }), [validation]);

  return (
    <FormProvider {...form}>
      <FormProviderKnowMeContext value={contextValue}>{children}</FormProviderKnowMeContext>
    </FormProvider>
  );
};
