import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useApiClient } from '@/api/useApiClient.util.ts';
import { invalidateQuestionMedia } from '@/views/questionForm/util/invalidateQuestionMedia.util.ts';

export type DeleteMediaReq = {
  assetId: string;
  questionId: string;
};

type Return = {
  deleteMedia: (request: DeleteMediaReq) => Promise<void>;
  isPending: boolean;
};

export const useDeleteMedia = (): Return => {
  const { mediaApi } = useApiClient();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<void, AxiosError, DeleteMediaReq>({
    mutationFn: async ({ assetId }) => {
      await mediaApi.deleteMedia(assetId);
    },
    onSuccess: (_result, { questionId }) => invalidateQuestionMedia(queryClient, questionId),
  });

  return { deleteMedia: mutateAsync, isPending };
};
