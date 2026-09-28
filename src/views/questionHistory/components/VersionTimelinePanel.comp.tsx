import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import { Stack } from '@mui/material';
import { JSX } from 'react';

import { VersionHistoryDto } from '@/api/generated';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { VersionHistoryCard } from '@/views/questionHistory/components/VersionHistoryCard.comp.tsx';

type Props = {
  locale: string;
  onSelect: (versionId: string) => void;
  revealIndex: number;
  selectedVersionId: null | string;
  versions: VersionHistoryDto[];
};

export const VersionTimelinePanel = ({
  locale,
  onSelect,
  revealIndex,
  selectedVersionId,
  versions,
}: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionHistory.versions');

  return (
    <SectionPanel
      description={t('description')}
      icon={TimelineRoundedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <Stack component="ol" spacing={1.5} sx={{ m: 0, p: 0 }}>
        {versions.map(version => (
          <VersionHistoryCard
            isSelected={version.id === selectedVersionId}
            key={version.id}
            locale={locale}
            onSelect={onSelect}
            version={version}
          />
        ))}
      </Stack>
    </SectionPanel>
  );
};
