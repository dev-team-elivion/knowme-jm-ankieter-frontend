import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import { Box, Button, Stack } from '@mui/material';
import { JSX, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { BulkOperationDto, QuestionListItemDto } from '@/api/generated';
import { DataTable } from '@/components/dataTable/DataTable.comp.tsx';
import { useDataTableQuery } from '@/components/dataTable/util/useDataTableQuery.util.ts';
import { PageHeader } from '@/components/page/PageHeader.comp.tsx';
import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { pressableSx, revealSx } from '@/config/theme/uiTokens.ts';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { BulkOperationDialog } from '@/views/questionBank/components/bulk/BulkOperationDialog.comp.tsx';
import { QuestionSelectionBar } from '@/views/questionBank/components/bulk/QuestionSelectionBar.comp.tsx';
import { QuestionBankToolbar } from '@/views/questionBank/components/QuestionBankToolbar.comp.tsx';
import { QuestionRowActionHandlers } from '@/views/questionBank/components/QuestionRowActions.comp.tsx';
import { RetireQuestionDialog } from '@/views/questionBank/components/RetireQuestionDialog.comp.tsx';
import {
  QUESTION_BANK_DEFAULTS,
  QUESTION_SORT_KEYS,
} from '@/views/questionBank/model/questionBank.constants.ts';
import { useGetQuestionList } from '@/views/questionBank/util/useGetQuestionList.util.ts';
import { useQuestionBankColumns } from '@/views/questionBank/util/useQuestionBankColumns.util.tsx';
import { useQuestionBankFilterOptions } from '@/views/questionBank/util/useQuestionBankFilterOptions.util.ts';
import { useQuestionSelection } from '@/views/questionBank/util/useQuestionSelection.util.ts';
import { useSelectionColumn } from '@/views/questionBank/util/useSelectionColumn.util.tsx';
import {
  buildQuestionCreatePath,
  buildQuestionDuplicatePath,
  buildQuestionEditPath,
  buildQuestionFocusEntryPath,
  buildQuestionHistoryPath,
} from '@/views/questionForm/util/questionRoutes.util.ts';

const createFocusSessionId = (): string => Date.now().toString(36);

export const QuestionBankView = (): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionBank');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const returnTo = location.search ? `${RouteEnum.QUESTION_BANK}${location.search}` : undefined;
  const createPath = buildQuestionCreatePath(returnTo);
  const controller = useDataTableQuery({
    defaults: QUESTION_BANK_DEFAULTS,
    sortKeys: QUESTION_SORT_KEYS,
  });
  const source = useGetQuestionList(controller.query);
  const options = useQuestionBankFilterOptions();
  const selectionState = useQuestionSelection(JSON.stringify(controller.query.filters));
  const { selection } = selectionState;
  const [operation, setOperation] = useState<BulkOperationDto | null>(null);
  const [retireTarget, setRetireTarget] = useState<null | QuestionListItemDto>(null);
  const pageIds = source.data?.items.map(row => row.id) ?? [];
  const total = source.data?.totalElements ?? 0;
  const hasSelection = selection.kind === 'allMatching' || selection.ids.length > 0;
  const canSelectAllMatching =
    selection.kind === 'ids' &&
    total > pageIds.length &&
    pageIds.length > 0 &&
    pageIds.every(id => selection.ids.includes(id));
  const selectionColumn = useSelectionColumn({
    isSelected: selectionState.isSelected,
    onToggle: selectionState.toggle,
    onTogglePage: selectionState.togglePage,
    pageIds,
    selection,
  });

  const handlers = useMemo<QuestionRowActionHandlers>(
    () => ({
      onDuplicate: question => void navigate(buildQuestionDuplicatePath(question.id, returnTo)),
      onEdit: question => void navigate(buildQuestionEditPath(question.id, returnTo)),
      onHistory: question => void navigate(buildQuestionHistoryPath(question.id, returnTo)),
      onPreview: question =>
        void navigate(
          buildQuestionFocusEntryPath(searchParams, createFocusSessionId(), question.id),
        ),
      onRetire: setRetireTarget,
    }),
    [navigate, returnTo, searchParams],
  );
  const columns = useQuestionBankColumns(handlers);

  return (
    <Stack spacing={3}>
      <Box sx={{ ...revealSx(0), pb: 1 }}>
        <PageHeader
          actions={
            <>
              <Button
                onClick={() =>
                  void navigate(buildQuestionFocusEntryPath(searchParams, createFocusSessionId()))
                }
                startIcon={<ViewCarouselOutlinedIcon />}
                sx={pressableSx}
                variant="outlined"
              >
                {t('review')}
              </Button>
              <Button component={Link} startIcon={<AddRoundedIcon />} to={createPath}>
                {t('addQuestion')}
              </Button>
            </>
          }
          description={t('description')}
          icon={LibraryBooksOutlinedIcon}
          title={t('title')}
        />
      </Box>
      <Box sx={revealSx(1)}>
        <DataTable
          ariaLabel={t('tableLabel')}
          columns={[selectionColumn, ...columns]}
          controller={controller}
          emptyState={
            <EmptyState
              action={{
                label: t('addQuestion'),
                onClick: () => void navigate(createPath),
              }}
              description={t('empty.description')}
              title={t('empty.title')}
            />
          }
          getRowKey={row => row.id}
          isRowSelected={row => selectionState.isSelected(row.id)}
          onRowClick={row => void navigate(buildQuestionEditPath(row.id, returnTo))}
          source={source}
          toolbar={<QuestionBankToolbar controller={controller} options={options} />}
        />
      </Box>
      {hasSelection && (
        <QuestionSelectionBar
          canSelectAllMatching={canSelectAllMatching}
          onClear={selectionState.clear}
          onOperation={setOperation}
          onSelectAllMatching={selectionState.selectAllMatching}
          selection={selection}
          total={total}
        />
      )}
      {operation !== null && (
        <BulkOperationDialog
          onClose={() => setOperation(null)}
          onDone={() => {
            setOperation(null);
            selectionState.clear();
          }}
          operation={operation}
          options={options}
          query={controller.query}
          selection={selection}
        />
      )}
      <RetireQuestionDialog onClose={() => setRetireTarget(null)} question={retireTarget} />
    </Stack>
  );
};
