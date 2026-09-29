import { JSX } from 'react';

import { BackLink } from '@/components/page/BackLink.comp.tsx';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export const BackToBankButton = (): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm');

  return <BackLink label={t('backToBank')} to={RouteEnum.QUESTION_BANK} />;
};
