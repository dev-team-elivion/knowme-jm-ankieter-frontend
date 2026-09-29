import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { JSX, useState } from 'react';

import { VersionHistoryDto } from '@/api/generated';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { SegmentedControl } from '@/components/segmentedControl/SegmentedControl.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { VersionCompareContent } from '@/views/questionHistory/components/VersionCompareContent.comp.tsx';
import { VersionPreviewContent } from '@/views/questionHistory/components/VersionPreviewContent.comp.tsx';
import { HistoryPanelMode } from '@/views/questionHistory/model/QuestionHistory.model.ts';

type Props = {
  questionId: string;
  revealIndex: number;
  selectedVersion: VersionHistoryDto;
  versions: VersionHistoryDto[];
};

const findOlderVersionId = (versions: VersionHistoryDto[], versionId: string): null | string => {
  const index = versions.findIndex(version => version.id === versionId);
  return versions.at(index + 1)?.id ?? null;
};

export const HistoryDetailPanel = ({
  questionId,
  revealIndex,
  selectedVersion,
  versions,
}: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionHistory.panel');
  const [mode, setMode] = useState<HistoryPanelMode>('preview');
  const [fromOverride, setFromOverride] = useState<null | string>(null);
  const [toOverride, setToOverride] = useState<null | string>(null);
  const toId = toOverride ?? selectedVersion.id;
  const fromId = fromOverride ?? findOlderVersionId(versions, toId);
  const isPreview = mode === 'preview';

  return (
    <SectionPanel
      actions={
        <SegmentedControl<HistoryPanelMode>
          ariaLabel={t('modeLabel')}
          items={[
            { icon: <VisibilityOutlinedIcon />, label: t('preview'), value: 'preview' },
            { icon: <CompareArrowsRoundedIcon />, label: t('compare'), value: 'compare' },
          ]}
          onChange={setMode}
          value={mode}
        />
      }
      description={isPreview ? t('description') : undefined}
      icon={isPreview ? VisibilityOutlinedIcon : CompareArrowsRoundedIcon}
      revealIndex={revealIndex}
      title={isPreview ? t('title', { number: selectedVersion.versionNo }) : t('compare')}
    >
      {isPreview ? (
        <VersionPreviewContent questionId={questionId} versionId={selectedVersion.id} />
      ) : (
        <VersionCompareContent
          fromId={fromId}
          onFromChange={setFromOverride}
          onToChange={setToOverride}
          questionId={questionId}
          toId={toId}
          versions={versions}
        />
      )}
    </SectionPanel>
  );
};
