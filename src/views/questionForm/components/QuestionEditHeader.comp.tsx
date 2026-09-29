import { Button } from '@mui/material';
import { JSX } from 'react';

import { QuestionDetailsDto, QuestionVersionDto, VersionStatusDto } from '@/api/generated';
import { hasHttpStatus } from '@/api/guards/isAxiosError.guard.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { pressableSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionPageHeader } from '@/views/questionForm/components/QuestionPageHeader.comp.tsx';
import { QuestionPageViewEnum } from '@/views/questionForm/model/QuestionPageView.enum.ts';
import { useActivateQuestionVersion } from '@/views/questionForm/util/useActivateQuestionVersion.util.ts';

type Props = {
  question: QuestionDetailsDto;
  version: QuestionVersionDto | undefined;
};

export const QuestionEditHeader = ({ question, version }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm');
  const { notifyError, notifySuccess } = useNotifications();
  const { activateVersion, isPending } = useActivateQuestionVersion();

  const handleActivate = async (versionId: string): Promise<void> => {
    try {
      await activateVersion({ questionId: question.id, versionId });
      notifySuccess(t('notifications.activated'));
    } catch (error) {
      notifyError(
        hasHttpStatus(error, HttpStatusEnum.CONFLICT)
          ? t('errors.conflict')
          : t('errors.activateFailed'),
      );
    }
  };

  return (
    <QuestionPageHeader
      actions={
        version?.status === VersionStatusDto.Draft && (
          <Button
            disabled={isPending}
            loading={isPending}
            onClick={() => void handleActivate(version.id)}
            sx={pressableSx}
            variant="outlined"
          >
            {t('edit.activateVersion')}
          </Button>
        )
      }
      activeView={QuestionPageViewEnum.EDIT}
      businessKey={question.businessKey}
      description={version && t('edit.versionLabel', { number: version.versionNo })}
      questionId={question.id}
      version={version}
    />
  );
};
