import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import { Box, Button, Stack } from '@mui/material';
import { JSX, useMemo } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { DataTable } from '@/components/dataTable/DataTable.comp.tsx';
import { useDataTableQuery } from '@/components/dataTable/util/useDataTableQuery.util.ts';
import { PageHeader } from '@/components/page/PageHeader.comp.tsx';
import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { pressableSx, revealSx } from '@/config/theme/uiTokens.ts';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionBankToolbar } from '@/views/questionBank/components/QuestionBankToolbar.comp.tsx';
import { QuestionRowActionHandlers } from '@/views/questionBank/components/QuestionRowActions.comp.tsx';
import {
  QUESTION_BANK_DEFAULTS,
  QUESTION_SORT_KEYS,
} from '@/views/questionBank/model/questionBank.constants.ts';
import { useGetQuestionList } from '@/views/questionBank/util/useGetQuestionList.util.ts';
import { useQuestionBankColumns } from '@/views/questionBank/util/useQuestionBankColumns.util.tsx';
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

  const handlers = useMemo<QuestionRowActionHandlers>(
    () => ({
      onDuplicate: question => void navigate(buildQuestionDuplicatePath(question.id, returnTo)),
      onEdit: question => void navigate(buildQuestionEditPath(question.id, returnTo)),
      onHistory: question => void navigate(buildQuestionHistoryPath(question.id, returnTo)),
      onPreview: question =>
        void navigate(
          buildQuestionFocusEntryPath(searchParams, createFocusSessionId(), question.id),
        ),
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
          columns={columns}
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
          onRowClick={row => void navigate(buildQuestionEditPath(row.id, returnTo))}
          source={source}
          toolbar={<QuestionBankToolbar controller={controller} />}
        />
      </Box>
    </Stack>
  );
};
