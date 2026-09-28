import { MenuItem, Stack, TextField } from '@mui/material';
import { JSX } from 'react';

import { VersionHistoryDto } from '@/api/generated';
import { ErrorState } from '@/components/state/ErrorState.comp.tsx';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { LoadingState } from '@/components/state/LoadingState.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { VersionDiffContent } from '@/views/questionHistory/components/VersionDiffContent.comp.tsx';
import { STATE_MIN_HEIGHT } from '@/views/questionHistory/model/questionHistory.constants.ts';
import { useGetQuestionVersion } from '@/views/questionHistory/util/useGetQuestionVersion.util.ts';
import { toVersionSnapshot } from '@/views/questionHistory/util/versionDiff.util.ts';

type Props = {
  fromId: null | string;
  onFromChange: (versionId: string) => void;
  onToChange: (versionId: string) => void;
  questionId: string;
  toId: null | string;
  versions: VersionHistoryDto[];
};

export const VersionCompareContent = ({
  fromId,
  onFromChange,
  onToChange,
  questionId,
  toId,
  versions,
}: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionHistory');
  const from = useGetQuestionVersion(questionId, fromId);
  const to = useGetQuestionVersion(questionId, toId);

  if (versions.length < 2) {
    return <InfoCallout>{t('compare.needTwo')}</InfoCallout>;
  }

  const options = versions.map(version => (
    <MenuItem key={version.id} value={version.id}>
      {t('versionLabel', { number: version.versionNo })}
    </MenuItem>
  ));

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label={t('compare.from')}
          onChange={event => onFromChange(event.target.value)}
          select
          value={fromId ?? ''}
        >
          {options}
        </TextField>
        <TextField
          fullWidth
          label={t('compare.to')}
          onChange={event => onToChange(event.target.value)}
          select
          value={toId ?? ''}
        >
          {options}
        </TextField>
      </Stack>
      {from.isError || to.isError ? (
        <ErrorState
          isRetrying={from.isFetching || to.isFetching}
          minHeight={STATE_MIN_HEIGHT}
          onRetry={() => {
            from.retry();
            to.retry();
          }}
        />
      ) : from.version === undefined || to.version === undefined ? (
        <LoadingState minHeight={STATE_MIN_HEIGHT} />
      ) : (
        <VersionDiffContent
          from={toVersionSnapshot(from.version)}
          to={toVersionSnapshot(to.version)}
        />
      )}
    </Stack>
  );
};
