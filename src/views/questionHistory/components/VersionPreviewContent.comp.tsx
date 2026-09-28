import { JSX } from 'react';

import { ErrorState } from '@/components/state/ErrorState.comp.tsx';
import { LoadingState } from '@/components/state/LoadingState.comp.tsx';
import { VersionContent } from '@/views/questionHistory/components/VersionContent.comp.tsx';
import { STATE_MIN_HEIGHT } from '@/views/questionHistory/model/questionHistory.constants.ts';
import { useGetQuestionVersion } from '@/views/questionHistory/util/useGetQuestionVersion.util.ts';
import { toVersionSnapshot } from '@/views/questionHistory/util/versionDiff.util.ts';

type Props = {
  questionId: string;
  versionId: string;
};

export const VersionPreviewContent = ({ questionId, versionId }: Props): JSX.Element => {
  const { isError, isFetching, retry, version } = useGetQuestionVersion(questionId, versionId);

  if (isError) {
    return <ErrorState isRetrying={isFetching} minHeight={STATE_MIN_HEIGHT} onRetry={retry} />;
  }

  if (version === undefined) {
    return <LoadingState minHeight={STATE_MIN_HEIGHT} />;
  }

  return <VersionContent snapshot={toVersionSnapshot(version)} />;
};
