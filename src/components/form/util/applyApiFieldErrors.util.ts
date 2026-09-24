import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

import { isApiFieldErrorResponse } from '@/api/guards/isApiFieldErrorResponse.guard.ts';
import { hasHttpStatus, isAxiosError } from '@/api/guards/isAxiosError.guard.ts';
import { ApiFieldViolation } from '@/api/model/ApiFieldError.model.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';

export type ApiFieldErrorsResult<TFieldValues extends FieldValues> = {
  mappedFields: Path<TFieldValues>[];
  unmappedViolations: ApiFieldViolation[];
};

export const applyApiFieldErrors = <TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
  fields: readonly Path<TFieldValues>[],
): ApiFieldErrorsResult<TFieldValues> | null => {
  if (!isAxiosError(error) || !hasHttpStatus(error, HttpStatusEnum.BAD_REQUEST)) {
    return null;
  }
  const body: unknown = error.response?.data;
  if (!isApiFieldErrorResponse(body)) {
    return null;
  }

  const mapped = body.violations.flatMap(violation => {
    const field = fields.find(candidate => candidate === violation.field);
    return field === undefined ? [] : [{ field, message: violation.message }];
  });

  mapped.forEach(({ field, message }, index) =>
    setError(field, { message, type: 'server' }, { shouldFocus: index === 0 }),
  );

  return {
    mappedFields: mapped.map(({ field }) => field),
    unmappedViolations: body.violations.filter(
      violation => !fields.some(candidate => candidate === violation.field),
    ),
  };
};
