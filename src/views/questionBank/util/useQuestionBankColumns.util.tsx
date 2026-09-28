import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import { Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';

import { QuestionListItemDto } from '@/api/generated';
import { DataTableColumn } from '@/components/dataTable/model/DataTable.model.ts';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { numericSx } from '@/config/theme/uiTokens.ts';
import { formatApiDate } from '@/utils/formatDate.util.ts';
import { getVersionStatusTone } from '@/utils/questionStatusTone.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import {
  QuestionRowActionHandlers,
  QuestionRowActions,
} from '@/views/questionBank/components/QuestionRowActions.comp.tsx';
import { QuestionSortKeyEnum } from '@/views/questionBank/model/QuestionSortKey.enum.ts';
import { isQuestionFormType } from '@/views/questionForm/util/questionEnums.guard.ts';

type Return = DataTableColumn<QuestionListItemDto, QuestionSortKeyEnum>[];

export const useQuestionBankColumns = (handlers: QuestionRowActionHandlers): Return => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionBank');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');

  return useMemo(
    () => [
      {
        id: 'key',
        label: t('columns.key'),
        render: row => (
          <Typography sx={{ ...numericSx, fontWeight: 600, whiteSpace: 'nowrap' }} variant="body2">
            {row.businessKey}
          </Typography>
        ),
        sortKey: QuestionSortKeyEnum.BUSINESS_KEY,
        width: 110,
      },
      {
        id: 'summary',
        label: t('columns.summary'),
        render: row => (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', minWidth: 0 }}>
            {row.hasMedia && (
              <Tooltip title={t('hasMedia')}>
                <PermMediaOutlinedIcon
                  aria-label={t('hasMedia')}
                  sx={{ color: theme.colors.accentInk, flexShrink: 0, fontSize: 18 }}
                />
              </Tooltip>
            )}
            <Typography
              sx={{
                color: row.summary ? theme.colors.textPrimary : theme.colors.textSecondary,
                display: '-webkit-box',
                fontStyle: row.summary ? 'normal' : 'italic',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
              variant="body2"
            >
              {row.summary ?? t('noSummary')}
            </Typography>
          </Stack>
        ),
      },
      {
        id: 'type',
        label: t('columns.type'),
        render: row => tDictionary(`questionType.${row.type}`),
        width: 150,
      },
      {
        id: 'category',
        label: t('columns.category'),
        render: row => row.categoryName,
        width: 160,
      },
      {
        id: 'positions',
        label: t('columns.positions'),
        render: row => row.positionCodes?.join(', '),
        width: 130,
      },
      {
        id: 'status',
        label: t('columns.status'),
        render: row => (
          <StatusPill
            label={tDictionary(`versionStatus.${row.status}`)}
            tone={getVersionStatusTone(row.status)}
          />
        ),
        width: 110,
      },
      {
        align: 'right',
        id: 'version',
        label: t('columns.version'),
        render: row => <span style={numericSx}>{row.versionNo}</span>,
        sortKey: QuestionSortKeyEnum.VERSION_NO,
        width: 90,
      },
      {
        align: 'right',
        id: 'updatedAt',
        label: t('columns.updatedAt'),
        render: row => (
          <span style={{ ...numericSx, whiteSpace: 'nowrap' }}>
            {formatApiDate(row.updatedAt, { withTime: true })}
          </span>
        ),
        sortKey: QuestionSortKeyEnum.UPDATED_AT,
        width: 150,
      },
      {
        align: 'right',
        id: 'actions',
        label: t('columns.actions'),
        render: row => (
          <QuestionRowActions
            canDuplicate={isQuestionFormType(row.type)}
            question={row}
            {...handlers}
          />
        ),
        width: 72,
      },
    ],
    [handlers, t, tDictionary, theme.colors],
  );
};
