import { Stack } from '@mui/material';
import { JSX, useState } from 'react';

import { MediaAssetDto } from '@/api/generated';
import { hasHttpStatus } from '@/api/guards/isAxiosError.guard.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { MediaDeleteDialog } from '@/views/questionForm/components/media/MediaDeleteDialog.comp.tsx';
import { MediaTile } from '@/views/questionForm/components/media/MediaTile.comp.tsx';
import { useDeleteMedia } from '@/views/questionForm/util/useDeleteMedia.util.ts';

type Props = {
  assets: MediaAssetDto[];
  editableQuestionId: null | string;
  maxHeight: number;
};

export const MediaGallery = ({ assets, editableQuestionId, maxHeight }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm.media');
  const { notifyError, notifySuccess } = useNotifications();
  const { deleteMedia, isPending } = useDeleteMedia();
  const [pendingRemoval, setPendingRemoval] = useState<MediaAssetDto | null>(null);

  const confirmRemoval = async (questionId: string, asset: MediaAssetDto): Promise<void> => {
    try {
      await deleteMedia({ assetId: asset.id, questionId });
      notifySuccess(t('notifications.removed'));
    } catch (error) {
      notifyError(
        hasHttpStatus(error, HttpStatusEnum.CONFLICT)
          ? t('errors.notADraft')
          : t('errors.removeFailed'),
      );
    } finally {
      setPendingRemoval(null);
    }
  };

  return (
    <>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
        {assets.map(asset => (
          <MediaTile
            asset={asset}
            key={asset.id}
            maxHeight={maxHeight}
            onRemove={editableQuestionId === null ? undefined : () => setPendingRemoval(asset)}
          />
        ))}
      </Stack>
      <MediaDeleteDialog
        fileName={pendingRemoval?.filename ?? ''}
        isOpen={pendingRemoval !== null}
        isRemoving={isPending}
        onCancel={() => setPendingRemoval(null)}
        onConfirm={() => {
          if (pendingRemoval && editableQuestionId) {
            void confirmRemoval(editableQuestionId, pendingRemoval);
          }
        }}
      />
    </>
  );
};
