import { MediaRejectionReasonDto } from '@/api/generated';

export type MediaUploadIssue =
  | { actual?: number; kind: 'rejected'; limit?: number; reason: MediaRejectionReasonDto }
  | { kind: 'forbidden' | 'notADraft' | 'unavailable' | 'unknown' };
