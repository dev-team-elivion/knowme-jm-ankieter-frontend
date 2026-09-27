import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { Box, Button } from '@mui/material';
import { JSX } from 'react';

import { QuestionDetailsDto, QuestionVersionDto, VersionStatusDto } from '@/api/generated';
import { hasHttpStatus } from '@/api/guards/isAxiosError.guard.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { PageHeader } from '@/components/page/PageHeader.comp.tsx';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { revealSx } from '@/config/theme/uiTokens.ts';
import { getVersionStatusTone } from '@/utils/questionStatusTone.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { BackToBankButton } from '@/views/questionForm/components/BackToBankButton.comp.tsx';
import { useActivateQuestionVersion } from '@/views/questionForm/util/useActivateQuestionVersion.util.ts';

type Props = {
  question: QuestionDetailsDto;
  version: QuestionVersionDto | undefined;
};

export const QuestionEditHeader = ({ question, version }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');
  const { notifyError, notifySuccess } = useNotifications();
  const { activateVersion, isPending } = useActivateQuestionVersion();

  const description = version
    ? `${question.businessKey} · ${t('edit.versionLabel', { number: version.versionNo })}`
    : question.businessKey;

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
    <Box sx={{ ...revealSx(0), pb: 1 }}>
      <PageHeader
        actions={
          <>
            {version && (
              <StatusPill
                label={tDictionary(`versionStatus.${version.status}`)}
                tone={getVersionStatusTone(version.status)}
              />
            )}
            {version?.status === VersionStatusDto.Draft && (
              <Button
                disabled={isPending}
                onClick={() => void handleActivate(version.id)}
                variant="outlined"
              >
                {t('edit.activateVersion')}
              </Button>
            )}
            <BackToBankButton />
          </>
        }
        description={description}
        icon={LibraryBooksOutlinedIcon}
        title={t('edit.title')}
      />
    </Box>
  );
};
