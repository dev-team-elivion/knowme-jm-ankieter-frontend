import { JSX } from 'react';

import { VersionHistoryDto } from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionPageHeader } from '@/views/questionForm/components/QuestionPageHeader.comp.tsx';
import { QuestionPageViewEnum } from '@/views/questionForm/model/QuestionPageView.enum.ts';

type Props = {
  businessKey: string;
  latestVersion: undefined | VersionHistoryDto;
  questionId: string;
};

export const QuestionHistoryHeader = ({
  businessKey,
  latestVersion,
  questionId,
}: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionHistory');

  return (
    <QuestionPageHeader
      activeView={QuestionPageViewEnum.HISTORY}
      businessKey={businessKey}
      description={t('description')}
      questionId={questionId}
      version={latestVersion}
    />
  );
};
