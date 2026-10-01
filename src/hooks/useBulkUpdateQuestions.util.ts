import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BulkUpdateRequestDto, BulkUpdateResultDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

export type BulkUpdateReq = BulkUpdateRequestDto;

type Return = {
  bulkUpdate: (request: BulkUpdateReq) => Promise<BulkUpdateResultDto>;
  isPending: boolean;
};

export const useBulkUpdateQuestions = (): Return => {
  const queryClient = useQueryClient();
  const { questionsApi } = useApiClient();

  const { isPending, mutateAsync } = useMutation<BulkUpdateResultDto, AxiosError, BulkUpdateReq>({
    mutationFn: async request => {
      const { data } = await questionsApi.bulkUpdateQuestions(request);
      return data;
    },
    onSuccess: result => {
      if (result.dryRun) {
        return;
      }
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_QUESTIONS] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_DETAIL] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_HISTORY] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_TAGS] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_CATEGORIES] });
    },
  });

  return { bulkUpdate: mutateAsync, isPending };
};
