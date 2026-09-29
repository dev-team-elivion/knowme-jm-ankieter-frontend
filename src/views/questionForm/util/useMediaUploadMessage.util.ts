import { useCallback } from 'react';

import { MediaRejectionReasonDto } from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { MediaUploadIssue } from '@/views/questionForm/model/MediaUploadIssue.model.ts';
import {
  HEIC_PATTERN,
  QUICKTIME_PATTERN,
} from '@/views/questionForm/model/QuestionMedia.constants.ts';
import { useMediaFormatters } from '@/views/questionForm/util/useMediaFormatters.util.ts';

type Return = (issue: MediaUploadIssue, file: File) => string;

const isHeic = (file: File): boolean =>
  HEIC_PATTERN.test(file.name) || file.type === 'image/heic' || file.type === 'image/heif';

const isQuickTime = (file: File): boolean =>
  QUICKTIME_PATTERN.test(file.name) || file.type === 'video/quicktime';

export const useMediaUploadMessage = (): Return => {
  const { t } = useTranslationWithPrefix('views.questionForm.media.errors');
  const { formatDuration, formatSize } = useMediaFormatters();

  return useCallback(
    (issue: MediaUploadIssue, file: File): string => {
      if (issue.kind !== 'rejected') {
        return t(issue.kind);
      }
      if (issue.reason === MediaRejectionReasonDto.UnsupportedType) {
        if (isHeic(file)) {
          return t('unsupportedHeic');
        }
        return isQuickTime(file) ? t('unsupportedQuickTime') : t('UNSUPPORTED_TYPE');
      }
      if (
        issue.reason === MediaRejectionReasonDto.Unreadable ||
        issue.reason === MediaRejectionReasonDto.VideoCodecUnsupported ||
        issue.reason === MediaRejectionReasonDto.VideoNotFaststart
      ) {
        return t(issue.reason);
      }
      const { actual, limit } = issue;
      if (issue.reason === MediaRejectionReasonDto.FileTooLarge) {
        if (limit === undefined) {
          return t('fileTooLargeWithoutLimit');
        }
        return actual === undefined
          ? t('fileTooLargeWithoutActual', { limit: formatSize(limit) })
          : t('FILE_TOO_LARGE', { actual: formatSize(actual), limit: formatSize(limit) });
      }
      if (actual === undefined || limit === undefined) {
        return t('outOfLimits');
      }
      if (issue.reason === MediaRejectionReasonDto.VideoTooLong) {
        return t('VIDEO_TOO_LONG', {
          actual: formatDuration(actual),
          limit: formatDuration(limit),
        });
      }
      return t(issue.reason, { actual, limit });
    },
    [formatDuration, formatSize, t],
  );
};
