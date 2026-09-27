import { MenuItem, TextField } from '@mui/material';
import { JSX } from 'react';

import { FilterOption } from '@/components/dataTable/model/DataTable.model.ts';

type Props = {
  label: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  value: string;
};

export const LanguageSelect = ({ label, onChange, options, value }: Props): JSX.Element => (
  <TextField
    onChange={event => onChange(event.target.value)}
    select
    slotProps={{ htmlInput: { 'aria-label': label } }}
    sx={{ minWidth: 160 }}
    value={value}
  >
    {options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);
