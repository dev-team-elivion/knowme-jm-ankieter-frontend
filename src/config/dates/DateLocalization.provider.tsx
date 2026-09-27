import 'dayjs/locale/pl';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { JSX, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  children: ReactNode;
};

export const DateLocalizationProvider = ({ children }: Props): JSX.Element => {
  const { i18n } = useTranslation();

  return (
    <LocalizationProvider adapterLocale={i18n.language} dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
};
