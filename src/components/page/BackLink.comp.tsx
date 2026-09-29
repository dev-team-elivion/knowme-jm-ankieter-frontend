import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Button, useTheme } from '@mui/material';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  label: string;
  to: string;
};

export const BackLink = ({ label, to }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Button
      component={Link}
      startIcon={<ArrowBackRoundedIcon />}
      sx={{
        '@media (prefers-reduced-motion: reduce)': {
          '&:hover': { transform: 'none' },
          transition: 'color 0.2s ease',
        },
        '&:focus-visible': { color: theme.colors.accentInk },
        '&:hover': {
          background: 'transparent',
          color: theme.colors.accentInk,
          transform: 'translateX(-4px)',
        },
        '& svg': { fontSize: '18px !important' },
        color: theme.colors.textSecondary,
        fontSize: 13,
        fontWeight: 600,
        minHeight: 32,
        minWidth: 0,
        p: 0,
        transition: 'color 0.2s ease, transform 0.2s ease',
      }}
      to={to}
      variant="text"
    >
      {label}
    </Button>
  );
};
