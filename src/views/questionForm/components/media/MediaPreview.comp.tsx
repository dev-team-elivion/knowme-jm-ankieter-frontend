import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { JSX, useState } from 'react';

import { MediaAssetDto, MediaKindDto } from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { buildMediaUrl } from '@/views/questionForm/util/mediaUpload.util.ts';

type Props = {
  asset: MediaAssetDto;
  maxHeight: number;
};

const MEDIA_FILL_SX = { display: 'block', height: '100%', objectFit: 'contain', width: '100%' };

export const MediaPreview = ({ asset, maxHeight }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionForm.media.preview');
  const [attempt, setAttempt] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);
  const ratio = asset.height > 0 ? asset.width / asset.height : 16 / 9;
  const src = buildMediaUrl(asset.id);

  const retry = (): void => {
    setHasFailed(false);
    setAttempt(current => current + 1);
  };

  return (
    <Box
      sx={{
        aspectRatio: String(ratio),
        background: theme.colors.bgCard3,
        borderRadius: '6px',
        mx: 'auto',
        outline: `1px solid ${theme.colors.mediaOutline}`,
        outlineOffset: '-1px',
        overflow: 'hidden',
        width: `min(100%, ${Math.round(maxHeight * ratio)}px)`,
      }}
    >
      {hasFailed && (
        <Stack
          spacing={1}
          sx={{ alignItems: 'center', height: '100%', justifyContent: 'center', p: 2 }}
        >
          <Typography
            role="alert"
            sx={{ color: theme.colors.textSecondary, textAlign: 'center' }}
            variant="body2"
          >
            {t('loadFailed')}
          </Typography>
          <Button onClick={retry} size="small" variant="text">
            {t('retry')}
          </Button>
        </Stack>
      )}
      {!hasFailed && asset.kind === MediaKindDto.Video && (
        <Box
          component="video"
          controls
          controlsList="nodownload"
          key={attempt}
          onError={() => setHasFailed(true)}
          preload="metadata"
          src={src}
          sx={{ ...MEDIA_FILL_SX, background: theme.colors.bg }}
        />
      )}
      {!hasFailed && asset.kind === MediaKindDto.Image && (
        <Box
          alt={t('imageAlt', { name: asset.filename })}
          component="img"
          key={attempt}
          loading="lazy"
          onError={() => setHasFailed(true)}
          src={src}
          sx={MEDIA_FILL_SX}
        />
      )}
    </Box>
  );
};
