import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { TagDto, TagRequestDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Return = {
  createTag: (request: TagRequestDto) => Promise<TagDto>;
  isPending: boolean;
};

export const useCreateTag = (): Return => {
  const { dictionariesApi } = useApiClient();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<TagDto, AxiosError, TagRequestDto>({
    mutationFn: async request => {
      const { data } = await dictionariesApi.createTag(request);
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_TAGS] });
    },
  });

  return { createTag: mutateAsync, isPending };
};
