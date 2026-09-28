import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QuestionVersionContentDto, QuestionVersionDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

export type CreateQuestionVersionReq = {
  content: QuestionVersionContentDto;
  questionId: string;
};

type Return = {
  createVersion: (request: CreateQuestionVersionReq) => Promise<QuestionVersionDto>;
  isPending: boolean;
};

export const useCreateQuestionVersion = (): Return => {
  const { questionsApi } = useApiClient();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<
    QuestionVersionDto,
    AxiosError,
    CreateQuestionVersionReq
  >({
    mutationFn: async ({ content, questionId }) => {
      const { data } = await questionsApi.createQuestionVersion(questionId, content);
      return data;
    },
    onSuccess: (_version, { questionId }) => {
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_DETAIL, questionId] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_HISTORY, questionId] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_VERSION, questionId] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_QUESTIONS] });
    },
  });

  return { createVersion: mutateAsync, isPending };
};
