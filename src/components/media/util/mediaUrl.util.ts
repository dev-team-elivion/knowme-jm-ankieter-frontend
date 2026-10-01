import { CONFIG } from '@/config/config.ts';

export const buildMediaUrl = (assetId: string): string =>
  `${CONFIG.HOST}/api/v1/media/${encodeURIComponent(assetId)}`;
