import { Checkbox } from '@mui/material';
import { MouseEvent } from 'react';

import { QuestionListItemDto } from '@/api/generated';
import { DataTableColumn } from '@/components/dataTable/model/DataTable.model.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionSelection } from '@/views/questionBank/model/QuestionSelection.model.ts';
import { QuestionSortKeyEnum } from '@/views/questionBank/model/QuestionSortKey.enum.ts';

type Options = {
  isSelected: (questionId: string) => boolean;
  onToggle: (questionId: string) => void;
  onTogglePage: (pageIds: string[]) => void;
  pageIds: string[];
  selection: QuestionSelection;
};

type Return = DataTableColumn<QuestionListItemDto, QuestionSortKeyEnum>;

const stopRowClick = (event: MouseEvent): void => event.stopPropagation();

export const useSelectionColumn = ({
  isSelected,
  onToggle,
  onTogglePage,
  pageIds,
  selection,
}: Options): Return => {
  const { t } = useTranslationWithPrefix('views.questionBank.bulk');
  const isAllMatching = selection.kind === 'allMatching';
  const selectedOnPage = pageIds.filter(isSelected).length;
  const isPageSelected = pageIds.length > 0 && selectedOnPage === pageIds.length;

  return {
    header: (
      <Checkbox
        checked={isPageSelected}
        disabled={isAllMatching || pageIds.length === 0}
        indeterminate={selectedOnPage > 0 && !isPageSelected}
        onChange={() => onTogglePage(pageIds)}
        size="small"
        slotProps={{ input: { 'aria-label': t('selectPage') } }}
      />
    ),
    id: 'select',
    label: t('selectPage'),
    render: row => (
      <Checkbox
        checked={isSelected(row.id)}
        disabled={isAllMatching}
        onChange={() => onToggle(row.id)}
        onClick={stopRowClick}
        size="small"
        slotProps={{ input: { 'aria-label': t('selectRow', { key: row.businessKey }) } }}
      />
    ),
    width: 48,
  };
};
