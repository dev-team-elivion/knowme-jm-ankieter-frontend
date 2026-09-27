import { TextField } from '@mui/material';
import { JSX, useState } from 'react';

type Props = {
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export const TextFilterField = ({ label, onChange, value }: Props): JSX.Element => {
  const [input, setInput] = useState(value);
  const [syncedValue, setSyncedValue] = useState(value);

  if (value !== syncedValue) {
    setSyncedValue(value);
    setInput(value);
  }

  const commit = (): void => {
    const next = input.trim();
    if (next !== value) {
      onChange(next);
    }
  };

  return (
    <TextField
      fullWidth
      onBlur={commit}
      onChange={event => setInput(event.target.value)}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          commit();
        }
      }}
      slotProps={{ htmlInput: { 'aria-label': label } }}
      value={input}
    />
  );
};
