import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import { Box, Button } from '@mui/material';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

import { PageHeader } from '@/components/page/PageHeader.comp.tsx';
import { revealSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { BackToBankButton } from '@/views/questionForm/components/BackToBankButton.comp.tsx';
import { buildQuestionEditPath } from '@/views/questionForm/util/questionRoutes.util.ts';

type Props = {
  businessKey: string;
  questionId: string;
};

export const QuestionHistoryHeader = ({ businessKey, questionId }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionHistory');

  return (
    <Box sx={{ ...revealSx(0), pb: 1 }}>
      <PageHeader
        actions={
          <>
            <Button
              component={Link}
              startIcon={<EditOutlinedIcon />}
              to={buildQuestionEditPath(questionId)}
              variant="outlined"
            >
              {t('editQuestion')}
            </Button>
            <BackToBankButton />
          </>
        }
        description={t('description', { key: businessKey })}
        icon={HistoryRoundedIcon}
        title={t('title')}
      />
    </Box>
  );
};
