import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Filters = {
  enabled: boolean;
  search: string;
};

type Return = {
  procedureNames: string[];
};

export const useGetProcedureNames = (filters: Filters): Return => {
  const { dictionariesApi } = useApiClient();
  const search = filters.search.trim();

  const { data } = useQuery<string[], AxiosError>({
    enabled: filters.enabled,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await dictionariesApi.listProcedureNames(search || undefined);
      return data;
    },
    queryKey: [QueryKeyEnum.LIST_PROCEDURE_NAMES, { search }],
  });

  return { procedureNames: data ?? [] };
};
