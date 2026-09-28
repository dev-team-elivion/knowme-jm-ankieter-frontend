export type ValidationTranslation = {
  answersCorrect: string;
  answersMin: string;
  answersSingleCorrect: string;
  email: string;
  expectedAnswersMax: string;
  expectedAnswersMin: string;
  expectedAnswersUnique: string;
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
  expectedAnswersMax: 'Add at most {{max}} expected answers.',
  expectedAnswersMin: 'Add at least one expected answer.',
  expectedAnswersUnique:
    'Each expected answer can appear only once. Letter case and spaces do not count.',
  maxLength: 'Use at most {{max}} characters.',
  minLength: 'Use at least {{min}} characters.',
  number: 'Enter a number.',
  positiveNumber: 'Enter a number greater than zero.',
  required: 'This field is required.',
};
