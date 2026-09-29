import { JSX, useState } from 'react';

import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { UploadField, UploadProgress } from '@/components/uploadField/UploadField.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import {
  MEDIA_ACCEPT,
  MEDIA_MAX_FILE_SIZE_BYTES,
} from '@/views/questionForm/model/QuestionMedia.constants.ts';
import {
  findLocalMediaIssue,
  toDropRejectionIssue,
  toMediaUploadIssue,
} from '@/views/questionForm/util/mediaUpload.util.ts';
import { useMediaUploadMessage } from '@/views/questionForm/util/useMediaUploadMessage.util.ts';

type Props = {
  disabledReason: null | string;
  labelTop: string;
  onUpload: (file: File, onProgress: (fraction: number) => void) => Promise<unknown>;
  size: 'compact' | 'regular';
};

export const MediaUploader = ({ disabledReason, labelTop, onUpload, size }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm.media');
  const { notifySuccess } = useNotifications();
  const toMessage = useMediaUploadMessage();
  const [progress, setProgress] = useState<null | UploadProgress>(null);
  const [error, setError] = useState<null | string>(null);

  const uploadFile = async (file: File): Promise<void> => {
    const localIssue = findLocalMediaIssue(file);
    if (localIssue) {
      setError(toMessage(localIssue, file));
      return;
    }
    const label = t('uploading', { name: file.name });
    setError(null);
    setProgress({ label, percent: 0 });
    try {
      await onUpload(file, fraction => setProgress({ label, percent: Math.round(fraction * 100) }));
      notifySuccess(t('notifications.uploaded'));
    } catch (uploadError) {
      setError(toMessage(toMediaUploadIssue(uploadError), file));
    } finally {
      setProgress(null);
    }
  };

  const handleDrop = (files: File[]): void => {
    const [file] = files;
    if (file) {
      void uploadFile(file);
    }
  };

  const handleDropRejected = (files: File[]): void => {
    const [file] = files;
    if (file) {
      setError(toMessage(toDropRejectionIssue(file), file));
    }
  };

  return (
    <UploadField
      accept={MEDIA_ACCEPT}
      disabledReason={disabledReason}
      error={error}
      labelBottom={t('dropzone.formats')}
      labelBottomAccent={t('dropzone.limits')}
      labelTop={labelTop}
      maxFileSizeBytes={MEDIA_MAX_FILE_SIZE_BYTES}
      onDrop={handleDrop}
      onDropRejected={handleDropRejected}
      progress={progress}
      size={size}
    />
  );
};
