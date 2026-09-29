import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { CategoryDto } from '@/api/generated';
import { useApiClient } from '@/api/useApiClient.util.ts';
import { CATEGORY_DICTIONARY_QUERY_KEY } from '@/views/dictionaryManagement/model/dictionaryManagement.constants.ts';

const ACTIVE_ONLY = false;

type Return = {
  categories: CategoryDto[] | undefined;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  retry: () => void;
};

export const useGetCategoryDictionary = (): Return => {
  const { dictionariesApi } = useApiClient();

  const { data, isError, isFetching, isLoading, refetch } = useQuery<CategoryDto[], AxiosError>({
    queryFn: async () => {
      const { data } = await dictionariesApi.listCategories(ACTIVE_ONLY);
      return data;
    },
    queryKey: CATEGORY_DICTIONARY_QUERY_KEY,
  });

  return { categories: data, isError, isFetching, isLoading, retry: () => void refetch() };
};
