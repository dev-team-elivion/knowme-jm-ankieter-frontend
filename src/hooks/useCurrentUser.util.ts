import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { CurrentUserDto } from '@/api/generated';
import { hasHttpStatus } from '@/api/guards/isAxiosError.guard.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Return = {
  currentUser: CurrentUserDto | undefined;
  isError: boolean;
  isFetching: boolean;
  isPending: boolean;
  isUnauthorized: boolean;
  retry: () => void;
};

export const useCurrentUser = (): Return => {
  const { currentUserApi } = useApiClient();

  const { data, error, isError, isFetching, isPending, refetch } = useQuery<
    CurrentUserDto,
    AxiosError
  >({
    queryFn: async () => {
      const { data } = await currentUserApi.getCurrentUser();
      return data;
    },
    queryKey: [QueryKeyEnum.CURRENT_USER],
    retry: false,
    staleTime: Infinity,
  });

  return {
    currentUser: data,
    isError,
    isFetching,
    isPending,
    isUnauthorized: hasHttpStatus(error, HttpStatusEnum.UNAUTHORIZED),
    retry: () => void refetch(),
  };
};
