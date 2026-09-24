import { createContext, use } from 'react';
import { AnyObjectSchema } from 'yup';

type FormProviderKnowMeContextValue = {
  validation: AnyObjectSchema | undefined;
};

export const FormProviderKnowMeContext = createContext<FormProviderKnowMeContextValue>({
  validation: undefined,
});

export const useFormProviderKnowMeContext = (): FormProviderKnowMeContextValue =>
  use(FormProviderKnowMeContext);
