import { Box, useTheme } from '@mui/material';
import { JSX, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ErrorState } from '@/components/state/ErrorState.comp.tsx';
import { panelSx } from '@/config/theme/uiTokens.ts';
import { useGetQuestion } from '@/hooks/useGetQuestion.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionCreateForm } from '@/views/questionForm/components/QuestionCreateForm.comp.tsx';
import { QuestionFormSkeleton } from '@/views/questionForm/components/QuestionFormSkeleton.comp.tsx';
import { isQuestionFormType } from '@/views/questionForm/util/questionEnums.guard.ts';
import {
  createEmptyQuestionForm,
  toDuplicateQuestionForm,
} from '@/views/questionForm/util/questionFormMapping.util.ts';
import { DUPLICATE_OF_PARAM } from '@/views/questionForm/util/questionRoutes.util.ts';

export const QuestionCreateView = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionForm.create');
  const [searchParams] = useSearchParams();
  const duplicateOf = searchParams.get(DUPLICATE_OF_PARAM) ?? undefined;
  const [emptyForm] = useState(createEmptyQuestionForm);
  const { isError, isFetching, isPending, question, retry } = useGetQuestion(duplicateOf);

  if (duplicateOf === undefined) {
    return <QuestionCreateForm defaultValues={emptyForm} description={t('description')} />;
  }

  if (isError) {
    return (
      <Box sx={panelSx(theme.colors)}>
        <ErrorState isRetrying={isFetching} onRetry={retry} />
      </Box>
    );
  }

  if (isPending || question === undefined) {
    return <QuestionFormSkeleton />;
  }

  if (!isQuestionFormType(question.type)) {
    return <QuestionCreateForm defaultValues={emptyForm} description={t('description')} />;
  }

  return (
    <QuestionCreateForm
      defaultValues={toDuplicateQuestionForm(question, question.type)}
      description={t('duplicateDescription', { key: question.businessKey })}
      key={question.id}
    />
  );
};
