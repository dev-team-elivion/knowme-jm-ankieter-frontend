import { useMemo } from 'react';
import { array, boolean, mixed, number, object, ObjectSchema, string } from 'yup';

import {
  QuestionPurposeDto,
  QuestionSourceDto,
  QuestionTypeDto,
  ScoringRuleDto,
} from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import {
  CHOICE_QUESTION_TYPES,
  MIN_ANSWERS,
  QUESTION_PURPOSES,
  QUESTION_SOURCES,
  SCORING_RULES,
} from '@/views/questionForm/model/QuestionForm.constants.ts';
import {
  AnswerFormModel,
  ChoiceQuestionType,
  QuestionFormModel,
} from '@/views/questionForm/model/QuestionForm.model.ts';

const countCorrect = (answers: AnswerFormModel[]): number =>
  answers.filter(answer => answer.isCorrect).length;

export const useQuestionFormValidation = (): ObjectSchema<QuestionFormModel> => {
  const { t } = useTranslationWithPrefix('validation');

  return useMemo(
    () =>
      object({
        answers: array()
          .of(
            object({
              body: string().trim().required(t('required')),
              isCorrect: boolean().defined(),
              optionId: string().nullable().defined(),
            }),
          )
          .min(MIN_ANSWERS, t('answersMin'))
          .default([])
          .when(['purpose', 'type'], ([purpose, type]: unknown[], schema) =>
            purpose === QuestionPurposeDto.Test
              ? schema
                  .test('has-correct', t('answersCorrect'), (answers = []) =>
                    answers.length < MIN_ANSWERS ? true : countCorrect(answers) > 0,
                  )
                  .test(
                    'single-correct',
                    t('answersSingleCorrect'),
                    (answers = []) =>
                      type !== QuestionTypeDto.SingleChoice || countCorrect(answers) <= 1,
                  )
              : schema,
          ),
        body: string().trim().required(t('required')),
        businessKey: string()
          .default('')
          .when('hasManualKey', {
            is: true,
            then: schema => schema.trim().required(t('required')),
          }),
        categoryId: string().required(t('required')),
        explanation: string().default(''),
        hasManualKey: boolean().default(false),
        maxPoints: number()
          .typeError(t('number'))
          .moreThan(0, t('positiveNumber'))
          .required(t('required')),
        positionCodes: array().of(string().required()).default([]),
        purpose: mixed<QuestionPurposeDto>().oneOf(QUESTION_PURPOSES).required(),
        scoringRule: mixed<ScoringRuleDto>().oneOf(SCORING_RULES).required(t('required')),
        source: mixed<'' | QuestionSourceDto>()
          .oneOf(QUESTION_SOURCES, t('required'))
          .required(t('required')),
        sourceName: string().default(''),
        tags: array()
          .of(
            object({
              code: string().required(),
              id: string().required(),
              label: string().required(),
            }),
          )
          .default([]),
        type: mixed<ChoiceQuestionType>().oneOf(CHOICE_QUESTION_TYPES).required(),
      }),
    [t],
  );
};
