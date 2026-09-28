import { ExpectedAnswerFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';

export const normalizeExpectedAnswer = (answer: string): string =>
  answer
    .normalize('NFC')
    .replace(/[\s\p{Z}]+/gu, ' ')
    .trim()
    .toLowerCase();

export const hasDuplicateExpectedAnswers = (answers: ExpectedAnswerFormModel[]): boolean => {
  const normalized = answers
    .map(answer => normalizeExpectedAnswer(answer.value))
    .filter(value => value !== '');
  return new Set(normalized).size !== normalized.length;
};

export const createEmptyExpectedAnswer = (): ExpectedAnswerFormModel => ({ value: '' });
