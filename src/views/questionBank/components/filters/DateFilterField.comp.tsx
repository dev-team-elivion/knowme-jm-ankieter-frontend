import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { JSX } from 'react';

import { DATE_PICKER_FORMAT, parseApiDate, toApiDate } from '@/utils/formatDate.util.ts';

const OPEN_BUTTON_SX = {
  '&:hover': { backgroundColor: 'transparent' },
  height: 28,
  mr: 0.25,
  p: 0,
  width: 28,
} as const;

const OpenPickerIcon = (): JSX.Element => {
  const theme = useTheme();
  return <CalendarMonthRoundedIcon sx={{ color: theme.colors.accentInk, fontSize: 18 }} />;
};

type Props = {
  maxDate?: string;
  minDate?: string;
  onChange: (value: string) => void;
  value: string;
};

export const DateFilterField = ({ maxDate, minDate, onChange, value }: Props): JSX.Element => {
  const handleChange = (date: Dayjs | null): void => {
    if (date === null) {
      onChange('');
    } else if (date.isValid()) {
      onChange(toApiDate(date));
    }
  };

  return (
    <DatePicker
      format={DATE_PICKER_FORMAT}
      maxDate={parseApiDate(maxDate) ?? undefined}
      minDate={parseApiDate(minDate) ?? undefined}
      onChange={handleChange}
      slotProps={{
        field: { clearable: true },
        openPickerButton: { sx: OPEN_BUTTON_SX },
        textField: { fullWidth: true },
      }}
      slots={{ openPickerIcon: OpenPickerIcon }}
      value={parseApiDate(value)}
    />
  );
};
