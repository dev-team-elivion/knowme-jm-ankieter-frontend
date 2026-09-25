import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

const OPTION_SX = { alignItems: 'flex-end', maxWidth: 300 } as const;

type Props = {
  canFixTypo: boolean;
  canSave: boolean;
  isSaving: boolean;
  onFixTypo: () => void;
  onNewVersion: () => void;
};

export const QuestionEditActions = ({
  canFixTypo,
  canSave,
  isSaving,
  onFixTypo,
  onNewVersion,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionForm.actions');

  return (
    <>
      <Stack spacing={0.75} sx={OPTION_SX}>
        <Button disabled={!canSave || isSaving} onClick={onNewVersion} variant="outlined">
          {t('newVersion')}
        </Button>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'flex-start' }}>
          <WarningAmberRoundedIcon sx={{ color: theme.colors.orange, fontSize: 16, mt: 0.25 }} />
          <Typography sx={{ color: theme.colors.textSecondary }} variant="caption">
            {t('newVersionHint')}
          </Typography>
        </Stack>
      </Stack>
      <Stack spacing={0.75} sx={OPTION_SX}>
        <Button disabled={!canFixTypo || !canSave || isSaving} onClick={onFixTypo}>
          {t('fixTypo')}
        </Button>
        <Typography
          sx={{ color: theme.colors.textSecondary, textAlign: 'right' }}
          variant="caption"
        >
          {t('fixTypoHint')}
        </Typography>
      </Stack>
    </>
  );
};
