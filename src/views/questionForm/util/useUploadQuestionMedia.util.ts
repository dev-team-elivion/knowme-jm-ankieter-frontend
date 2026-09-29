import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { MediaAssetDto } from '@/api/generated';
import { useApiClient } from '@/api/useApiClient.util.ts';
import { invalidateQuestionMedia } from '@/views/questionForm/util/invalidateQuestionMedia.util.ts';

export type UploadQuestionMediaReq = {
  file: File;
  locale?: string;
  onProgress: (fraction: number) => void;
  questionId: string;
  versionId: string;
};

type Return = {
  uploadQuestionMedia: (request: UploadQuestionMediaReq) => Promise<MediaAssetDto>;
};

export const useUploadQuestionMedia = (): Return => {
  const { mediaApi } = useApiClient();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<MediaAssetDto, AxiosError, UploadQuestionMediaReq>({
    mutationFn: async ({ file, locale, onProgress, questionId, versionId }) => {
      const { data } = await mediaApi.uploadQuestionMedia(questionId, versionId, file, locale, {
        onUploadProgress: event => onProgress(event.progress ?? 0),
      });
      return data;
    },
    onSuccess: (_asset, { questionId }) => invalidateQuestionMedia(queryClient, questionId),
  });

  return { uploadQuestionMedia: mutateAsync };
};
