import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import { Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { MediaGallery } from '@/views/questionForm/components/media/MediaGallery.comp.tsx';
import { MediaUploader } from '@/views/questionForm/components/media/MediaUploader.comp.tsx';
import { useQuestionMedia } from '@/views/questionForm/context/QuestionMedia.context.ts';
import { MEDIA_PREVIEW_MAX_HEIGHT } from '@/views/questionForm/model/QuestionMedia.constants.ts';
import { useUploadQuestionMedia } from '@/views/questionForm/util/useUploadQuestionMedia.util.ts';

type Props = {
  revealIndex: number;
};

export const QuestionMediaSection = ({ revealIndex }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionForm.media');
  const { target, versionMedia } = useQuestionMedia();
  const { uploadQuestionMedia } = useUploadQuestionMedia();
  const isEditable = target.kind === 'editable';

  const upload = (file: File, onProgress: (fraction: number) => void): Promise<unknown> => {
    if (target.kind !== 'editable') {
      return Promise.reject(new Error('Media can be uploaded only to a draft version.'));
    }
    return uploadQuestionMedia({
      file,
      onProgress,
      questionId: target.questionId,
      versionId: target.versionId,
    });
  };

  return (
    <SectionPanel
      description={t('description')}
      icon={PermMediaOutlinedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <Stack spacing={2}>
        {target.kind === 'readOnly' && (
          <InfoCallout title={t('readOnly.title')}>{t('readOnly.description')}</InfoCallout>
        )}
        {versionMedia.length > 0 && (
          <MediaGallery
            assets={versionMedia}
            editableQuestionId={isEditable ? target.questionId : null}
            maxHeight={MEDIA_PREVIEW_MAX_HEIGHT}
          />
        )}
        {versionMedia.length === 0 && target.kind === 'readOnly' && (
          <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
            {t('empty')}
          </Typography>
        )}
        {target.kind !== 'readOnly' && (
          <MediaUploader
            disabledReason={isEditable ? null : t('disabled.unsaved')}
            labelTop={t('dropzone.label')}
            onUpload={upload}
            size="regular"
          />
        )}
      </Stack>
    </SectionPanel>
  );
};
