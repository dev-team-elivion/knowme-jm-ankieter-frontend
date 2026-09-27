import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { Box, Button, Stack } from '@mui/material';
import { JSX, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { DataTable } from '@/components/dataTable/DataTable.comp.tsx';
import { useDataTableQuery } from '@/components/dataTable/util/useDataTableQuery.util.ts';
import { PageHeader } from '@/components/page/PageHeader.comp.tsx';
import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { revealSx } from '@/config/theme/uiTokens.ts';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionBankToolbar } from '@/views/questionBank/components/QuestionBankToolbar.comp.tsx';
import { QuestionDetailDialog } from '@/views/questionBank/components/QuestionDetailDialog.comp.tsx';
import { QuestionRowActionHandlers } from '@/views/questionBank/components/QuestionRowActions.comp.tsx';
import {
  QUESTION_BANK_DEFAULTS,
  QUESTION_SORT_KEYS,
} from '@/views/questionBank/model/questionBank.constants.ts';
import { QuestionDialog } from '@/views/questionBank/model/QuestionBank.model.ts';
import { useGetQuestionList } from '@/views/questionBank/util/useGetQuestionList.util.ts';
import { useQuestionBankColumns } from '@/views/questionBank/util/useQuestionBankColumns.util.tsx';
import {
  buildQuestionDuplicatePath,
  buildQuestionEditPath,
} from '@/views/questionForm/util/questionRoutes.util.ts';

export const QuestionBankView = (): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionBank');
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<null | QuestionDialog>(null);
  const controller = useDataTableQuery({
    defaults: QUESTION_BANK_DEFAULTS,
    sortKeys: QUESTION_SORT_KEYS,
  });
  const source = useGetQuestionList(controller.query);

  const handlers = useMemo<QuestionRowActionHandlers>(
    () => ({
      onDuplicate: question => void navigate(buildQuestionDuplicatePath(question.id)),
      onEdit: question => void navigate(buildQuestionEditPath(question.id)),
      onHistory: question => setDialog({ kind: 'history', questionId: question.id }),
      onPreview: question => setDialog({ kind: 'preview', questionId: question.id }),
    }),
    [navigate],
  );
  const columns = useQuestionBankColumns(handlers);

  return (
    <Stack spacing={3}>
      <Box sx={{ ...revealSx(0), pb: 1 }}>
        <PageHeader
          actions={
            <Button component={Link} startIcon={<AddRoundedIcon />} to={RouteEnum.QUESTION_CREATE}>
              {t('addQuestion')}
            </Button>
          }
          description={t('description')}
          icon={LibraryBooksOutlinedIcon}
          title={t('title')}
        />
      </Box>
      <Box sx={revealSx(1)}>
        <DataTable
          ariaLabel={t('tableLabel')}
          columns={columns}
          controller={controller}
          emptyState={
            <EmptyState
              action={{
                label: t('addQuestion'),
                onClick: () => void navigate(RouteEnum.QUESTION_CREATE),
              }}
              description={t('empty.description')}
              title={t('empty.title')}
            />
          }
          getRowKey={row => row.id}
          onRowClick={row => void navigate(buildQuestionEditPath(row.id))}
          source={source}
          toolbar={<QuestionBankToolbar controller={controller} />}
        />
      </Box>
      <QuestionDetailDialog
        dialog={dialog}
        locale={controller.query.filters.locale}
        onClose={() => setDialog(null)}
      />
    </Stack>
  );
};
