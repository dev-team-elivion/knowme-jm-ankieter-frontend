import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import { FormControlLabel, Switch } from '@mui/material';
import { JSX, useMemo, useState } from 'react';

import { DataTable } from '@/components/dataTable/DataTable.comp.tsx';
import { DataTableFilterSelect } from '@/components/dataTable/DataTableFilterSelect.comp.tsx';
import { DataTableSearchField } from '@/components/dataTable/DataTableSearchField.comp.tsx';
import { DataTableToolbar } from '@/components/dataTable/DataTableToolbar.comp.tsx';
import { useDataTableQuery } from '@/components/dataTable/util/useDataTableQuery.util.ts';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import {
  QUESTION_CATEGORIES,
  QUESTION_SORT_KEYS,
  QUESTION_STATUSES,
  QUESTION_TABLE_DEFAULTS,
} from '@/views/devPatterns/model/questionTable.constants.ts';
import { useQuestionFixtureSource } from '@/views/devPatterns/util/useQuestionFixtureSource.util.ts';
import { useQuestionTableColumns } from '@/views/devPatterns/util/useQuestionTableColumns.util.tsx';

type Props = {
  revealIndex: number;
};

export const DevTableSection = ({ revealIndex }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.devPatterns.table');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');
  const [isEmptyDataset, setIsEmptyDataset] = useState(false);
  const controller = useDataTableQuery({
    defaults: QUESTION_TABLE_DEFAULTS,
    sortKeys: QUESTION_SORT_KEYS,
  });
  const source = useQuestionFixtureSource(controller.query, isEmptyDataset);
  const columns = useQuestionTableColumns();
  const { filters } = controller.query;

  const categoryOptions = useMemo(
    () =>
      QUESTION_CATEGORIES.map(value => ({
        label: tDictionary(`questionCategory.${value}`),
        value,
      })),
    [tDictionary],
  );
  const statusOptions = useMemo(
    () =>
      QUESTION_STATUSES.map(value => ({ label: tDictionary(`questionStatus.${value}`), value })),
    [tDictionary],
  );

  return (
    <SectionPanel
      actions={
        <FormControlLabel
          control={
            <Switch
              checked={isEmptyDataset}
              onChange={event => setIsEmptyDataset(event.target.checked)}
            />
          }
          label={t('showEmptyDataset')}
        />
      }
      description={t('description')}
      icon={TableRowsOutlinedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <DataTable
        ariaLabel={t('title')}
        columns={columns}
        controller={controller}
        getRowKey={row => row.id}
        source={source}
        toolbar={
          <DataTableToolbar>
            <DataTableSearchField
              label={t('filters.search')}
              onChange={value => controller.setFilter('search', value)}
              value={filters.search}
            />
            <DataTableFilterSelect
              allLabel={t('filters.allCategories')}
              label={t('filters.category')}
              onChange={value => controller.setFilter('category', value)}
              options={categoryOptions}
              value={filters.category}
            />
            <DataTableFilterSelect
              allLabel={t('filters.allStatuses')}
              label={t('filters.status')}
              onChange={value => controller.setFilter('status', value)}
              options={statusOptions}
              value={filters.status}
            />
          </DataTableToolbar>
        }
      />
    </SectionPanel>
  );
};
