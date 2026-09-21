import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    background: { default: '#f4f6f8' },
    primary: { main: '#00693c' },
    secondary: { main: '#d32f2f' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});
