import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, useTheme } from '@mui/material';
import { JSX, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { QuestionPresentation } from '@/components/questionPresentation/QuestionPresentation.comp.tsx';
import { innerPanelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { useQuestionMedia } from '@/views/questionForm/context/QuestionMedia.context.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';
import { toFormPresentation } from '@/views/questionForm/util/formPresentation.util.ts';

export const QuestionFormPreview = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionForm.formPreview');
  const { watch } = useFormContext<QuestionFormModel>();
  const media = useQuestionMedia();
  const [showCorrect, setShowCorrect] = useState(false);
  const values = watch();

  return (
    <SectionPanel description={t('description')} icon={VisibilityOutlinedIcon} title={t('title')}>
      <Box sx={{ ...innerPanelSx(theme.colors), p: 3 }}>
        <QuestionPresentation
          model={toFormPresentation(values, media)}
          onShowCorrectChange={setShowCorrect}
          showCorrect={showCorrect}
          type={values.type}
        />
      </Box>
    </SectionPanel>
  );
};
