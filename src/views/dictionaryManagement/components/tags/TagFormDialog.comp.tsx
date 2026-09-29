import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { JSX, useId } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { hasHttpStatus } from '@/api/guards/isAxiosError.guard.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { FormProviderKnowMe } from '@/components/form/FormProviderKnowMe.comp.tsx';
import { TextFormField } from '@/components/form/TextFormField.comp.tsx';
import { resolveByFieldName } from '@/components/form/util/applyApiFieldErrors.util.ts';
import { useApiFormErrorHandler } from '@/components/form/util/useApiFormErrorHandler.util.ts';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { useCreateTag } from '@/hooks/useCreateTag.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { SimilarTagsHint } from '@/views/dictionaryManagement/components/tags/SimilarTagsHint.comp.tsx';
import { TAG_SUGGESTION_MIN_LENGTH } from '@/views/dictionaryManagement/model/dictionaryManagement.constants.ts';
import { TagFormModel } from '@/views/dictionaryManagement/model/DictionaryManagement.model.ts';
import { useTagFormValidation } from '@/views/dictionaryManagement/model/useTagFormValidation.validation.ts';

const DEFAULT_VALUES: TagFormModel = { label: '' };
const RESOLVE_SERVER_FIELD = resolveByFieldName<TagFormModel>(['label']);

type Props = {
  onClose: () => void;
};

export const TagFormDialog = ({ onClose }: Props): JSX.Element => {
  const titleId = useId();
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.tags');
  const { t: tValidation } = useTranslationWithPrefix('validation');
  const { notifySuccess } = useNotifications();
  const { createTag } = useCreateTag();
  const validation = useTagFormValidation();
  const form = useForm<TagFormModel>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validation),
  });
  const handleApiError = useApiFormErrorHandler(form.setError, RESOLVE_SERVER_FIELD);
  const label = useWatch({ control: form.control, name: 'label' }).trim();

  const handleSubmit = async (values: TagFormModel): Promise<void> => {
    try {
      await createTag({ active: true, label: values.label.trim() });
      notifySuccess(t('created'));
      onClose();
    } catch (error) {
      if (hasHttpStatus(error, HttpStatusEnum.CONFLICT)) {
        form.setError('label', { message: tValidation('tagTaken'), type: 'server' });
        return;
      }
      handleApiError(error);
    }
  };

  return (
    <Dialog aria-labelledby={titleId} fullWidth maxWidth="sm" onClose={onClose} open>
      <FormProviderKnowMe {...form} validation={validation}>
        <Box
          component="form"
          noValidate
          onSubmit={event => void form.handleSubmit(handleSubmit)(event)}
        >
          <DialogTitle id={titleId}>{t('form.title')}</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ pt: 1 }}>
              <TextFormField<TagFormModel, 'label'> label={t('form.label')} name="label" />
              {label.length >= TAG_SUGGESTION_MIN_LENGTH && <SimilarTagsHint label={label} />}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="text">
              {t('form.cancel')}
            </Button>
            <Button disabled={form.formState.isSubmitting} type="submit">
              {t('form.save')}
            </Button>
          </DialogActions>
        </Box>
      </FormProviderKnowMe>
    </Dialog>
  );
};
