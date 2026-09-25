import { ApiFieldErrorResponse, ApiFieldViolation } from '@/api/model/ApiFieldError.model.ts';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isApiFieldViolation = (value: unknown): value is ApiFieldViolation =>
  isRecord(value) && typeof value.field === 'string' && typeof value.message === 'string';

export const isApiFieldErrorResponse = (value: unknown): value is ApiFieldErrorResponse =>
  isRecord(value) &&
  typeof value.status === 'number' &&
  typeof value.title === 'string' &&
  typeof value.type === 'string' &&
  Array.isArray(value.violations) &&
  value.violations.every(isApiFieldViolation);
