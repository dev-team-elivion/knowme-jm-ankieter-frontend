import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { PingResponseDto } from '@/api/generated';
import { useApiClient } from '@/api/useApiClient.util.ts';

export const PING_QUERY_KEY = ['ping'];

export const usePingQuery = (): UseQueryResult<PingResponseDto> => {
  const { pingApi } = useApiClient();

  return useQuery({
    queryFn: async () => (await pingApi.ping()).data,
    queryKey: PING_QUERY_KEY,
    retry: false,
  });
};
