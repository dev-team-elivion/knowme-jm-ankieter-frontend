import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import { JSX } from 'react';

import { SavedQuestionPresentation } from '@/components/questionPresentation/SavedQuestionPresentation.comp.tsx';
import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { ErrorState } from '@/components/state/ErrorState.comp.tsx';
import { LoadingState } from '@/components/state/LoadingState.comp.tsx';
import { useGetQuestion } from '@/hooks/useGetQuestion.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { FOCUS_STAGE_MIN_HEIGHT } from '@/views/questionFocus/model/questionFocus.constants.ts';

type Props = {
  onShowCorrectChange: (showCorrect: boolean) => void;
  questionId: string;
  showCorrect: boolean;
};

export const FocusQuestionContent = ({
  onShowCorrectChange,
  questionId,
  showCorrect,
}: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionFocus');
  const { isError, isFetching, isNotFound, isPending, question, retry } =
    useGetQuestion(questionId);

  if (isNotFound) {
    return (
      <EmptyState
        description={t('notFound.description')}
        icon={SearchOffOutlinedIcon}
        title={t('notFound.title')}
      />
    );
  }

  if (isError) {
    return (
      <ErrorState isRetrying={isFetching} minHeight={FOCUS_STAGE_MIN_HEIGHT} onRetry={retry} />
    );
  }

  if (isPending || question === undefined) {
    return <LoadingState minHeight={FOCUS_STAGE_MIN_HEIGHT} />;
  }

  return (
    <SavedQuestionPresentation
      onShowCorrectChange={onShowCorrectChange}
      question={question}
      showCorrect={showCorrect}
    />
  );
};
