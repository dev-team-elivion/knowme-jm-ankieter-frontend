import { Accept } from 'react-dropzone';

import { MediaKindDto } from '@/api/generated';

const MEGABYTE = 1024 * 1024;

export const MEDIA_ACCEPT: Accept = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'video/mp4': ['.mp4'],
};

export const MEDIA_SIZE_LIMIT_BYTES = new Map<MediaKindDto, number>([
  [MediaKindDto.Image, 5 * MEGABYTE],
  [MediaKindDto.Video, 20 * MEGABYTE],
]);

export const MEDIA_MAX_FILE_SIZE_BYTES = 20 * MEGABYTE;

export const MEDIA_PREVIEW_MAX_HEIGHT = 320;

export const ANSWER_MEDIA_PREVIEW_MAX_HEIGHT = 180;

export const HEIC_PATTERN = /\.(heic|heif)$/i;

export const QUICKTIME_PATTERN = /\.(mov|qt)$/i;
