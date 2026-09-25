import { UseFormReturn } from 'react-hook-form';

import { QuestionDetailsDto, QuestionVersionDto } from '@/api/generated';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';
import {
  hasClassificationChanges,
  toClassificationRequest,
  toVersionContent,
} from '@/views/questionForm/util/questionFormMapping.util.ts';
import { useCreateQuestionVersion } from '@/views/questionForm/util/useCreateQuestionVersion.util.ts';
import { useQuestionSaveErrorHandler } from '@/views/questionForm/util/useQuestionSaveErrorHandler.util.ts';
import { useUpdateQuestionClassification } from '@/views/questionForm/util/useUpdateQuestionClassification.util.ts';
import { useUpdateQuestionVersion } from '@/views/questionForm/util/useUpdateQuestionVersion.util.ts';

type Params = {
  baseVersion: QuestionVersionDto | undefined;
  editableVersion: QuestionVersionDto | undefined;
  form: UseFormReturn<QuestionFormModel>;
  question: QuestionDetailsDto;
};

type Return = {
  createNewVersion: (values: QuestionFormModel) => Promise<void>;
  fixTypo: (values: QuestionFormModel) => Promise<void>;
  isSaving: boolean;
};

export const useEditQuestionSubmit = ({
  baseVersion,
  editableVersion,
  form,
  question,
}: Params): Return => {
  const { t } = useTranslationWithPrefix('views.questionForm.notifications');
  const { notifySuccess } = useNotifications();
  const handleSaveError = useQuestionSaveErrorHandler(form);
  const { isPending: isClassificationPending, updateClassification } =
    useUpdateQuestionClassification();
  const { isPending: isUpdatePending, updateVersion } = useUpdateQuestionVersion();
  const { createVersion, isPending: isCreatePending } = useCreateQuestionVersion();

  const markClassificationSaved = (values: QuestionFormModel): void => {
    form.resetField('categoryId', { defaultValue: values.categoryId });
    form.resetField('positionCodes', { defaultValue: values.positionCodes });
    form.resetField('source', { defaultValue: values.source });
    form.resetField('sourceName', { defaultValue: values.sourceName });
    form.resetField('tags', { defaultValue: values.tags });
  };

  const save = async (
    values: QuestionFormModel,
    saveContent: () => Promise<unknown>,
    successMessage: string,
  ): Promise<void> => {
    const needsClassification = hasClassificationChanges(values, form.formState.defaultValues);
    try {
      if (needsClassification) {
        await updateClassification({
          classification: toClassificationRequest(values),
          questionId: question.id,
        });
        markClassificationSaved(values);
      }
    } catch (error) {
      handleSaveError(error);
      return;
    }
    try {
      await saveContent();
      form.reset(values);
      notifySuccess(successMessage);
    } catch (error) {
      if (needsClassification) {
        notifySuccess(t('classificationSaved'));
      }
      handleSaveError(error);
    }
  };

  const fixTypo = async (values: QuestionFormModel): Promise<void> => {
    if (editableVersion === undefined) {
      return;
    }
    await save(
      values,
      () =>
        updateVersion({
          content: toVersionContent(values, editableVersion),
          questionId: question.id,
          versionId: editableVersion.id,
        }),
      t('typoFixed'),
    );
  };

  const createNewVersion = async (values: QuestionFormModel): Promise<void> => {
    await save(
      values,
      () =>
        createVersion({ content: toVersionContent(values, baseVersion), questionId: question.id }),
      t('versionCreated'),
    );
  };

  return {
    createNewVersion,
    fixTypo,
    isSaving: isClassificationPending || isUpdatePending || isCreatePending,
  };
};
