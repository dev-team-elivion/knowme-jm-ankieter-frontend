import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { CategoryDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';
import { CATEGORY_DICTIONARY_QUERY_KEY } from '@/views/dictionaryManagement/model/dictionaryManagement.constants.ts';
import {
  getChangedDisplayOrders,
  toCategoryRequest,
  withSequentialDisplayOrder,
} from '@/views/dictionaryManagement/util/category.util.ts';

type Req = {
  previous: CategoryDto[];
  reordered: CategoryDto[];
};

type Return = {
  isPending: boolean;
  reorderCategories: (req: Req) => Promise<void>;
};

export const useReorderCategories = (): Return => {
  const { dictionariesApi } = useApiClient();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<void, AxiosError, Req>({
    mutationFn: async ({ previous, reordered }) => {
      const changed = getChangedDisplayOrders(previous, withSequentialDisplayOrder(reordered));
      await Promise.all(
        changed.map(category =>
          dictionariesApi.updateCategory(category.id, toCategoryRequest(category)),
        ),
      );
    },
    onMutate: async ({ reordered }) => {
      await queryClient.cancelQueries({ queryKey: CATEGORY_DICTIONARY_QUERY_KEY });
      queryClient.setQueryData<CategoryDto[]>(
        CATEGORY_DICTIONARY_QUERY_KEY,
        withSequentialDisplayOrder(reordered),
      );
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_CATEGORIES] });
    },
  });

  return { isPending, reorderCategories: mutateAsync };
};
