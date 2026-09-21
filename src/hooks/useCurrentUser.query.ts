import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { CurrentUserDto } from '@/api/generated';
import { useApiClient } from '@/api/useApiClient.util.ts';

export const CURRENT_USER_QUERY_KEY = ['currentUser'];

export const useCurrentUserQuery = (): UseQueryResult<CurrentUserDto> => {
  const { currentUserApi } = useApiClient();

  return useQuery({
    queryFn: async () => (await currentUserApi.getCurrentUser()).data,
    queryKey: CURRENT_USER_QUERY_KEY,
    retry: false,
  });
};
