import { Stack } from '@mui/material';
import { JSX, ReactNode } from 'react';

type Props = {
  actions?: ReactNode;
  children: ReactNode;
};

export const DataTableToolbar = ({ actions, children }: Props): JSX.Element => (
  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
      {children}
    </Stack>
    {actions && (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        {actions}
      </Stack>
    )}
  </Stack>
);
