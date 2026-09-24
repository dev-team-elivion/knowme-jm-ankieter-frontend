import { Typography } from '@mui/material';
import { useMemo } from 'react';

import { DataTableColumn } from '@/components/dataTable/model/DataTable.model.ts';
import { StatusPillTone } from '@/components/state/model/StatusPill.model.ts';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { numericSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import {
  QuestionSortKeyEnum,
  QuestionStatusEnum,
} from '@/views/devPatterns/model/Question.enum.ts';
import { QuestionRow } from '@/views/devPatterns/model/Question.model.ts';

const STATUS_TONES: Record<QuestionStatusEnum, StatusPillTone> = {
  [QuestionStatusEnum.ACTIVE]: 'success',
  [QuestionStatusEnum.ARCHIVED]: 'neutral',
  [QuestionStatusEnum.DRAFT]: 'info',
};

type Return = DataTableColumn<QuestionRow, QuestionSortKeyEnum>[];

export const useQuestionTableColumns = (): Return => {
  const { t } = useTranslationWithPrefix('views.devPatterns.table.columns');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');

  return useMemo(
    () => [
      {
        id: 'code',
        label: t('code'),
        render: row => (
          <Typography sx={{ ...numericSx, fontWeight: 600 }} variant="body2">
            {row.code}
          </Typography>
        ),
        sortKey: QuestionSortKeyEnum.CODE,
        width: 120,
      },
      {
        id: 'content',
        label: t('content'),
        render: row => row.content,
        sortKey: QuestionSortKeyEnum.CONTENT,
      },
      {
        id: 'category',
        label: t('category'),
        render: row => tDictionary(`questionCategory.${row.category}`),
        sortKey: QuestionSortKeyEnum.CATEGORY,
        width: 200,
      },
      {
        id: 'status',
        label: t('status'),
        render: row => (
          <StatusPill
            label={tDictionary(`questionStatus.${row.status}`)}
            tone={STATUS_TONES[row.status]}
          />
        ),
        sortKey: QuestionSortKeyEnum.STATUS,
        width: 150,
      },
      {
        align: 'right',
        id: 'updatedAt',
        label: t('updatedAt'),
        render: row => <span style={numericSx}>{row.updatedAt}</span>,
        sortKey: QuestionSortKeyEnum.UPDATED_AT,
        width: 130,
      },
    ],
    [t, tDictionary],
  );
};
