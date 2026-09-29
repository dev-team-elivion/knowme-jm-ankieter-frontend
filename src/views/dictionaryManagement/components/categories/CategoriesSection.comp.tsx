import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { JSX, useMemo, useState } from 'react';

import { CategoryDto } from '@/api/generated';
import { DataTable } from '@/components/dataTable/DataTable.comp.tsx';
import { DataTableToolbar } from '@/components/dataTable/DataTableToolbar.comp.tsx';
import { DataTableSource } from '@/components/dataTable/model/DataTable.model.ts';
import { useDataTableQuery } from '@/components/dataTable/util/useDataTableQuery.util.ts';
import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { CategoryDeactivateDialog } from '@/views/dictionaryManagement/components/categories/CategoryDeactivateDialog.comp.tsx';
import { CategoryFormDialog } from '@/views/dictionaryManagement/components/categories/CategoryFormDialog.comp.tsx';
import { CategoryRowActionHandlers } from '@/views/dictionaryManagement/components/categories/CategoryRowActions.comp.tsx';
import {
  CATEGORY_SORT_KEYS,
  CATEGORY_TABLE_DEFAULTS,
  CATEGORY_TABLE_PREFIX,
} from '@/views/dictionaryManagement/model/dictionaryManagement.constants.ts';
import { toClientPage } from '@/views/dictionaryManagement/util/dictionaryTable.util.ts';
import { useCategoryColumns } from '@/views/dictionaryManagement/util/useCategoryColumns.util.tsx';
import { useCategoryMove } from '@/views/dictionaryManagement/util/useCategoryMove.util.ts';
import { useCategoryStatusChange } from '@/views/dictionaryManagement/util/useCategoryStatusChange.util.ts';
import { useGetCategoryDictionary } from '@/views/dictionaryManagement/util/useGetCategoryDictionary.util.ts';

type FormState = { category: CategoryDto | null } | null;

export const CategoriesSection = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.categories');
  const [formState, setFormState] = useState<FormState>(null);
  const [deactivating, setDeactivating] = useState<CategoryDto | null>(null);
  const controller = useDataTableQuery({
    defaults: CATEGORY_TABLE_DEFAULTS,
    searchParamPrefix: CATEGORY_TABLE_PREFIX,
    sortKeys: CATEGORY_SORT_KEYS,
  });
  const { categories, isError, isFetching, isLoading, retry } = useGetCategoryDictionary();
  const allCategories = useMemo(() => categories ?? [], [categories]);
  const { isMoving, move } = useCategoryMove(allCategories);
  const { changeStatus, isPending: isChangingStatus } = useCategoryStatusChange();

  const handlers = useMemo<CategoryRowActionHandlers>(
    () => ({
      onActivate: category => void changeStatus(category, true),
      onDeactivate: category => setDeactivating(category),
      onEdit: category => setFormState({ category }),
    }),
    [changeStatus],
  );
  const columns = useCategoryColumns({
    categories: allCategories,
    handlers,
    isMoving,
    onMove: move,
  });

  const { page, pageSize } = controller.query;
  const source: DataTableSource<CategoryDto> = {
    data: categories && toClientPage(categories, page, pageSize),
    isError,
    isFetching,
    isLoading,
    retry,
  };
  const openCreate = (): void => setFormState({ category: null });

  const confirmDeactivate = (category: CategoryDto): void => {
    void changeStatus(category, false).then(isDone => isDone && setDeactivating(null));
  };

  return (
    <Stack spacing={2}>
      <InfoCallout>{t('prefixNotice')}</InfoCallout>
      <DataTable
        ariaLabel={t('tableLabel')}
        columns={columns}
        controller={controller}
        emptyState={
          <EmptyState
            action={{ label: t('add'), onClick: openCreate }}
            description={t('empty.description')}
            title={t('empty.title')}
          />
        }
        getRowKey={row => row.id}
        onRowClick={category => setFormState({ category })}
        source={source}
        toolbar={
          <DataTableToolbar
            actions={
              <Button onClick={openCreate} startIcon={<AddRoundedIcon />}>
                {t('add')}
              </Button>
            }
          >
            <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
              {t('orderHint')}
            </Typography>
          </DataTableToolbar>
        }
      />
      {formState && (
        <CategoryFormDialog
          categories={allCategories}
          category={formState.category}
          onClose={() => setFormState(null)}
        />
      )}
      <CategoryDeactivateDialog
        category={deactivating}
        isPending={isChangingStatus}
        onClose={() => setDeactivating(null)}
        onConfirm={confirmDeactivate}
      />
    </Stack>
  );
};
