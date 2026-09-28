import { HISTORY_FIELDS, HistoryField } from '@/views/questionHistory/model/HistoryField.model.ts';

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(item => typeof item === 'string');

export const isHistoryField = (value: string): value is HistoryField =>
  HISTORY_FIELDS.some(field => field === value);
