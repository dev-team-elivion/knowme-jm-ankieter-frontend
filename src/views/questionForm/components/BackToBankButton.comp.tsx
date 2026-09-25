import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Button } from '@mui/material';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export const BackToBankButton = (): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm');

  return (
    <Button
      component={Link}
      startIcon={<ArrowBackRoundedIcon />}
      to={RouteEnum.QUESTION_BANK}
      variant="text"
    >
      {t('backToBank')}
    </Button>
  );
};
