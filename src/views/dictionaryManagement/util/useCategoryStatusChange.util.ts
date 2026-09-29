import { useCallback } from 'react';

import { CategoryDto } from '@/api/generated';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { toCategoryRequest } from '@/views/dictionaryManagement/util/category.util.ts';
import { useUpdateCategory } from '@/views/dictionaryManagement/util/useUpdateCategory.util.ts';

type Return = {
  changeStatus: (category: CategoryDto, active: boolean) => Promise<boolean>;
  isPending: boolean;
};

export const useCategoryStatusChange = (): Return => {
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.categories');
  const { notifyError, notifySuccess } = useNotifications();
  const { isPending, updateCategory } = useUpdateCategory();

  const changeStatus = useCallback(
    async (category: CategoryDto, active: boolean): Promise<boolean> => {
      try {
        await updateCategory({
          categoryId: category.id,
          request: { ...toCategoryRequest(category), active },
        });
        notifySuccess(t(active ? 'activated' : 'deactivated', { name: category.name }));
        return true;
      } catch {
        notifyError(t('statusFailed'));
        return false;
      }
    },
    [notifyError, notifySuccess, t, updateCategory],
  );

  return { changeStatus, isPending };
};
