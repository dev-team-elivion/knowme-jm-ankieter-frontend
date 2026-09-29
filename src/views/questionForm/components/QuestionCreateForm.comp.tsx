import { yupResolver } from '@hookform/resolvers/yup';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { Box, Button, Stack } from '@mui/material';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormProviderKnowMe } from '@/components/form/FormProviderKnowMe.comp.tsx';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { PageHeader } from '@/components/page/PageHeader.comp.tsx';
import { revealSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { BackToBankButton } from '@/views/questionForm/components/BackToBankButton.comp.tsx';
import { QuestionFormActionBar } from '@/views/questionForm/components/QuestionFormActionBar.comp.tsx';
import { QuestionFormSections } from '@/views/questionForm/components/QuestionFormSections.comp.tsx';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';
import { useQuestionFormValidation } from '@/views/questionForm/model/useQuestionFormValidation.validation.ts';
import { toCreateQuestionRequest } from '@/views/questionForm/util/questionFormMapping.util.ts';
import { buildQuestionEditPath } from '@/views/questionForm/util/questionRoutes.util.ts';
import { useCreateQuestion } from '@/views/questionForm/util/useCreateQuestion.util.ts';
import { useQuestionSaveErrorHandler } from '@/views/questionForm/util/useQuestionSaveErrorHandler.util.ts';

type Props = {
  defaultValues: QuestionFormModel;
  description: string;
};

export const QuestionCreateForm = ({ defaultValues, description }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm');
  const navigate = useNavigate();
  const { notifySuccess } = useNotifications();
  const validation = useQuestionFormValidation();
  const form = useForm<QuestionFormModel>({ defaultValues, resolver: yupResolver(validation) });
  const handleSaveError = useQuestionSaveErrorHandler(form);
  const { createQuestion, isPending } = useCreateQuestion();

  const handleSubmit = async (values: QuestionFormModel): Promise<void> => {
    try {
      const question = await createQuestion(toCreateQuestionRequest(values));
      notifySuccess(t('notifications.created'));
      await navigate(buildQuestionEditPath(question.id), { replace: true });
    } catch (error) {
      handleSaveError(error);
    }
  };

  return (
    <Stack spacing={3}>
      <Box sx={{ ...revealSx(0), pb: 1 }}>
        <PageHeader
          backAction={<BackToBankButton />}
          description={description}
          icon={LibraryAddOutlinedIcon}
          title={t('create.title')}
        />
      </Box>
      <FormProviderKnowMe {...form} validation={validation}>
        <Stack
          component="form"
          noValidate
          onSubmit={event => void form.handleSubmit(handleSubmit)(event)}
          spacing={3}
        >
          <QuestionFormSections isEditing={false} />
          <QuestionFormActionBar>
            <Button disabled={isPending || form.formState.isSubmitting} type="submit">
              {t('actions.saveDraft')}
            </Button>
          </QuestionFormActionBar>
        </Stack>
      </FormProviderKnowMe>
    </Stack>
  );
};
