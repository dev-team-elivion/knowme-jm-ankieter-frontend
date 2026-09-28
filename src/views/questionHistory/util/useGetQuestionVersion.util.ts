import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QuestionVersionDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Return = {
  isError: boolean;
  isFetching: boolean;
  isPending: boolean;
  retry: () => void;
  version: QuestionVersionDto | undefined;
};

export const useGetQuestionVersion = (questionId: string, versionId: null | string): Return => {
  const { questionsApi } = useApiClient();

  const { data, isError, isFetching, isPending, refetch } = useQuery<
    QuestionVersionDto,
    AxiosError
  >({
    enabled: versionId !== null,
    queryFn: async () => {
      const { data } = await questionsApi.getQuestionVersion(questionId, versionId ?? '');
      return data;
    },
    queryKey: [QueryKeyEnum.QUESTION_VERSION, questionId, versionId],
  });

  return {
    isError,
    isFetching,
    isPending,
    retry: () => void refetch(),
    version: data,
  };
};
