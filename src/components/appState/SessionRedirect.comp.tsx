import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import { Button } from '@mui/material';
import { JSX, useEffect } from 'react';

import { getSsoLoginUrl, redirectToSso } from '@/api/utils/ssoRedirect.util.ts';
import { StatusScreen } from '@/components/state/StatusScreen.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export const SessionRedirect = (): JSX.Element => {
  const { t } = useTranslationWithPrefix('generalError.sessionExpired');

  useEffect(() => {
    redirectToSso();
  }, []);

  return (
    <StatusScreen
      actions={
        <Button href={getSsoLoginUrl()} startIcon={<LoginRoundedIcon />} variant="contained">
          {t('signIn')}
        </Button>
      }
      description={t('description')}
      icon={PersonOffOutlinedIcon}
      statusLabel={t('statusLabel')}
      title={t('title')}
    />
  );
};
