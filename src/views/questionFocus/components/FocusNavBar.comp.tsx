import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

import { numericSx, pressableSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  editPath: string;
  hasNext: boolean;
  hasPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  position: number;
  total: number;
};

export const FocusNavBar = ({
  editPath,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
  position,
  total,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionFocus.navigation');

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
        <Button
          disabled={!hasPrevious}
          onClick={onPrevious}
          startIcon={<ChevronLeftRoundedIcon />}
          sx={pressableSx}
          variant="outlined"
        >
          {t('previous')}
        </Button>
        <Typography
          aria-live="polite"
          sx={{
            ...numericSx,
            color: theme.colors.textSecondary,
            minWidth: 72,
            px: 1,
            textAlign: 'center',
          }}
          variant="body2"
        >
          {t('counter', { position, total })}
        </Typography>
        <Button
          disabled={!hasNext}
          endIcon={<ChevronRightRoundedIcon />}
          onClick={onNext}
          sx={pressableSx}
          variant="outlined"
        >
          {t('next')}
        </Button>
      </Stack>
      <Button component={Link} startIcon={<EditOutlinedIcon />} sx={pressableSx} to={editPath}>
        {t('edit')}
      </Button>
    </Stack>
  );
};
