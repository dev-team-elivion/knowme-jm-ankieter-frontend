import { ProblemDetailDto, ViolationDto } from '@/api/generated';

export type ApiFieldErrorResponse = {
  violations: ApiFieldViolation[];
} & ProblemDetailDto;

export type ApiFieldViolation = ViolationDto;
