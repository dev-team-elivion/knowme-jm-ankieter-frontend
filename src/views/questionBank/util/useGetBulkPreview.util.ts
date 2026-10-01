import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BulkUpdateRequestDto, BulkUpdateResultDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Return = {
  isError: boolean;
  isFetching: boolean;
  isPending: boolean;
  preview: BulkUpdateResultDto | undefined;
  retry: () => void;
};

export const useGetBulkPreview = (request: BulkUpdateRequestDto | null): Return => {
  const { questionsApi } = useApiClient();

  const { data, isError, isFetching, isPending, refetch } = useQuery<
    BulkUpdateResultDto,
    AxiosError
  >({
    enabled: request !== null,
    gcTime: 0,
    queryFn: async () => {
      if (request === null) {
        throw new Error('Bulk preview needs a request.');
      }
      const { data } = await questionsApi.bulkUpdateQuestions({ ...request, dryRun: true });
      return data;
    },
    queryKey: [QueryKeyEnum.BULK_PREVIEW, request],
    retry: false,
    staleTime: 0,
  });

  return { isError, isFetching, isPending, preview: data, retry: () => void refetch() };
};
