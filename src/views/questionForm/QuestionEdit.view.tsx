import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import { Box, useTheme } from '@mui/material';
import { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { ErrorState } from '@/components/state/ErrorState.comp.tsx';
import { panelSx } from '@/config/theme/uiTokens.ts';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionEditForm } from '@/views/questionForm/components/QuestionEditForm.comp.tsx';
import { QuestionFormSkeleton } from '@/views/questionForm/components/QuestionFormSkeleton.comp.tsx';
import { isChoiceQuestionType } from '@/views/questionForm/util/questionEnums.guard.ts';
import { useGetQuestion } from '@/views/questionForm/util/useGetQuestion.util.ts';

export const QuestionEditView = (): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { t } = useTranslationWithPrefix('views.questionForm');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');
  const { isError, isFetching, isNotFound, isPending, question, retry } =
    useGetQuestion(questionId);
  const backToBank = {
    label: t('backToBank'),
    onClick: () => void navigate(RouteEnum.QUESTION_BANK),
  };

  if (isNotFound) {
    return (
      <Box sx={panelSx(theme.colors)}>
        <EmptyState
          action={backToBank}
          description={t('edit.notFound.description')}
          icon={SearchOffOutlinedIcon}
          title={t('edit.notFound.title')}
        />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={panelSx(theme.colors)}>
        <ErrorState isRetrying={isFetching} onRetry={retry} />
      </Box>
    );
  }

  if (isPending || question === undefined) {
    return <QuestionFormSkeleton />;
  }

  if (!isChoiceQuestionType(question.type)) {
    return (
      <Box sx={panelSx(theme.colors)}>
        <EmptyState
          action={backToBank}
          description={t('edit.unsupportedType.description', {
            type: tDictionary(`questionType.${question.type}`),
          })}
          title={t('edit.unsupportedType.title')}
        />
      </Box>
    );
  }

  return <QuestionEditForm key={question.id} question={question} type={question.type} />;
};
