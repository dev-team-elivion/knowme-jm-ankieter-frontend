import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { JSX, useEffect, useState } from 'react';

import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

const DEBOUNCE_MS = 350;

type Props = {
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export const DataTableSearchField = ({ label, onChange, value }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('components.searchField');
  const [input, setInput] = useState(value);
  const [syncedValue, setSyncedValue] = useState(value);

  if (value !== syncedValue) {
    setSyncedValue(value);
    setInput(value);
  }

  useEffect(() => {
    if (input === value) {
      return undefined;
    }
    const timeout = window.setTimeout(() => onChange(input.trim()), DEBOUNCE_MS);
    return () => window.clearTimeout(timeout);
  }, [input, onChange, value]);

  return (
    <TextField
      onChange={event => setInput(event.target.value)}
      placeholder={t('placeholder')}
      slotProps={{
        htmlInput: { 'aria-label': label },
        input: {
          endAdornment: input ? (
            <InputAdornment position="end">
              <IconButton aria-label={t('clear')} onClick={() => setInput('')} size="small">
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
          startAdornment: (
            <InputAdornment position="start" sx={{ ml: 1.5 }}>
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
      sx={{ minWidth: 280 }}
      value={input}
    />
  );
};
