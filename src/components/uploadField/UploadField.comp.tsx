import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, CircularProgress, LinearProgress, Stack, Typography, useTheme } from '@mui/material';
import { JSX, useState } from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';

import { iconTileSx, numericSx, progressBarSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

const DEFAULT_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const SURFACE_TRANSITION =
  'background-color 0.25s ease-out, border-color 0.25s ease-out, color 0.25s ease-out, box-shadow 0.25s ease-out';

export type UploadProgress = {
  label: string;
  percent: number;
};

type Props = {
  accept?: Accept;
  disabledReason?: null | string;
  error?: null | string;
  labelBottom?: string;
  labelBottomAccent?: string;
  labelTop: string;
  maxFileSizeBytes?: number;
  multiple?: boolean;
  onDrop: (acceptedFiles: File[]) => void;
  onDropRejected?: (rejectedFiles: File[]) => void;
  progress?: null | UploadProgress;
  size?: 'compact' | 'regular';
};

export const UploadField = ({
  accept,
  disabledReason = null,
  error,
  labelBottom,
  labelBottomAccent,
  labelTop,
  maxFileSizeBytes = DEFAULT_MAX_FILE_SIZE_BYTES,
  multiple = false,
  onDrop,
  onDropRejected,
  progress = null,
  size = 'regular',
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.uploadField');
  const [fileError, setFileError] = useState<null | string>(null);
  const isDisabled = disabledReason !== null;
  const isUploading = progress !== null;
  const isInactive = isDisabled || isUploading;
  const isCompact = size === 'compact';

  const handleDrop = (acceptedFiles: File[]): void => {
    setFileError(null);
    if (acceptedFiles.length > 0) {
      onDrop(acceptedFiles);
    }
  };

  const handleDropRejected = (fileRejections: FileRejection[]): void => {
    if (onDropRejected) {
      setFileError(null);
      onDropRejected(fileRejections.map(({ file }) => file));
      return;
    }
    const isTooLarge = fileRejections.some(({ errors }) =>
      errors.some(rejection => rejection.code === 'file-too-large'),
    );
    setFileError(
      isTooLarge
        ? t('tooLarge', { maxFileSize: `${Math.round(maxFileSizeBytes / 1024 / 1024)} MB` })
        : t('wrongFormat'),
    );
  };

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept,
    disabled: isInactive,
    maxSize: maxFileSizeBytes,
    multiple,
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
  });

  const shownError = error ?? fileError;
  const activeSx = { background: theme.colors.accentBg, borderColor: theme.colors.accentBorder };
  const activeIconSx = {
    background: theme.colors.accentBg,
    borderColor: theme.colors.accentBorder,
    color: theme.colors.accentInk,
  };

  return (
    <Box
      {...getRootProps()}
      aria-disabled={isInactive}
      sx={{
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        '&:focus-visible': { ...activeSx, boxShadow: `0 0 0 3px ${theme.colors.accentRing}` },
        '&:hover': isInactive ? undefined : activeSx,
        '&:hover .upload-field-icon': isInactive ? undefined : activeIconSx,
        alignItems: 'center',
        background: isDragActive ? theme.colors.accentBg : theme.colors.bg,
        border: `2px dashed ${isDragActive ? theme.colors.accentBorder : theme.colors.border}`,
        borderRadius: '16px',
        cursor: isInactive ? 'default' : 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: isCompact ? 88 : 132,
        outline: 'none',
        p: isCompact ? '12px 16px' : '20px 16px',
        textAlign: 'center',
        transition: SURFACE_TRANSITION,
      }}
    >
      <input {...getInputProps()} />
      <Box
        className="upload-field-icon"
        sx={{
          ...iconTileSx(theme.colors.bgHover, isCompact ? 32 : 40, theme.colors.border),
          ...(isDragActive ? activeIconSx : {}),
          color: isDragActive ? theme.colors.accentInk : theme.colors.textSecondary,
          mb: isCompact ? 0.75 : 1.25,
          opacity: isDisabled ? 0.6 : 1,
          transition: SURFACE_TRANSITION,
        }}
      >
        {isUploading ? <CircularProgress size={18} /> : <UploadFileIcon sx={{ fontSize: 20 }} />}
      </Box>
      <Typography
        sx={{
          color: isDisabled ? theme.colors.textSecondary : theme.colors.textPrimary,
          fontSize: 13,
          fontWeight: 700,
          textWrap: 'balance',
        }}
      >
        {progress ? progress.label : labelTop}
      </Typography>
      {progress && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', maxWidth: 320, mt: 1, width: '100%' }}
        >
          <LinearProgress
            aria-label={progress.label}
            sx={{
              ...progressBarSx(theme.colors, theme.colors.accent, theme.colors.gold),
              flex: 1,
            }}
            value={progress.percent}
            variant="determinate"
          />
          <Typography
            sx={{ ...numericSx, color: theme.colors.textSecondary, fontSize: 11, fontWeight: 700 }}
          >
            {progress.percent}%
          </Typography>
        </Stack>
      )}
      {!progress && (disabledReason ?? labelBottom) && (
        <Typography
          sx={{
            color: theme.colors.textSecondary,
            fontSize: 11,
            lineHeight: 1.5,
            mt: 0.5,
            textWrap: 'pretty',
          }}
        >
          {disabledReason ?? labelBottom}
          {!isDisabled && labelBottomAccent && (
            <Box
              component="span"
              sx={{ color: theme.colors.accentInk, display: 'block', fontWeight: 700 }}
            >
              {labelBottomAccent}
            </Box>
          )}
        </Typography>
      )}
      {shownError && !progress && (
        <Typography
          role="alert"
          sx={{
            color: theme.colors.red,
            fontSize: 11,
            fontWeight: 700,
            mt: 0.75,
            textWrap: 'pretty',
          }}
        >
          {shownError}
        </Typography>
      )}
    </Box>
  );
};
