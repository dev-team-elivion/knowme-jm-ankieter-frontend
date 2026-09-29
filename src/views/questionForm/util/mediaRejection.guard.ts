import { MediaRejectionReasonDto } from '@/api/generated';

type MediaRejectionBody = {
  actual?: number;
  limit?: number;
  reason: MediaRejectionReasonDto;
};

const MEDIA_REJECTION_REASONS: string[] = Object.values(MediaRejectionReasonDto);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isMediaRejectionReason = (value: unknown): value is MediaRejectionReasonDto =>
  typeof value === 'string' && MEDIA_REJECTION_REASONS.includes(value);

const toOptionalNumber = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined;

export const toMediaRejection = (data: unknown): MediaRejectionBody | null => {
  if (!isRecord(data) || !isMediaRejectionReason(data.reason)) {
    return null;
  }
  return {
    actual: toOptionalNumber(data.actual),
    limit: toOptionalNumber(data.limit),
    reason: data.reason,
  };
};
