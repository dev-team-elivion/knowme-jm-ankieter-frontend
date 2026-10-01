import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import { Box, Stack, useTheme } from '@mui/material';
import { JSX } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useDataTableQuery } from '@/components/dataTable/util/useDataTableQuery.util.ts';
import { BackLink } from '@/components/page/BackLink.comp.tsx';
import { PageHeader } from '@/components/page/PageHeader.comp.tsx';
import { panelSx, revealSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionBankToolbar } from '@/views/questionBank/components/QuestionBankToolbar.comp.tsx';
import {
  QUESTION_BANK_DEFAULTS,
  QUESTION_SORT_KEYS,
} from '@/views/questionBank/model/questionBank.constants.ts';
import { useQuestionBankFilterOptions } from '@/views/questionBank/util/useQuestionBankFilterOptions.util.ts';
import { FocusReviewer } from '@/views/questionFocus/components/FocusReviewer.comp.tsx';
import { FocusSortSelect } from '@/views/questionFocus/components/FocusSortSelect.comp.tsx';
import {
  buildQuestionBankPath,
  FOCUS_QUESTION_PARAM,
} from '@/views/questionForm/util/questionRoutes.util.ts';

const RESET_ON_FILTER_CHANGE = [FOCUS_QUESTION_PARAM];

export const QuestionFocusView = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionFocus');
  const [searchParams] = useSearchParams();
  const options = useQuestionBankFilterOptions();
  const controller = useDataTableQuery({
    defaults: QUESTION_BANK_DEFAULTS,
    paramsResetOnChange: RESET_ON_FILTER_CHANGE,
    sortKeys: QUESTION_SORT_KEYS,
  });

  return (
    <Stack spacing={3}>
      <Box sx={{ ...revealSx(0), pb: 1 }}>
        <PageHeader
          backAction={<BackLink label={t('backToList')} to={buildQuestionBankPath(searchParams)} />}
          description={t('description')}
          icon={ViewCarouselOutlinedIcon}
          title={t('title')}
        />
      </Box>
      <Box sx={{ ...panelSx(theme.colors), ...revealSx(1), p: 2 }}>
        <QuestionBankToolbar
          controller={controller}
          extraActions={
            <FocusSortSelect
              onChange={controller.setSort}
              sortBy={controller.query.sortBy}
              sortDirection={controller.query.sortDirection}
            />
          }
          options={options}
        />
      </Box>
      <Box sx={revealSx(2)}>
        <FocusReviewer
          hasActiveFilters={controller.hasActiveFilters}
          onClearFilters={controller.clearFilters}
          query={controller.query}
        />
      </Box>
    </Stack>
  );
};
