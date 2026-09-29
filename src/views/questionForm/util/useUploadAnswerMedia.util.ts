import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { MediaAssetDto } from '@/api/generated';
import { useApiClient } from '@/api/useApiClient.util.ts';
import { invalidateQuestionMedia } from '@/views/questionForm/util/invalidateQuestionMedia.util.ts';

export type UploadAnswerMediaReq = {
  answerId: string;
  file: File;
  locale?: string;
  onProgress: (fraction: number) => void;
  questionId: string;
};

type Return = {
  uploadAnswerMedia: (request: UploadAnswerMediaReq) => Promise<MediaAssetDto>;
};

export const useUploadAnswerMedia = (): Return => {
  const { mediaApi } = useApiClient();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<MediaAssetDto, AxiosError, UploadAnswerMediaReq>({
    mutationFn: async ({ answerId, file, locale, onProgress }) => {
      const { data } = await mediaApi.uploadAnswerMedia(answerId, file, locale, {
        onUploadProgress: event => onProgress(event.progress ?? 0),
      });
      return data;
    },
    onSuccess: (_asset, { questionId }) => invalidateQuestionMedia(queryClient, questionId),
  });

  return { uploadAnswerMedia: mutateAsync };
};
