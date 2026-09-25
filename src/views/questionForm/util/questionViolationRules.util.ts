import { Path } from 'react-hook-form';

import { ViewsTranslation } from '@/assets/locales/views/views.translation.en.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';

export type QuestionServerErrorKey = keyof ViewsTranslation['questionForm']['serverErrors'];

export type QuestionViolationMatch = {
  field: Path<QuestionFormModel>;
  messageKey: QuestionServerErrorKey;
};

type ViolationRule = {
  pattern: RegExp;
  toMatch: (groups: RegExpMatchArray) => QuestionViolationMatch;
};

const fixed =
  (field: Path<QuestionFormModel>, messageKey: QuestionServerErrorKey) =>
  (): QuestionViolationMatch => ({ field, messageKey });

const VIOLATION_RULES: ViolationRule[] = [
  {
    pattern: /^answers\.(\d+)\.translations(\.|$)/,
    toMatch: groups => ({ field: `answers.${Number(groups[1])}.body`, messageKey: 'answerBody' }),
  },
  { pattern: /^answers\.isCorrect$/, toMatch: fixed('answers', 'answersCorrect') },
  { pattern: /^answers\.\d+\.isCorrect$/, toMatch: fixed('answers', 'answersCorrect') },
  { pattern: /^answers(\.|$)/, toMatch: fixed('answers', 'answers') },
  { pattern: /^maxPoints$/, toMatch: fixed('maxPoints', 'maxPoints') },
  { pattern: /^(translations|sourceLocale)(\.|$)/, toMatch: fixed('body', 'body') },
  { pattern: /^scoringRule$/, toMatch: fixed('scoringRule', 'scoringRule') },
  { pattern: /^categoryId$/, toMatch: fixed('categoryId', 'categoryId') },
  { pattern: /^source$/, toMatch: fixed('source', 'source') },
  { pattern: /^sourceName$/, toMatch: fixed('sourceName', 'sourceName') },
  { pattern: /^businessKey$/, toMatch: fixed('businessKey', 'businessKey') },
  { pattern: /^tagIds(\.|$)/, toMatch: fixed('tags', 'tags') },
  { pattern: /^positionCodes(\.|$)/, toMatch: fixed('positionCodes', 'positionCodes') },
];

const normalizeFieldPath = (field: string): string =>
  field.replace(/\[(\d+)\]/g, '.$1').replace(/^version\./, '');

export const matchQuestionViolation = (field: string): QuestionViolationMatch | undefined => {
  const normalized = normalizeFieldPath(field);
  return VIOLATION_RULES.flatMap(rule => {
    const groups = normalized.match(rule.pattern);
    return groups === null ? [] : [rule.toMatch(groups)];
  }).at(0);
};
