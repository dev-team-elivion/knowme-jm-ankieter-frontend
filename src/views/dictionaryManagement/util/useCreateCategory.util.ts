import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { CategoryDto, CategoryRequestDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Return = {
  createCategory: (request: CategoryRequestDto) => Promise<CategoryDto>;
  isPending: boolean;
};

export const useCreateCategory = (): Return => {
  const { dictionariesApi } = useApiClient();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<CategoryDto, AxiosError, CategoryRequestDto>({
    mutationFn: async request => {
      const { data } = await dictionariesApi.createCategory(request);
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_CATEGORIES] });
    },
  });

  return { createCategory: mutateAsync, isPending };
};
