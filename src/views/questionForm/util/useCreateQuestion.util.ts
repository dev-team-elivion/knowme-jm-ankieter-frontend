import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { CreateQuestionRequestDto, QuestionDetailsDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Return = {
  createQuestion: (request: CreateQuestionRequestDto) => Promise<QuestionDetailsDto>;
  isPending: boolean;
};

export const useCreateQuestion = (): Return => {
  const { questionsApi } = useApiClient();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<
    QuestionDetailsDto,
    AxiosError,
    CreateQuestionRequestDto
  >({
    mutationFn: async request => {
      const { data } = await questionsApi.createQuestion(request);
      return data;
    },
    onSuccess: question => {
      queryClient.setQueryData([QueryKeyEnum.QUESTION_DETAIL, question.id], question);
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_QUESTIONS] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_CATEGORIES] });
    },
  });

  return { createQuestion: mutateAsync, isPending };
};
