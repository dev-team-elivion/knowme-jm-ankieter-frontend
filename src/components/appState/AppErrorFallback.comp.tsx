import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { Button } from '@mui/material';
import { JSX } from 'react';

import { StatusScreen } from '@/components/state/StatusScreen.comp.tsx';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  variant: 'fullPage' | 'inline';
};

export const AppErrorFallback = ({ variant }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('generalError.crash');

  return (
    <StatusScreen
      actions={
        <>
          <Button onClick={() => window.location.reload()} variant="contained">
            {t('reload')}
          </Button>
          <Button
            onClick={() => window.location.assign(RouteEnum.DASHBOARD)}
            startIcon={<DashboardOutlinedIcon />}
            variant="outlined"
          >
            {t('goToDashboard')}
          </Button>
        </>
      }
      description={t('description')}
      icon={ReportProblemOutlinedIcon}
      statusLabel={t('statusLabel')}
      title={t('title')}
      tone="error"
      variant={variant}
    />
  );
};
