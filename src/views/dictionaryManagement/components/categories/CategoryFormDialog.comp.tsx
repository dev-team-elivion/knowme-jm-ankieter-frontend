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
import { useForm } from 'react-hook-form';

import { CategoryDto } from '@/api/generated';
import { hasHttpStatus } from '@/api/guards/isAxiosError.guard.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { FormProviderKnowMe } from '@/components/form/FormProviderKnowMe.comp.tsx';
import { TextFormField } from '@/components/form/TextFormField.comp.tsx';
import { resolveByFieldName } from '@/components/form/util/applyApiFieldErrors.util.ts';
import { useApiFormErrorHandler } from '@/components/form/util/useApiFormErrorHandler.util.ts';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { CategoryFormModel } from '@/views/dictionaryManagement/model/DictionaryManagement.model.ts';
import { useCategoryFormValidation } from '@/views/dictionaryManagement/model/useCategoryFormValidation.validation.ts';
import {
  getNextDisplayOrder,
  toCategoryRequest,
} from '@/views/dictionaryManagement/util/category.util.ts';
import { useCreateCategory } from '@/views/dictionaryManagement/util/useCreateCategory.util.ts';
import { useUpdateCategory } from '@/views/dictionaryManagement/util/useUpdateCategory.util.ts';

const RESOLVE_SERVER_FIELD = resolveByFieldName<CategoryFormModel>(['codePrefix', 'name']);

type Props = {
  categories: CategoryDto[];
  category: CategoryDto | null;
  onClose: () => void;
};

const toFormValues = (category: CategoryDto | null): CategoryFormModel => ({
  codePrefix: category?.codePrefix ?? '',
  name: category?.name ?? '',
});

export const CategoryFormDialog = ({ categories, category, onClose }: Props): JSX.Element => {
  const titleId = useId();
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.categories');
  const { notifyError, notifySuccess } = useNotifications();
  const { createCategory } = useCreateCategory();
  const { updateCategory } = useUpdateCategory();
  const validation = useCategoryFormValidation({
    categories,
    editedCategoryId: category?.id ?? null,
  });
  const form = useForm<CategoryFormModel>({
    defaultValues: toFormValues(category),
    resolver: yupResolver(validation),
  });
  const handleApiError = useApiFormErrorHandler(form.setError, RESOLVE_SERVER_FIELD);
  const isPrefixLocked = category !== null && category.questionCount > 0;

  const save = async ({ codePrefix, name }: CategoryFormModel): Promise<void> => {
    const values = { codePrefix: codePrefix.trim(), name: name.trim() };
    if (category === null) {
      await createCategory({
        ...values,
        active: true,
        displayOrder: getNextDisplayOrder(categories),
      });
      notifySuccess(t('created'));
      return;
    }
    await updateCategory({
      categoryId: category.id,
      request: { ...toCategoryRequest(category), ...values },
    });
    notifySuccess(t('saved'));
  };

  const handleSubmit = async (values: CategoryFormModel): Promise<void> => {
    try {
      await save(values);
      onClose();
    } catch (error) {
      if (hasHttpStatus(error, HttpStatusEnum.CONFLICT)) {
        notifyError(t('conflict'));
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
          <DialogTitle id={titleId}>
            {category === null ? t('form.createTitle') : t('form.editTitle')}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ pt: 1 }}>
              <TextFormField<CategoryFormModel, 'name'> label={t('form.name')} name="name" />
              <TextFormField<CategoryFormModel, 'codePrefix'>
                disabled={isPrefixLocked}
                helperText={
                  isPrefixLocked
                    ? t('form.prefixLocked', { count: category.questionCount })
                    : t('form.prefixHint')
                }
                label={t('form.prefix')}
                name="codePrefix"
              />
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
