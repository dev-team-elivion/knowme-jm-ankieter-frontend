import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { Button } from '@mui/material';
import { JSX } from 'react';

import { StatusScreen } from '@/components/state/StatusScreen.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  isRetrying: boolean;
  onRetry: () => void;
};

export const BackendUnavailable = ({ isRetrying, onRetry }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('generalError.backendUnavailable');

  return (
    <StatusScreen
      actions={
        <Button
          disabled={isRetrying}
          onClick={onRetry}
          startIcon={<RefreshRoundedIcon />}
          variant="contained"
        >
          {t('retry')}
        </Button>
      }
      description={t('description')}
      icon={CloudOffOutlinedIcon}
      statusLabel={t('statusLabel')}
      title={t('title')}
      tone="error"
    />
  );
};
