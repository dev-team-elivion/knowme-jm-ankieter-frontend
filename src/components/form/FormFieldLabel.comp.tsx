import { Box, useTheme } from '@mui/material';
import { JSX } from 'react';

import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  htmlFor: string;
  isRequired: boolean;
  label: string;
};

export const FormFieldLabel = ({ htmlFor, isRequired, label }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.form');

  return (
    <Box
      component="label"
      htmlFor={htmlFor}
      sx={{
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        display: 'block',
        fontWeight: 700,
        letterSpacing: '0.4px',
        mb: 0.75,
      }}
    >
      {label}
      {isRequired && (
        <Box
          aria-label={t('requiredMark')}
          component="span"
          sx={{ color: theme.colors.red, ml: 0.5 }}
        >
          *
        </Box>
      )}
    </Box>
  );
};
