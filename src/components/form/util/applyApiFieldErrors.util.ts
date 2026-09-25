import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

import { isApiFieldErrorResponse } from '@/api/guards/isApiFieldErrorResponse.guard.ts';
import { hasHttpStatus, isAxiosError } from '@/api/guards/isAxiosError.guard.ts';
import { ApiFieldViolation } from '@/api/model/ApiFieldError.model.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';

export type ApiFieldErrorsResult<TFieldValues extends FieldValues> = {
  mappedFields: Path<TFieldValues>[];
  unmappedViolations: ApiFieldViolation[];
};

export type ApiViolationResolver<TFieldValues extends FieldValues> = (
  violation: ApiFieldViolation,
) => ResolvedFieldError<TFieldValues> | undefined;

export type ResolvedFieldError<TFieldValues extends FieldValues> = {
  field: Path<TFieldValues>;
  message: string;
};

export const resolveByFieldName =
  <TFieldValues extends FieldValues>(
    fields: readonly Path<TFieldValues>[],
  ): ApiViolationResolver<TFieldValues> =>
  violation => {
    const field = fields.find(candidate => candidate === violation.field);
    return field === undefined ? undefined : { field, message: violation.message };
  };

export const applyApiFieldErrors = <TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
  resolveViolation: ApiViolationResolver<TFieldValues>,
): ApiFieldErrorsResult<TFieldValues> | null => {
  if (!isAxiosError(error) || !hasHttpStatus(error, HttpStatusEnum.BAD_REQUEST)) {
    return null;
  }
  const body: unknown = error.response?.data;
  if (!isApiFieldErrorResponse(body)) {
    return null;
  }

  const resolved = body.violations.map(violation => ({
    resolution: resolveViolation(violation),
    violation,
  }));
  const mapped = resolved.flatMap(({ resolution }) =>
    resolution === undefined ? [] : [resolution],
  );

  mapped.forEach(({ field, message }, index) =>
    setError(field, { message, type: 'server' }, { shouldFocus: index === 0 }),
  );

  return {
    mappedFields: mapped.map(({ field }) => field),
    unmappedViolations: resolved.flatMap(({ resolution, violation }) =>
      resolution === undefined ? [violation] : [],
    ),
  };
};
