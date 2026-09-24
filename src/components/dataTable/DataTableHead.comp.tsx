import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { JSX } from 'react';

import { visuallyHiddenSx } from '@/components/dataTable/DataTable.styles.ts';
import { DataTableColumn, SortDirection } from '@/components/dataTable/model/DataTable.model.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props<Row, SortKey extends string> = {
  columns: DataTableColumn<Row, SortKey>[];
  onSort: (sortKey: SortKey) => void;
  sortBy: SortKey;
  sortDirection: SortDirection;
};

const toAriaSort = (isActive: boolean, direction: SortDirection) => {
  if (!isActive) {
    return undefined;
  }
  return direction === 'asc' ? 'ascending' : 'descending';
};

export const DataTableHead = <Row, SortKey extends string>({
  columns,
  onSort,
  sortBy,
  sortDirection,
}: Props<Row, SortKey>): JSX.Element => {
  const { t } = useTranslationWithPrefix('components.dataTable');

  return (
    <TableHead>
      <TableRow>
        {columns.map(column => {
          const { sortKey } = column;
          const isActive = sortKey !== undefined && sortKey === sortBy;

          return (
            <TableCell
              align={column.align}
              aria-sort={toAriaSort(isActive, sortDirection)}
              key={column.id}
              sx={{ width: column.width }}
            >
              {sortKey === undefined ? (
                column.label
              ) : (
                <TableSortLabel
                  active={isActive}
                  direction={isActive ? sortDirection : 'asc'}
                  onClick={() => onSort(sortKey)}
                >
                  {column.label}
                  {isActive && (
                    <Box component="span" sx={visuallyHiddenSx}>
                      {sortDirection === 'asc' ? t('sortAscending') : t('sortDescending')}
                    </Box>
                  )}
                </TableSortLabel>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};
