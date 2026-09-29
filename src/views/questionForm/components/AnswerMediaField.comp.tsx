import { Stack } from '@mui/material';
import { JSX } from 'react';
import { useWatch } from 'react-hook-form';

import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { MediaGallery } from '@/views/questionForm/components/media/MediaGallery.comp.tsx';
import { MediaUploader } from '@/views/questionForm/components/media/MediaUploader.comp.tsx';
import { useQuestionMedia } from '@/views/questionForm/context/QuestionMedia.context.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';
import { ANSWER_MEDIA_PREVIEW_MAX_HEIGHT } from '@/views/questionForm/model/QuestionMedia.constants.ts';
import { useUploadAnswerMedia } from '@/views/questionForm/util/useUploadAnswerMedia.util.ts';

type Props = {
  index: number;
};

export const AnswerMediaField = ({ index }: Props): JSX.Element | null => {
  const { t } = useTranslationWithPrefix('views.questionForm.media');
  const { answerMedia, target } = useQuestionMedia();
  const { uploadAnswerMedia } = useUploadAnswerMedia();
  const optionId = useWatch<QuestionFormModel, `answers.${number}.optionId`>({
    name: `answers.${index}.optionId`,
  });
  const assets = (optionId === null ? undefined : answerMedia.get(optionId)) ?? [];
  const isEditable = target.kind === 'editable';

  if (!isEditable && assets.length === 0) {
    return null;
  }

  const upload = (file: File, onProgress: (fraction: number) => void): Promise<unknown> => {
    if (target.kind !== 'editable' || optionId === null) {
      return Promise.reject(new Error('Media can be uploaded only to a saved answer in a draft.'));
    }
    return uploadAnswerMedia({
      answerId: optionId,
      file,
      onProgress,
      questionId: target.questionId,
    });
  };

  return (
    <Stack
      aria-label={t('answerLabel', { number: index + 1 })}
      role="group"
      spacing={1}
      sx={{ mt: 1 }}
    >
      {assets.length > 0 && (
        <MediaGallery
          assets={assets}
          editableQuestionId={isEditable ? target.questionId : null}
          maxHeight={ANSWER_MEDIA_PREVIEW_MAX_HEIGHT}
        />
      )}
      {isEditable && (
        <MediaUploader
          disabledReason={optionId === null ? t('disabled.unsavedAnswer') : null}
          labelTop={t('dropzone.answerLabel')}
          onUpload={upload}
          size="compact"
        />
      )}
    </Stack>
  );
};
