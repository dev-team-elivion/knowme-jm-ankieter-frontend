import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

import { QuestionDetailsDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Return = (questionId: string) => void;

export const usePrefetchQuestion = (): Return => {
  const queryClient = useQueryClient();
  const { questionsApi } = useApiClient();

  return useCallback(
    (questionId: string) =>
      void queryClient.prefetchQuery<QuestionDetailsDto, AxiosError>({
        queryFn: async () => {
          const { data } = await questionsApi.getQuestion(questionId);
          return data;
        },
        queryKey: [QueryKeyEnum.QUESTION_DETAIL, questionId],
        retry: false,
      }),
    [queryClient, questionsApi],
  );
};
