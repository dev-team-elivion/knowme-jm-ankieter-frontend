import { Skeleton, TableCell, TableRow } from '@mui/material';
import { JSX } from 'react';

const MAX_SKELETON_ROWS = 10;

type Props = {
  columnCount: number;
  rowCount: number;
};

export const DataTableSkeletonRows = ({ columnCount, rowCount }: Props): JSX.Element => {
  const rowKeys = Array.from(
    { length: Math.min(rowCount, MAX_SKELETON_ROWS) },
    (_, index) => `skeleton-row-${index}`,
  );
  const cellKeys = Array.from({ length: columnCount }, (_, index) => `skeleton-cell-${index}`);

  return (
    <>
      {rowKeys.map(rowKey => (
        <TableRow key={rowKey}>
          {cellKeys.map(cellKey => (
            <TableCell key={cellKey}>
              <Skeleton height={20} variant="rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
