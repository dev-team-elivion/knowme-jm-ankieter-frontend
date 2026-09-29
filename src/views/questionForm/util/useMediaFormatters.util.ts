import { useCallback, useMemo } from 'react';

import { MediaAssetDto, MediaKindDto } from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { bytesToMegabytes, splitDuration } from '@/views/questionForm/util/mediaUpload.util.ts';

type Return = {
  describeAsset: (asset: MediaAssetDto) => string;
  formatDuration: (totalSeconds: number) => string;
  formatSize: (bytes: number) => string;
};

export const useMediaFormatters = (): Return => {
  const { i18n, t } = useTranslationWithPrefix('views.questionForm.media.units');
  const numberFormat = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }),
    [i18n.language],
  );

  const formatSize = useCallback(
    (bytes: number) => t('megabytes', { value: numberFormat.format(bytesToMegabytes(bytes)) }),
    [numberFormat, t],
  );

  const formatDuration = useCallback(
    (totalSeconds: number) => {
      const { minutes, seconds } = splitDuration(totalSeconds);
      if (minutes === 0) {
        return t('seconds', { seconds });
      }
      return seconds === 0 ? t('minutes', { minutes }) : t('minutesSeconds', { minutes, seconds });
    },
    [t],
  );

  const describeAsset = useCallback(
    (asset: MediaAssetDto) => {
      const dimensions = t('dimensions', { height: asset.height, width: asset.width });
      const size = formatSize(asset.sizeBytes);
      const parts =
        asset.kind === MediaKindDto.Video && asset.durationMs !== undefined
          ? [formatDuration(asset.durationMs / 1000), dimensions, size]
          : [dimensions, size];
      return parts.join(' · ');
    },
    [formatDuration, formatSize, t],
  );

  return { describeAsset, formatDuration, formatSize };
};
