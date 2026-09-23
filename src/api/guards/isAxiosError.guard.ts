import { AxiosError, isAxiosError as isAxiosErrorBase } from 'axios';

export const isAxiosError = (error: unknown): error is AxiosError => isAxiosErrorBase(error);

export const hasHttpStatus = (error: unknown, status: number): boolean =>
  isAxiosError(error) && error.response?.status === status;
