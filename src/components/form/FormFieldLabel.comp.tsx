import { Box, useTheme } from '@mui/material';
import { JSX } from 'react';

import { fieldLabelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  htmlFor: string;
  id?: string;
  isRequired: boolean;
  label: string;
};

export const FormFieldLabel = ({ htmlFor, id, isRequired, label }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.form');

  return (
    <Box component="label" htmlFor={htmlFor} id={id} sx={fieldLabelSx(theme.colors)}>
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
