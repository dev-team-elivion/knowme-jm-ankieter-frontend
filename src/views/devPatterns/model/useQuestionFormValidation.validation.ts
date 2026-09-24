import { useMemo } from 'react';
import { object, ObjectSchema, string } from 'yup';

import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionFormModel } from '@/views/devPatterns/model/Question.model.ts';
import { QUESTION_CATEGORIES } from '@/views/devPatterns/model/questionTable.constants.ts';

const CONTENT_MIN_LENGTH = 10;
const CONTENT_MAX_LENGTH = 300;

export const useQuestionFormValidation = (): ObjectSchema<QuestionFormModel> => {
  const { t } = useTranslationWithPrefix('validation');

  return useMemo(
    () =>
      object({
        authorEmail: string().trim().required(t('required')).email(t('email')),
        category: string().required(t('required')).oneOf(QUESTION_CATEGORIES, t('required')),
        content: string()
          .trim()
          .required(t('required'))
          .min(CONTENT_MIN_LENGTH, t('minLength', { min: CONTENT_MIN_LENGTH }))
          .max(CONTENT_MAX_LENGTH, t('maxLength', { max: CONTENT_MAX_LENGTH })),
      }),
    [t],
  );
};
