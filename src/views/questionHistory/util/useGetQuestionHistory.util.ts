import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QuestionHistoryDto } from '@/api/generated';
import { hasHttpStatus } from '@/api/guards/isAxiosError.guard.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Return = {
  history: QuestionHistoryDto | undefined;
  isError: boolean;
  isFetching: boolean;
  isNotFound: boolean;
  isPending: boolean;
  retry: () => void;
};

export const useGetQuestionHistory = (questionId: string | undefined): Return => {
  const { questionsApi } = useApiClient();

  const { data, error, isError, isFetching, isPending, refetch } = useQuery<
    QuestionHistoryDto,
    AxiosError
  >({
    enabled: questionId !== undefined,
    queryFn: async () => {
      const { data } = await questionsApi.getQuestionHistory(questionId ?? '');
      return data;
    },
    queryKey: [QueryKeyEnum.QUESTION_HISTORY, questionId],
    retry: false,
  });

  return {
    history: data,
    isError,
    isFetching,
    isNotFound: hasHttpStatus(error, HttpStatusEnum.NOT_FOUND),
    isPending,
    retry: () => void refetch(),
  };
};
