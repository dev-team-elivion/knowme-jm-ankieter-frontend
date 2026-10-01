import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Box, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { MediaAssetDto } from '@/api/generated';
import { MediaPreview } from '@/components/media/MediaPreview.comp.tsx';
import { innerPanelSx, microLabelSx, numericSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { useMediaFormatters } from '@/views/questionForm/util/useMediaFormatters.util.ts';

const MIN_TILE_WIDTH = 220;

type Props = {
  asset: MediaAssetDto;
  maxHeight: number;
  onRemove?: () => void;
};

export const MediaTile = ({ asset, maxHeight, onRemove }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionForm.media');
  const { describeAsset } = useMediaFormatters();
  const ratio = asset.height > 0 ? asset.width / asset.height : 16 / 9;
  const tileWidth = Math.max(MIN_TILE_WIDTH, Math.round(maxHeight * ratio));
  const removeLabel = t('actions.remove', { name: asset.filename });

  return (
    <Stack
      spacing={1.25}
      sx={{ ...innerPanelSx(theme.colors), p: 1.25, width: `min(100%, ${tileWidth}px)` }}
    >
      <MediaPreview asset={asset} maxHeight={maxHeight} />
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', px: 0.5 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={microLabelSx(theme.colors.textSecondary)}>
            {t(`kind.${asset.kind}`)}
          </Typography>
          <Typography
            noWrap
            sx={{ color: theme.colors.textPrimary, fontWeight: 600 }}
            title={asset.filename}
            variant="body2"
          >
            {asset.filename}
          </Typography>
          <Typography sx={{ ...numericSx, color: theme.colors.textSecondary }} variant="caption">
            {describeAsset(asset)}
          </Typography>
        </Box>
        {onRemove && (
          <Tooltip title={removeLabel}>
            <IconButton aria-label={removeLabel} onClick={onRemove}>
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
};
