import { JSX } from 'react';

import { BackLink } from '@/components/page/BackLink.comp.tsx';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { useQuestionReturnTo } from '@/views/questionForm/util/useQuestionReturnTo.util.ts';

export const BackToBankButton = (): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm');
  const { isFromFocus, returnTo } = useQuestionReturnTo();

  return (
    <BackLink
      label={isFromFocus ? t('backToFocus') : t('backToBank')}
      to={returnTo ?? RouteEnum.QUESTION_BANK}
    />
  );
};
