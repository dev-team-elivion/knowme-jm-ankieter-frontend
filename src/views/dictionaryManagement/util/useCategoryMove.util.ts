import { useCallback } from 'react';

import { CategoryDto } from '@/api/generated';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { MoveDirection } from '@/views/dictionaryManagement/model/DictionaryManagement.model.ts';
import { moveCategory } from '@/views/dictionaryManagement/util/category.util.ts';
import { useReorderCategories } from '@/views/dictionaryManagement/util/useReorderCategories.util.ts';

type Return = {
  isMoving: boolean;
  move: (category: CategoryDto, direction: MoveDirection) => void;
};

export const useCategoryMove = (categories: CategoryDto[]): Return => {
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.categories');
  const { notifyError } = useNotifications();
  const { isPending, reorderCategories } = useReorderCategories();

  const move = useCallback(
    (category: CategoryDto, direction: MoveDirection): void => {
      const reordered = moveCategory(categories, category.id, direction);
      if (reordered === categories) {
        return;
      }
      reorderCategories({ previous: categories, reordered }).catch(() =>
        notifyError(t('reorderFailed')),
      );
    },
    [categories, notifyError, reorderCategories, t],
  );

  return { isMoving: isPending, move };
};
