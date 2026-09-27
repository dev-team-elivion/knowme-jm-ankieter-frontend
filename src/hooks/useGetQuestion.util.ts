import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QuestionDetailsDto } from '@/api/generated';
import { hasHttpStatus } from '@/api/guards/isAxiosError.guard.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Return = {
  isError: boolean;
  isFetching: boolean;
  isNotFound: boolean;
  isPending: boolean;
  question: QuestionDetailsDto | undefined;
  retry: () => void;
};

export const useGetQuestion = (questionId: string | undefined): Return => {
  const { questionsApi } = useApiClient();

  const { data, error, isError, isFetching, isPending, refetch } = useQuery<
    QuestionDetailsDto,
    AxiosError
  >({
    enabled: questionId !== undefined,
    queryFn: async () => {
      const { data } = await questionsApi.getQuestion(questionId ?? '');
      return data;
    },
    queryKey: [QueryKeyEnum.QUESTION_DETAIL, questionId],
    retry: false,
  });

  return {
    isError,
    isFetching,
    isNotFound: hasHttpStatus(error, HttpStatusEnum.NOT_FOUND),
    isPending,
    question: data,
    retry: () => void refetch(),
  };
};
