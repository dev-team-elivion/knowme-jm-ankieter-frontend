import { QueryClient } from '@tanstack/react-query';

import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';

export const invalidateQuestionMedia = (queryClient: QueryClient, questionId: string): void => {
  void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_DETAIL, questionId] });
  void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_HISTORY, questionId] });
  void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_VERSION, questionId] });
  void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_QUESTIONS] });
};
