import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Box, Button, Collapse } from '@mui/material';
import { JSX, useState } from 'react';

import { DataTableSearchField } from '@/components/dataTable/DataTableSearchField.comp.tsx';
import { DataTableToolbar } from '@/components/dataTable/DataTableToolbar.comp.tsx';
import { DataTableController } from '@/components/dataTable/model/DataTable.model.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { LanguageSelect } from '@/views/questionBank/components/filters/LanguageSelect.comp.tsx';
import { QuestionBankActiveFilters } from '@/views/questionBank/components/filters/QuestionBankActiveFilters.comp.tsx';
import { QuestionBankFilterPanel } from '@/views/questionBank/components/filters/QuestionBankFilterPanel.comp.tsx';
import { QuestionBankFilters } from '@/views/questionBank/model/QuestionBank.model.ts';
import { QuestionSortKeyEnum } from '@/views/questionBank/model/QuestionSortKey.enum.ts';
import { useActiveFilterChips } from '@/views/questionBank/util/useActiveFilterChips.util.ts';
import { useQuestionBankFilterOptions } from '@/views/questionBank/util/useQuestionBankFilterOptions.util.ts';

type Props = {
  controller: DataTableController<QuestionSortKeyEnum, QuestionBankFilters>;
};

export const QuestionBankToolbar = ({ controller }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionBank');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const options = useQuestionBankFilterOptions();
  const chips = useActiveFilterChips(controller, options);
  const { filters } = controller.query;
  const panelFilterCount = chips.filter(chip => chip.id !== 'q').length;

  return (
    <Box>
      <DataTableToolbar
        actions={
          <Button
            aria-expanded={isPanelOpen}
            onClick={() => setIsPanelOpen(isOpen => !isOpen)}
            startIcon={<TuneRoundedIcon />}
            variant="outlined"
          >
            {isPanelOpen
              ? t('filters.hide')
              : panelFilterCount > 0
                ? t('filters.showWithCount', { count: panelFilterCount })
                : t('filters.show')}
          </Button>
        }
      >
        <DataTableSearchField
          label={t('search.label')}
          onChange={value => controller.setFilter('q', value)}
          value={filters.q}
        />
        <LanguageSelect
          label={t('search.language')}
          onChange={value => controller.setFilter('locale', value)}
          options={options.locales}
          value={filters.locale}
        />
      </DataTableToolbar>
      <Collapse in={isPanelOpen} unmountOnExit>
        <QuestionBankFilterPanel controller={controller} options={options} />
      </Collapse>
      <QuestionBankActiveFilters chips={chips} onClearAll={controller.clearFilters} />
    </Box>
  );
};
