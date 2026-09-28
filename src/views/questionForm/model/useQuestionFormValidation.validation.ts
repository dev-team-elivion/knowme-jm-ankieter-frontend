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
  EXPECTED_ANSWER_MAX_LENGTH,
  MAX_EXPECTED_ANSWERS,
  MIN_ANSWERS,
  QUESTION_FORM_TYPES,
  QUESTION_PURPOSES,
  QUESTION_SOURCES,
  SCORING_RULES,
} from '@/views/questionForm/model/QuestionForm.constants.ts';
import {
  AnswerFormModel,
  QuestionFormModel,
  QuestionFormType,
} from '@/views/questionForm/model/QuestionForm.model.ts';
import { hasDuplicateExpectedAnswers } from '@/views/questionForm/util/expectedAnswer.util.ts';

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
              body: string().defined(),
              isCorrect: boolean().defined(),
              optionId: string().nullable().defined(),
            }),
          )
          .default([])
          .when(['purpose', 'type'], ([purpose, type]: unknown[], schema) => {
            if (type === QuestionTypeDto.ExpectedAnswer) {
              return schema;
            }
            const choiceSchema = schema
              .of(
                object({
                  body: string().trim().required(t('required')),
                  isCorrect: boolean().defined(),
                  optionId: string().nullable().defined(),
                }),
              )
              .min(MIN_ANSWERS, t('answersMin'));
            return purpose === QuestionPurposeDto.Test
              ? choiceSchema
                  .test('has-correct', t('answersCorrect'), (answers = []) =>
                    answers.length < MIN_ANSWERS ? true : countCorrect(answers) > 0,
                  )
                  .test(
                    'single-correct',
                    t('answersSingleCorrect'),
                    (answers = []) =>
                      type !== QuestionTypeDto.SingleChoice || countCorrect(answers) <= 1,
                  )
              : choiceSchema;
          }),
        body: string().trim().required(t('required')),
        businessKey: string()
          .default('')
          .when('hasManualKey', {
            is: true,
            then: schema => schema.trim().required(t('required')),
          }),
        categoryId: string().required(t('required')),
        expectedAnswers: array()
          .of(object({ value: string().defined() }))
          .default([])
          .when('type', {
            is: QuestionTypeDto.ExpectedAnswer,
            then: schema =>
              schema
                .of(
                  object({
                    value: string()
                      .trim()
                      .required(t('required'))
                      .max(
                        EXPECTED_ANSWER_MAX_LENGTH,
                        t('maxLength', { max: EXPECTED_ANSWER_MAX_LENGTH }),
                      ),
                  }),
                )
                .min(1, t('expectedAnswersMin'))
                .max(MAX_EXPECTED_ANSWERS, t('expectedAnswersMax', { max: MAX_EXPECTED_ANSWERS }))
                .test(
                  'unique',
                  t('expectedAnswersUnique'),
                  (answers = []) => !hasDuplicateExpectedAnswers(answers),
                ),
          }),
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
        type: mixed<QuestionFormType>().oneOf(QUESTION_FORM_TYPES).required(),
      }),
    [t],
  );
};
