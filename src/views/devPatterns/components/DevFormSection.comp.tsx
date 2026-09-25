import { yupResolver } from '@hookform/resolvers/yup';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { Box, Button, FormControlLabel, Stack, Switch } from '@mui/material';
import { JSX, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormProviderKnowMe } from '@/components/form/FormProviderKnowMe.comp.tsx';
import { SelectFormField } from '@/components/form/SelectFormField.comp.tsx';
import { TextFormField } from '@/components/form/TextFormField.comp.tsx';
import { resolveByFieldName } from '@/components/form/util/applyApiFieldErrors.util.ts';
import { useApiFormErrorHandler } from '@/components/form/util/useApiFormErrorHandler.util.ts';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { buildQuestionServerErrorFixture } from '@/views/devPatterns/fixtures/questionServerError.fixture.ts';
import { QuestionFormModel } from '@/views/devPatterns/model/Question.model.ts';
import { QUESTION_CATEGORIES } from '@/views/devPatterns/model/questionTable.constants.ts';
import { useQuestionFormValidation } from '@/views/devPatterns/model/useQuestionFormValidation.validation.ts';

const DEFAULT_VALUES: QuestionFormModel = { authorEmail: '', category: '', content: '' };
const RESOLVE_SERVER_FIELD = resolveByFieldName<QuestionFormModel>([
  'authorEmail',
  'category',
  'content',
]);

type Props = {
  revealIndex: number;
};

export const DevFormSection = ({ revealIndex }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.devPatterns.form');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');
  const { notifySuccess } = useNotifications();
  const [simulateServerError, setSimulateServerError] = useState(false);
  const validation = useQuestionFormValidation();
  const form = useForm<QuestionFormModel>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validation),
  });
  const handleApiError = useApiFormErrorHandler(form.setError, RESOLVE_SERVER_FIELD);

  const categoryOptions = useMemo(
    () =>
      QUESTION_CATEGORIES.map(value => ({
        label: tDictionary(`questionCategory.${value}`),
        value,
      })),
    [tDictionary],
  );

  const handleSubmit = (): void => {
    if (simulateServerError) {
      handleApiError(buildQuestionServerErrorFixture());
      return;
    }
    notifySuccess(t('savedMessage'));
    form.reset(DEFAULT_VALUES);
  };

  return (
    <SectionPanel
      actions={
        <FormControlLabel
          control={
            <Switch
              checked={simulateServerError}
              onChange={event => setSimulateServerError(event.target.checked)}
            />
          }
          label={t('simulateServerError')}
        />
      }
      description={t('description')}
      icon={EditNoteOutlinedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <FormProviderKnowMe {...form} validation={validation}>
        <Box
          component="form"
          noValidate
          onSubmit={event => void form.handleSubmit(handleSubmit)(event)}
          sx={{ maxWidth: 720 }}
        >
          <Stack spacing={2.5}>
            <TextFormField<QuestionFormModel, 'content'>
              label={t('fields.content')}
              minRows={3}
              multiline
              name="content"
              placeholder={t('fields.contentPlaceholder')}
            />
            <Stack direction="row" spacing={2}>
              <SelectFormField<QuestionFormModel, 'category'>
                label={t('fields.category')}
                name="category"
                options={categoryOptions}
                placeholder={t('fields.category')}
              />
              <TextFormField<QuestionFormModel, 'authorEmail'>
                label={t('fields.email')}
                name="authorEmail"
                placeholder={t('fields.emailPlaceholder')}
                type="email"
              />
            </Stack>
            <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
              <Button disabled={form.formState.isSubmitting} type="submit" variant="contained">
                {t('submit')}
              </Button>
              <Button onClick={() => form.reset(DEFAULT_VALUES)} variant="outlined">
                {t('reset')}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </FormProviderKnowMe>
    </SectionPanel>
  );
};
