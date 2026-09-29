import { Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';

import { CategoryDto } from '@/api/generated';
import { DataTableColumn } from '@/components/dataTable/model/DataTable.model.ts';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { numericSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { CategoryOrderButtons } from '@/views/dictionaryManagement/components/categories/CategoryOrderButtons.comp.tsx';
import {
  CategoryRowActionHandlers,
  CategoryRowActions,
} from '@/views/dictionaryManagement/components/categories/CategoryRowActions.comp.tsx';
import {
  CategorySortKeyEnum,
  DictionaryStatusFilterEnum,
} from '@/views/dictionaryManagement/model/DictionaryManagement.enum.ts';
import { MoveDirection } from '@/views/dictionaryManagement/model/DictionaryManagement.model.ts';

type Options = {
  categories: CategoryDto[];
  handlers: CategoryRowActionHandlers;
  isMoving: boolean;
  onMove: (category: CategoryDto, direction: MoveDirection) => void;
};

type Return = DataTableColumn<CategoryDto, CategorySortKeyEnum>[];

export const useCategoryColumns = ({ categories, handlers, isMoving, onMove }: Options): Return => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.categories');

  return useMemo(
    () => [
      {
        id: 'order',
        label: t('columns.order'),
        render: row => {
          const index = categories.findIndex(category => category.id === row.id);
          return (
            <CategoryOrderButtons
              canMoveDown={index < categories.length - 1}
              canMoveUp={index > 0}
              disabled={isMoving}
              name={row.name}
              onMove={direction => onMove(row, direction)}
            />
          );
        },
        width: 96,
      },
      {
        id: 'name',
        label: t('columns.name'),
        render: row => (
          <Typography
            sx={{
              color: row.active ? theme.colors.textPrimary : theme.colors.textSecondary,
              fontWeight: 600,
            }}
            variant="body2"
          >
            {row.name}
          </Typography>
        ),
      },
      {
        id: 'prefix',
        label: t('columns.prefix'),
        render: row => (
          <Typography sx={{ ...numericSx, fontWeight: 600 }} variant="body2">
            {row.codePrefix}
          </Typography>
        ),
        width: 140,
      },
      {
        align: 'right',
        id: 'questions',
        label: t('columns.questions'),
        render: row => <span style={numericSx}>{row.questionCount}</span>,
        width: 110,
      },
      {
        id: 'status',
        label: t('columns.status'),
        render: row => (
          <StatusPill
            label={t(
              `status.${row.active ? DictionaryStatusFilterEnum.ACTIVE : DictionaryStatusFilterEnum.INACTIVE}`,
            )}
            tone={row.active ? 'success' : 'neutral'}
          />
        ),
        width: 130,
      },
      {
        align: 'right',
        id: 'actions',
        label: t('columns.actions'),
        render: row => <CategoryRowActions category={row} {...handlers} />,
        width: 72,
      },
    ],
    [categories, handlers, isMoving, onMove, t, theme.colors],
  );
};
