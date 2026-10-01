import { MediaKindDto, MediaRejectionReasonDto } from '@/api/generated';
import { hasHttpStatus, isAxiosError } from '@/api/guards/isAxiosError.guard.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { MediaUploadIssue } from '@/views/questionForm/model/MediaUploadIssue.model.ts';
import { MEDIA_SIZE_LIMIT_BYTES } from '@/views/questionForm/model/QuestionMedia.constants.ts';
import { toMediaRejection } from '@/views/questionForm/util/mediaRejection.guard.ts';

const guessMediaKind = (file: File): MediaKindDto | null => {
  if (file.type.startsWith('image/')) {
    return MediaKindDto.Image;
  }
  if (file.type.startsWith('video/')) {
    return MediaKindDto.Video;
  }
  return null;
};

export const findLocalMediaIssue = (file: File): MediaUploadIssue | null => {
  const kind = guessMediaKind(file);
  const limit = kind === null ? undefined : MEDIA_SIZE_LIMIT_BYTES.get(kind);
  if (limit === undefined || file.size <= limit) {
    return null;
  }
  return {
    actual: file.size,
    kind: 'rejected',
    limit,
    reason: MediaRejectionReasonDto.FileTooLarge,
  };
};

export const toDropRejectionIssue = (file: File): MediaUploadIssue =>
  findLocalMediaIssue(file) ?? {
    kind: 'rejected',
    reason: MediaRejectionReasonDto.UnsupportedType,
  };

const STATUS_ISSUES: [HttpStatusEnum, MediaUploadIssue][] = [
  [HttpStatusEnum.CONFLICT, { kind: 'notADraft' }],
  [HttpStatusEnum.FORBIDDEN, { kind: 'forbidden' }],
  [
    HttpStatusEnum.PAYLOAD_TOO_LARGE,
    { kind: 'rejected', reason: MediaRejectionReasonDto.FileTooLarge },
  ],
  [HttpStatusEnum.SERVICE_UNAVAILABLE, { kind: 'unavailable' }],
];

export const toMediaUploadIssue = (error: unknown): MediaUploadIssue => {
  if (!isAxiosError(error)) {
    return { kind: 'unknown' };
  }
  const rejection = toMediaRejection(error.response?.data);
  if (rejection) {
    return { ...rejection, kind: 'rejected' };
  }
  const match = STATUS_ISSUES.find(([status]) => hasHttpStatus(error, status));
  return match ? match[1] : { kind: 'unknown' };
};

export const bytesToMegabytes = (bytes: number): number =>
  Math.max(0.1, Math.round((bytes / (1024 * 1024)) * 10) / 10);

export const splitDuration = (totalSeconds: number): { minutes: number; seconds: number } => ({
  minutes: Math.floor(totalSeconds / 60),
  seconds: Math.round(totalSeconds % 60),
});
