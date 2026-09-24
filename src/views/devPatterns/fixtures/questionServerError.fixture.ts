import { AxiosError, AxiosHeaders } from 'axios';

import { ApiFieldErrorResponse } from '@/api/model/ApiFieldError.model.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';

const REJECTION_BODY: ApiFieldErrorResponse = {
  status: HttpStatusEnum.BAD_REQUEST,
  title: 'Bad Request',
  violations: [
    { field: 'content', message: 'Pytanie o tej treści już istnieje w bazie.' },
    { field: 'authorEmail', message: 'Ten adres nie należy do żadnego pracownika.' },
  ],
};

export const buildQuestionServerErrorFixture = (): AxiosError => {
  const config = { headers: new AxiosHeaders() };
  return new AxiosError(
    'Request failed with status code 400',
    AxiosError.ERR_BAD_REQUEST,
    config,
    null,
    {
      config,
      data: REJECTION_BODY,
      headers: {},
      status: HttpStatusEnum.BAD_REQUEST,
      statusText: 'Bad Request',
    },
  );
};
