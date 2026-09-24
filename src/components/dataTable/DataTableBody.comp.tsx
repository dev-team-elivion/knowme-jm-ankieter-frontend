import { TableBody, TableCell, TableRow } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { dataTableBodyFetchingSx } from '@/components/dataTable/DataTable.styles.ts';
import { DataTableSkeletonRows } from '@/components/dataTable/DataTableSkeletonRows.comp.tsx';
import { DataTableColumn, DataTableSource } from '@/components/dataTable/model/DataTable.model.ts';
import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { ErrorState } from '@/components/state/ErrorState.comp.tsx';

const STATE_MIN_HEIGHT = 320;

type FullWidthRowProps = {
  children: ReactNode;
  columnCount: number;
};

type Props<Row, SortKey extends string> = {
  columns: DataTableColumn<Row, SortKey>[];
  emptyState?: ReactNode;
  getRowKey: (row: Row) => number | string;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onRowClick?: (row: Row) => void;
  pageSize: number;
  source: DataTableSource<Row>;
};

const FullWidthRow = ({ children, columnCount }: FullWidthRowProps): JSX.Element => (
  <TableRow>
    <TableCell colSpan={columnCount} sx={{ borderBottom: 'none' }}>
      {children}
    </TableCell>
  </TableRow>
);

export const DataTableBody = <Row, SortKey extends string>({
  columns,
  emptyState,
  getRowKey,
  hasActiveFilters,
  onClearFilters,
  onRowClick,
  pageSize,
  source,
}: Props<Row, SortKey>): JSX.Element => {
  const { data, isError, isFetching, isLoading, retry } = source;

  if (isLoading) {
    return (
      <TableBody>
        <DataTableSkeletonRows columnCount={columns.length} rowCount={pageSize} />
      </TableBody>
    );
  }

  if (isError && data === undefined) {
    return (
      <TableBody>
        <FullWidthRow columnCount={columns.length}>
          <ErrorState isRetrying={isFetching} minHeight={STATE_MIN_HEIGHT} onRetry={retry} />
        </FullWidthRow>
      </TableBody>
    );
  }

  if (data === undefined || data.items.length === 0) {
    return (
      <TableBody>
        <FullWidthRow columnCount={columns.length}>
          {hasActiveFilters ? (
            <EmptyState
              minHeight={STATE_MIN_HEIGHT}
              onClearFilters={onClearFilters}
              variant="noMatch"
            />
          ) : (
            (emptyState ?? <EmptyState minHeight={STATE_MIN_HEIGHT} variant="noData" />)
          )}
        </FullWidthRow>
      </TableBody>
    );
  }

  return (
    <TableBody sx={isFetching ? dataTableBodyFetchingSx : undefined}>
      {data.items.map(row => (
        <TableRow
          hover
          key={getRowKey(row)}
          onClick={onRowClick ? () => onRowClick(row) : undefined}
          sx={onRowClick ? { cursor: 'pointer' } : undefined}
        >
          {columns.map(column => (
            <TableCell align={column.align} key={column.id}>
              {column.render(row)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};
