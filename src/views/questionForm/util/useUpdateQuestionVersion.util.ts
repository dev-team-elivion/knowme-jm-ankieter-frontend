import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QuestionVersionContentDto, QuestionVersionDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

export type UpdateQuestionVersionReq = {
  content: QuestionVersionContentDto;
  questionId: string;
  versionId: string;
};

type Return = {
  isPending: boolean;
  updateVersion: (request: UpdateQuestionVersionReq) => Promise<QuestionVersionDto>;
};

export const useUpdateQuestionVersion = (): Return => {
  const { questionsApi } = useApiClient();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<
    QuestionVersionDto,
    AxiosError,
    UpdateQuestionVersionReq
  >({
    mutationFn: async ({ content, questionId, versionId }) => {
      const { data } = await questionsApi.updateQuestionVersion(questionId, versionId, content);
      return data;
    },
    onSuccess: (_version, { questionId }) => {
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_DETAIL, questionId] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_HISTORY, questionId] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_VERSION, questionId] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_QUESTIONS] });
    },
  });

  return { isPending, updateVersion: mutateAsync };
};
