import { MenuItem, TextField } from '@mui/material';
import { JSX } from 'react';

import { FilterOption } from '@/components/dataTable/model/DataTable.model.ts';

type Props = {
  allLabel: string;
  fullWidth?: boolean;
  label: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  value: string;
};

export const DataTableFilterSelect = ({
  allLabel,
  fullWidth = false,
  label,
  onChange,
  options,
  value,
}: Props): JSX.Element => (
  <TextField
    fullWidth={fullWidth}
    onChange={event => onChange(event.target.value)}
    select
    slotProps={{ htmlInput: { 'aria-label': label }, select: { displayEmpty: true } }}
    sx={{ minWidth: 200 }}
    value={value}
  >
    <MenuItem value="">{allLabel}</MenuItem>
    {options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);
