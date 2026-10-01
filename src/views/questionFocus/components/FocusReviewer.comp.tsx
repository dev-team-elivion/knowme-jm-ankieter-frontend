import { Stack } from '@mui/material';
import { JSX, useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { ErrorState } from '@/components/state/ErrorState.comp.tsx';
import { LoadingState } from '@/components/state/LoadingState.comp.tsx';
import { usePrefetchQuestion } from '@/hooks/usePrefetchQuestion.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionBankQuery } from '@/views/questionBank/model/QuestionBank.model.ts';
import { FocusNavBar } from '@/views/questionFocus/components/FocusNavBar.comp.tsx';
import { FocusStage } from '@/views/questionFocus/components/FocusStage.comp.tsx';
import {
  FOCUS_LOAD_MORE_THRESHOLD,
  FOCUS_STAGE_MIN_HEIGHT,
} from '@/views/questionFocus/model/questionFocus.constants.ts';
import { resolveFocusPosition } from '@/views/questionFocus/util/focusOrder.util.ts';
import { useFocusKeyboard } from '@/views/questionFocus/util/useFocusKeyboard.util.ts';
import { useGetFocusQuestionIds } from '@/views/questionFocus/util/useGetFocusQuestionIds.util.ts';
import {
  buildQuestionBankPath,
  buildQuestionEditPath,
  buildQuestionFocusPath,
  FOCUS_QUESTION_PARAM,
  FOCUS_SESSION_PARAM,
} from '@/views/questionForm/util/questionRoutes.util.ts';

type Props = {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  query: QuestionBankQuery;
};

export const FocusReviewer = ({ hasActiveFilters, onClearFilters, query }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionFocus');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefetchQuestion = usePrefetchQuestion();
  const [direction, setDirection] = useState(1);
  const [showCorrect, setShowCorrect] = useState(false);
  const sessionId = searchParams.get(FOCUS_SESSION_PARAM) ?? '';
  const requestedId = searchParams.get(FOCUS_QUESTION_PARAM) ?? undefined;
  const source = useGetFocusQuestionIds(query, sessionId);
  const position = resolveFocusPosition(source.ids, requestedId, source.hasMore);
  const { activeId, index, isResolving, nextId, orderedIds, previousId } = position;
  const total = source.total + (orderedIds.length - source.ids.length);
  const shouldLoadMore =
    source.hasMore &&
    !source.isFetchingMore &&
    (isResolving || index >= orderedIds.length - FOCUS_LOAD_MORE_THRESHOLD);

  const goTo = useCallback(
    (questionId: string | undefined, slideDirection: number) => {
      if (questionId === undefined) {
        return;
      }
      setDirection(slideDirection);
      void navigate(buildQuestionFocusPath(searchParams, questionId), { replace: true });
    },
    [navigate, searchParams],
  );
  const goNext = useCallback(() => goTo(nextId, 1), [goTo, nextId]);
  const goPrevious = useCallback(() => goTo(previousId, -1), [goTo, previousId]);
  const exit = useCallback(
    () => void navigate(buildQuestionBankPath(searchParams)),
    [navigate, searchParams],
  );

  useFocusKeyboard({ onExit: exit, onNext: goNext, onPrevious: goPrevious });

  useEffect(() => {
    if (shouldLoadMore) {
      source.loadMore();
    }
  }, [shouldLoadMore, source]);

  useEffect(() => {
    [previousId, nextId].filter((id): id is string => id !== undefined).forEach(prefetchQuestion);
  }, [nextId, prefetchQuestion, previousId]);

  if (source.isError) {
    return (
      <ErrorState
        isRetrying={source.isRetrying}
        minHeight={FOCUS_STAGE_MIN_HEIGHT}
        onRetry={source.retry}
      />
    );
  }

  if (source.isLoading || isResolving) {
    return <LoadingState minHeight={FOCUS_STAGE_MIN_HEIGHT} />;
  }

  if (activeId === undefined) {
    return hasActiveFilters ? (
      <EmptyState
        action={{ label: t('empty.clearFilters'), onClick: onClearFilters }}
        description={t('empty.noMatchDescription')}
        title={t('empty.noMatchTitle')}
      />
    ) : (
      <EmptyState description={t('empty.description')} title={t('empty.title')} />
    );
  }

  return (
    <Stack spacing={2}>
      <FocusNavBar
        editPath={buildQuestionEditPath(activeId, buildQuestionFocusPath(searchParams, activeId))}
        hasNext={nextId !== undefined}
        hasPrevious={previousId !== undefined}
        onNext={goNext}
        onPrevious={goPrevious}
        position={index + 1}
        total={total}
      />
      <FocusStage
        direction={direction}
        onNext={goNext}
        onPrevious={goPrevious}
        onShowCorrectChange={setShowCorrect}
        questionId={activeId}
        showCorrect={showCorrect}
      />
    </Stack>
  );
};
