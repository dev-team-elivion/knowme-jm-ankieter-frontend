import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { CategoryDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

const ACTIVE_ONLY = true;

type Return = {
  categories: CategoryDto[];
  isError: boolean;
  isPending: boolean;
};

export const useGetCategories = (): Return => {
  const { dictionariesApi } = useApiClient();

  const { data, isError, isPending } = useQuery<CategoryDto[], AxiosError>({
    queryFn: async () => {
      const { data } = await dictionariesApi.listCategories(ACTIVE_ONLY);
      return data;
    },
    queryKey: [QueryKeyEnum.LIST_CATEGORIES, { activeOnly: ACTIVE_ONLY }],
  });

  return { categories: data ?? [], isError, isPending };
};
