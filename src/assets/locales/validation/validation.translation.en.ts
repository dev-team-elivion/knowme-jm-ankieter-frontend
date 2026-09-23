export type ValidationTranslation = {
  email: string;
  maxLength: string;
  minLength: string;
  required: string;
};

export const validationTranslation: ValidationTranslation = {
  email: 'Enter a valid email address.',
  maxLength: 'Use at most {{max}} characters.',
  minLength: 'Use at least {{min}} characters.',
  required: 'This field is required.',
};
