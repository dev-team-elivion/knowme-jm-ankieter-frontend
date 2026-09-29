import { Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';

import { TagDto } from '@/api/generated';
import { DataTableColumn } from '@/components/dataTable/model/DataTable.model.ts';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { numericSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import {
  TagRowActionHandlers,
  TagRowActions,
} from '@/views/dictionaryManagement/components/tags/TagRowActions.comp.tsx';
import {
  DictionaryStatusFilterEnum,
  TagSortKeyEnum,
} from '@/views/dictionaryManagement/model/DictionaryManagement.enum.ts';

type Return = DataTableColumn<TagDto, TagSortKeyEnum>[];

export const useTagColumns = (handlers: TagRowActionHandlers): Return => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.tags');

  return useMemo(
    () => [
      {
        id: 'label',
        label: t('columns.label'),
        render: row => (
          <Typography
            sx={{
              color: row.active ? theme.colors.textPrimary : theme.colors.textSecondary,
              fontWeight: 600,
            }}
            variant="body2"
          >
            {row.label}
          </Typography>
        ),
        sortKey: TagSortKeyEnum.LABEL,
      },
      {
        align: 'right',
        id: 'questions',
        label: t('columns.questions'),
        render: row => <span style={numericSx}>{row.questionCount}</span>,
        sortKey: TagSortKeyEnum.QUESTION_COUNT,
        width: 120,
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
        render: row => <TagRowActions tag={row} {...handlers} />,
        width: 72,
      },
    ],
    [handlers, t, theme.colors],
  );
};
