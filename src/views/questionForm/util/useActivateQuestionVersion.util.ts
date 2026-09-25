import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QuestionVersionDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

export type ActivateQuestionVersionReq = {
  questionId: string;
  versionId: string;
};

type Return = {
  activateVersion: (request: ActivateQuestionVersionReq) => Promise<QuestionVersionDto>;
  isPending: boolean;
};

export const useActivateQuestionVersion = (): Return => {
  const { questionsApi } = useApiClient();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<
    QuestionVersionDto,
    AxiosError,
    ActivateQuestionVersionReq
  >({
    mutationFn: async ({ questionId, versionId }) => {
      const { data } = await questionsApi.activateQuestionVersion(questionId, versionId);
      return data;
    },
    onSuccess: (_version, { questionId }) => {
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_DETAIL, questionId] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_QUESTIONS] });
    },
  });

  return { activateVersion: mutateAsync, isPending };
};
