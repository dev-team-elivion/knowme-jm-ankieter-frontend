import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { TagDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

const ACTIVE_ONLY = false;

type Filters = {
  search: string;
};

type Return = {
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  retry: () => void;
  tags: TagDto[] | undefined;
};

export const useGetTagDictionary = (filters: Filters): Return => {
  const { dictionariesApi } = useApiClient();
  const search = filters.search.trim();

  const { data, isError, isFetching, isLoading, refetch } = useQuery<TagDto[], AxiosError>({
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await dictionariesApi.listTags(search || undefined, ACTIVE_ONLY);
      return data;
    },
    queryKey: [QueryKeyEnum.LIST_TAGS, { activeOnly: ACTIVE_ONLY, search }],
  });

  return { isError, isFetching, isLoading, retry: () => void refetch(), tags: data };
};
