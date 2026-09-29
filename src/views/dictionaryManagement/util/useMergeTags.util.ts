import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { TagDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Req = {
  sourceTagId: string;
  targetTagId: string;
};

type Return = {
  isPending: boolean;
  mergeTags: (req: Req) => Promise<TagDto>;
};

export const useMergeTags = (): Return => {
  const { dictionariesApi } = useApiClient();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<TagDto, AxiosError, Req>({
    mutationFn: async ({ sourceTagId, targetTagId }) => {
      const { data } = await dictionariesApi.mergeTags(sourceTagId, { targetTagId });
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_TAGS] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_QUESTIONS] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_DETAIL] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_HISTORY] });
    },
  });

  return { isPending, mergeTags: mutateAsync };
};
