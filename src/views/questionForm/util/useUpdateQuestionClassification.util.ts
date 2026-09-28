import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QuestionDetailsDto, UpdateClassificationRequestDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

export type UpdateQuestionClassificationReq = {
  classification: UpdateClassificationRequestDto;
  questionId: string;
};

type Return = {
  isPending: boolean;
  updateClassification: (request: UpdateQuestionClassificationReq) => Promise<QuestionDetailsDto>;
};

export const useUpdateQuestionClassification = (): Return => {
  const { questionsApi } = useApiClient();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<
    QuestionDetailsDto,
    AxiosError,
    UpdateQuestionClassificationReq
  >({
    mutationFn: async ({ classification, questionId }) => {
      const { data } = await questionsApi.updateQuestionClassification(questionId, classification);
      return data;
    },
    onSuccess: question => {
      queryClient.setQueryData([QueryKeyEnum.QUESTION_DETAIL, question.id], question);
      void queryClient.invalidateQueries({
        queryKey: [QueryKeyEnum.QUESTION_HISTORY, question.id],
      });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_QUESTIONS] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_CATEGORIES] });
    },
  });

  return { isPending, updateClassification: mutateAsync };
};
