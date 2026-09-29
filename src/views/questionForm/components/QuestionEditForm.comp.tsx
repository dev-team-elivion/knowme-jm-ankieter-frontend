import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { JSX, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { QuestionDetailsDto, VersionStatusDto } from '@/api/generated';
import { FormProviderKnowMe } from '@/components/form/FormProviderKnowMe.comp.tsx';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { NewVersionDialog } from '@/views/questionForm/components/NewVersionDialog.comp.tsx';
import { QuestionEditActions } from '@/views/questionForm/components/QuestionEditActions.comp.tsx';
import { QuestionEditHeader } from '@/views/questionForm/components/QuestionEditHeader.comp.tsx';
import { QuestionFormActionBar } from '@/views/questionForm/components/QuestionFormActionBar.comp.tsx';
import { QuestionFormSections } from '@/views/questionForm/components/QuestionFormSections.comp.tsx';
import { QuestionMediaProvider } from '@/views/questionForm/context/QuestionMedia.provider.tsx';
import {
  QuestionFormModel,
  QuestionFormType,
} from '@/views/questionForm/model/QuestionForm.model.ts';
import { useQuestionFormValidation } from '@/views/questionForm/model/useQuestionFormValidation.validation.ts';
import {
  findEditableVersion,
  toQuestionForm,
} from '@/views/questionForm/util/questionFormMapping.util.ts';
import { useEditQuestionSubmit } from '@/views/questionForm/util/useEditQuestionSubmit.util.ts';

type Props = {
  question: QuestionDetailsDto;
  type: QuestionFormType;
};

export const QuestionEditForm = ({ question, type }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm.edit');
  const [isNewVersionDialogOpen, setIsNewVersionDialogOpen] = useState(false);
  const editableVersion = findEditableVersion(question);
  const baseVersion = editableVersion ?? question.versions.at(0);
  const values = useMemo(
    () => toQuestionForm(question, baseVersion, type),
    [baseVersion, question, type],
  );
  const validation = useQuestionFormValidation();
  const form = useForm<QuestionFormModel>({
    resetOptions: { keepDirtyValues: true },
    resolver: yupResolver(validation),
    values,
  });
  const { createNewVersion, fixTypo, isSaving } = useEditQuestionSubmit({
    baseVersion,
    editableVersion,
    form,
    question,
  });
  const canFixTypo = editableVersion !== undefined;
  const isDraft = editableVersion?.status === VersionStatusDto.Draft;

  const handleConfirmNewVersion = (): void => {
    void form.handleSubmit(async submitted => {
      await createNewVersion(submitted);
      setIsNewVersionDialogOpen(false);
    })();
  };

  return (
    <Stack spacing={3}>
      <QuestionEditHeader question={question} version={baseVersion} />
      {!canFixTypo && (
        <InfoCallout title={t('noEditableVersion.title')} tone="warning">
          {t('noEditableVersion.description')}
        </InfoCallout>
      )}
      <FormProviderKnowMe {...form} validation={validation}>
        <Stack component="form" noValidate onSubmit={event => event.preventDefault()} spacing={3}>
          <QuestionMediaProvider questionId={question.id} version={baseVersion}>
            <QuestionFormSections currentCategory={question.category} isEditing />
          </QuestionMediaProvider>
          <QuestionFormActionBar>
            <QuestionEditActions
              canFixTypo={canFixTypo}
              isDirty={form.formState.isDirty}
              isDraft={isDraft}
              isSaving={isSaving || form.formState.isSubmitting}
              onFixTypo={() => void form.handleSubmit(fixTypo)()}
              onNewVersion={() => void form.handleSubmit(() => setIsNewVersionDialogOpen(true))()}
            />
          </QuestionFormActionBar>
        </Stack>
      </FormProviderKnowMe>
      <NewVersionDialog
        isOpen={isNewVersionDialogOpen}
        isSaving={isSaving || form.formState.isSubmitting}
        onCancel={() => setIsNewVersionDialogOpen(false)}
        onConfirm={handleConfirmNewVersion}
      />
    </Stack>
  );
};
