import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { Box } from '@mui/material';
import { JSX, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { VersionStatusDto } from '@/api/generated';
import { PageHeader } from '@/components/page/PageHeader.comp.tsx';
import { SegmentedControl } from '@/components/segmentedControl/SegmentedControl.comp.tsx';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { revealSx } from '@/config/theme/uiTokens.ts';
import { getVersionStatusTone } from '@/utils/questionStatusTone.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { BackToBankButton } from '@/views/questionForm/components/BackToBankButton.comp.tsx';
import { QuestionPageViewEnum } from '@/views/questionForm/model/QuestionPageView.enum.ts';
import {
  buildQuestionEditPath,
  buildQuestionHistoryPath,
} from '@/views/questionForm/util/questionRoutes.util.ts';

type HeaderVersion = {
  status: VersionStatusDto;
  versionNo: number;
};

type Props = {
  actions?: ReactNode;
  activeView: QuestionPageViewEnum;
  businessKey: string;
  description?: string;
  questionId: string;
  version?: HeaderVersion;
};

export const QuestionPageHeader = ({
  actions,
  activeView,
  businessKey,
  description,
  questionId,
  version,
}: Props): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslationWithPrefix('views.questionForm.page');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');

  const toPath = (view: QuestionPageViewEnum): string =>
    view === QuestionPageViewEnum.EDIT
      ? buildQuestionEditPath(questionId)
      : buildQuestionHistoryPath(questionId);

  return (
    <Box sx={{ ...revealSx(0), pb: 1 }}>
      <PageHeader
        actions={
          <>
            {actions}
            <SegmentedControl
              ariaLabel={t('viewsLabel')}
              items={[
                {
                  icon: <EditOutlinedIcon />,
                  label: t(`views.${QuestionPageViewEnum.EDIT}`),
                  value: QuestionPageViewEnum.EDIT,
                },
                {
                  icon: <HistoryRoundedIcon />,
                  label: t(`views.${QuestionPageViewEnum.HISTORY}`),
                  value: QuestionPageViewEnum.HISTORY,
                },
              ]}
              onChange={view => void navigate(toPath(view))}
              value={activeView}
            />
          </>
        }
        backAction={<BackToBankButton />}
        description={description}
        icon={LibraryBooksOutlinedIcon}
        title={t('title', { key: businessKey })}
        titleAdornment={
          version && (
            <StatusPill
              label={tDictionary(`versionStatus.${version.status}`)}
              tone={getVersionStatusTone(version.status)}
            />
          )
        }
      />
    </Box>
  );
};
