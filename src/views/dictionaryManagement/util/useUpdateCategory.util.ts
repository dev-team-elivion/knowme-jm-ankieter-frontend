import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { CategoryDto, CategoryRequestDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

export type UpdateCategoryReq = {
  categoryId: string;
  request: CategoryRequestDto;
};

type Return = {
  isPending: boolean;
  updateCategory: (req: UpdateCategoryReq) => Promise<CategoryDto>;
};

export const useUpdateCategory = (): Return => {
  const { dictionariesApi } = useApiClient();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<CategoryDto, AxiosError, UpdateCategoryReq>({
    mutationFn: async ({ categoryId, request }) => {
      const { data } = await dictionariesApi.updateCategory(categoryId, request);
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_CATEGORIES] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_QUESTIONS] });
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.QUESTION_DETAIL] });
    },
  });

  return { isPending, updateCategory: mutateAsync };
};
