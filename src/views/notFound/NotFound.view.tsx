import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import { Button } from '@mui/material';
import { JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { StatusScreen } from '@/components/state/StatusScreen.comp.tsx';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export const NotFoundView = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslationWithPrefix('generalError.notFound');

  return (
    <StatusScreen
      actions={
        <>
          <Button component={Link} to={RouteEnum.DASHBOARD} variant="contained">
            {t('goToDashboard')}
          </Button>
          <Button
            onClick={() => void navigate(-1)}
            startIcon={<ArrowBackRoundedIcon />}
            variant="outlined"
          >
            {t('goBack')}
          </Button>
        </>
      }
      description={t('description')}
      icon={TravelExploreOutlinedIcon}
      statusLabel={t('statusLabel')}
      title={t('title')}
      variant="inline"
    />
  );
};
