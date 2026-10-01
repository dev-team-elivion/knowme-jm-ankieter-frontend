import { MenuItem, TextField } from '@mui/material';
import { JSX } from 'react';

import { SortDirection } from '@/components/dataTable/model/DataTable.model.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionSortKeyEnum } from '@/views/questionBank/model/QuestionSortKey.enum.ts';
import {
  FOCUS_SORT_OPTIONS,
  toSortValue,
} from '@/views/questionFocus/model/focusSort.constants.ts';

type Props = {
  onChange: (sortBy: QuestionSortKeyEnum, sortDirection: SortDirection) => void;
  sortBy: QuestionSortKeyEnum;
  sortDirection: SortDirection;
};

export const FocusSortSelect = ({ onChange, sortBy, sortDirection }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionFocus.sort');

  const handleChange = (value: string): void => {
    const option = FOCUS_SORT_OPTIONS.find(item => toSortValue(item) === value);
    if (option) {
      onChange(option.sortBy, option.sortDirection);
    }
  };

  return (
    <TextField
      onChange={event => handleChange(event.target.value)}
      select
      slotProps={{ htmlInput: { 'aria-label': t('label') } }}
      sx={{ minWidth: 220 }}
      value={toSortValue({ sortBy, sortDirection })}
    >
      {FOCUS_SORT_OPTIONS.map(option => (
        <MenuItem key={toSortValue(option)} value={toSortValue(option)}>
          {t(`options.${option.sortBy}.${option.sortDirection}`)}
        </MenuItem>
      ))}
    </TextField>
  );
};
