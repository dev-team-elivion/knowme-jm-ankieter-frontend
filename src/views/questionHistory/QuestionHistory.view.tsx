import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import { Box, Stack, useTheme } from '@mui/material';
import { JSX, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { ErrorState } from '@/components/state/ErrorState.comp.tsx';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { LoadingState } from '@/components/state/LoadingState.comp.tsx';
import { panelSx } from '@/config/theme/uiTokens.ts';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { SOURCE_LOCALE } from '@/views/questionForm/model/QuestionForm.constants.ts';
import { ClassificationHistoryPanel } from '@/views/questionHistory/components/ClassificationHistoryPanel.comp.tsx';
import { HistoryDetailPanel } from '@/views/questionHistory/components/HistoryDetailPanel.comp.tsx';
import { QuestionHistoryHeader } from '@/views/questionHistory/components/QuestionHistoryHeader.comp.tsx';
import { VersionTimelinePanel } from '@/views/questionHistory/components/VersionTimelinePanel.comp.tsx';
import { STATE_MIN_HEIGHT } from '@/views/questionHistory/model/questionHistory.constants.ts';
import { useGetQuestionHistory } from '@/views/questionHistory/util/useGetQuestionHistory.util.ts';

const LAYOUT_SX = {
  alignItems: 'start',
  display: 'grid',
  gap: 3,
  gridTemplateColumns: 'minmax(360px, 5fr) minmax(0, 7fr)',
} as const;

export const QuestionHistoryView = (): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { t } = useTranslationWithPrefix('views.questionHistory');
  const { t: tForm } = useTranslationWithPrefix('views.questionForm');
  const [selectedVersionId, setSelectedVersionId] = useState<null | string>(null);
  const { history, isError, isFetching, isNotFound, retry } = useGetQuestionHistory(questionId);

  if (isNotFound) {
    return (
      <Box sx={panelSx(theme.colors)}>
        <EmptyState
          action={{
            label: tForm('backToBank'),
            onClick: () => void navigate(RouteEnum.QUESTION_BANK),
          }}
          description={t('notFound.description')}
          icon={SearchOffOutlinedIcon}
          title={t('notFound.title')}
        />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={panelSx(theme.colors)}>
        <ErrorState isRetrying={isFetching} onRetry={retry} />
      </Box>
    );
  }

  if (history === undefined) {
    return (
      <Box sx={LAYOUT_SX}>
        <Box sx={panelSx(theme.colors)}>
          <LoadingState minHeight={STATE_MIN_HEIGHT} />
        </Box>
        <Box sx={panelSx(theme.colors)}>
          <LoadingState minHeight={STATE_MIN_HEIGHT} />
        </Box>
      </Box>
    );
  }

  const selectedVersion =
    history.versions.find(version => version.id === selectedVersionId) ?? history.versions.at(0);

  return (
    <Stack spacing={3}>
      <QuestionHistoryHeader businessKey={history.businessKey} questionId={history.questionId} />
      <InfoCallout>{t('readOnly')}</InfoCallout>
      <Box sx={LAYOUT_SX}>
        <Stack spacing={3}>
          <VersionTimelinePanel
            locale={SOURCE_LOCALE}
            onSelect={setSelectedVersionId}
            revealIndex={1}
            selectedVersionId={selectedVersion?.id ?? null}
            versions={history.versions}
          />
          <ClassificationHistoryPanel
            events={history.events}
            locale={SOURCE_LOCALE}
            revealIndex={3}
          />
        </Stack>
        {selectedVersion && (
          <HistoryDetailPanel
            questionId={history.questionId}
            revealIndex={2}
            selectedVersion={selectedVersion}
            versions={history.versions}
          />
        )}
      </Box>
    </Stack>
  );
};
