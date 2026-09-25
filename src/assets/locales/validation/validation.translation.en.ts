export type ValidationTranslation = {
  answersCorrect: string;
  answersMin: string;
  answersSingleCorrect: string;
  email: string;
  maxLength: string;
  minLength: string;
  number: string;
  positiveNumber: string;
  required: string;
};

export const validationTranslation: ValidationTranslation = {
  answersCorrect: 'Mark at least one correct answer.',
  answersMin: 'Add at least two answers.',
  answersSingleCorrect: 'Mark exactly one correct answer.',
  email: 'Enter a valid email address.',
  maxLength: 'Use at most {{max}} characters.',
  minLength: 'Use at least {{min}} characters.',
  number: 'Enter a number.',
  positiveNumber: 'Enter a number greater than zero.',
  required: 'This field is required.',
};
