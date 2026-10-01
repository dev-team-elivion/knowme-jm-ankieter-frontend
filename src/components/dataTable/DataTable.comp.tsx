import { Box, LinearProgress, Table, TablePagination, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { dataTableSx } from '@/components/dataTable/DataTable.styles.ts';
import { DataTableBody } from '@/components/dataTable/DataTableBody.comp.tsx';
import { DataTableHead } from '@/components/dataTable/DataTableHead.comp.tsx';
import {
  DataTableColumn,
  DataTableController,
  DataTableFilters,
  DataTableSource,
} from '@/components/dataTable/model/DataTable.model.ts';
import { PAGE_SIZE_OPTIONS } from '@/components/dataTable/util/dataTableSearchParams.util.ts';
import { panelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props<Row, SortKey extends string, Filters extends DataTableFilters> = {
  ariaLabel: string;
  columns: DataTableColumn<Row, SortKey>[];
  controller: DataTableController<SortKey, Filters>;
  emptyState?: ReactNode;
  getRowKey: (row: Row) => number | string;
  isRowSelected?: (row: Row) => boolean;
  onRowClick?: (row: Row) => void;
  source: DataTableSource<Row>;
  toolbar?: ReactNode;
};

export const DataTable = <Row, SortKey extends string, Filters extends DataTableFilters>({
  ariaLabel,
  columns,
  controller,
  emptyState,
  getRowKey,
  isRowSelected,
  onRowClick,
  source,
  toolbar,
}: Props<Row, SortKey, Filters>): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.dataTable');
  const { query } = controller;
  const isRefetching = source.isFetching && !source.isLoading;

  return (
    <Box sx={{ ...panelSx(theme.colors), overflow: 'hidden' }}>
      {toolbar && <Box sx={{ p: 2.5, pb: 1 }}>{toolbar}</Box>}
      <Box sx={{ height: 2 }}>
        {isRefetching && <LinearProgress aria-label={t('loadingLabel')} sx={{ height: 2 }} />}
      </Box>
      <Box sx={{ overflowX: 'auto', px: 1 }}>
        <Table
          aria-busy={source.isFetching}
          aria-label={ariaLabel}
          size="small"
          sx={dataTableSx(theme.colors)}
        >
          <DataTableHead
            columns={columns}
            onSort={controller.toggleSort}
            sortBy={query.sortBy}
            sortDirection={query.sortDirection}
          />
          <DataTableBody
            columns={columns}
            emptyState={emptyState}
            getRowKey={getRowKey}
            hasActiveFilters={controller.hasActiveFilters}
            isRowSelected={isRowSelected}
            onClearFilters={controller.clearFilters}
            onRowClick={onRowClick}
            pageSize={query.pageSize}
            source={source}
          />
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={source.data?.totalElements ?? 0}
        labelDisplayedRows={({ count, from, to }) => t('displayedRows', { count, from, to })}
        labelRowsPerPage={t('rowsPerPage')}
        onPageChange={(_event, page) => controller.setPage(page)}
        onRowsPerPageChange={event => controller.setPageSize(Number(event.target.value))}
        page={query.page}
        rowsPerPage={query.pageSize}
        rowsPerPageOptions={[...PAGE_SIZE_OPTIONS]}
        sx={{ borderTop: `1px solid ${theme.colors.border}`, px: 1 }}
      />
    </Box>
  );
};
