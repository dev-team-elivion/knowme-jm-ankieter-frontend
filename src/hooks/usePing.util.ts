import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { PingResponseDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Return = {
  isError: boolean;
  isFetching: boolean;
  isPending: boolean;
  retry: () => void;
};

export const usePing = (): Return => {
  const { pingApi } = useApiClient();

  const { isError, isFetching, isPending, refetch } = useQuery<PingResponseDto, AxiosError>({
    queryFn: async () => {
      const { data } = await pingApi.ping();
      return data;
    },
    queryKey: [QueryKeyEnum.PING],
    retry: 1,
    staleTime: Infinity,
  });

  return { isError, isFetching, isPending, retry: () => void refetch() };
};
