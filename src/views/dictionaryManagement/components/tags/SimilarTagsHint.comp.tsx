import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import { JSX, useDeferredValue } from 'react';

import { microLabelSx } from '@/config/theme/uiTokens.ts';
import { useGetTags } from '@/hooks/useGetTags.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

const MAX_SUGGESTIONS = 8;

type Props = {
  label: string;
};

export const SimilarTagsHint = ({ label }: Props): JSX.Element | null => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.dictionaryManagement');
  const search = useDeferredValue(label);
  const { tags } = useGetTags({ search });
  const suggestions = tags.slice(0, MAX_SUGGESTIONS);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Stack spacing={1}>
      <Box sx={microLabelSx(theme.colors.textSecondary)}>{t('tags.form.similar')}</Box>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
        {suggestions.map(tag => (
          <Chip
            key={tag.id}
            label={
              <Typography component="span" variant="body2">
                {tag.label}
                <Typography
                  component="span"
                  sx={{ color: theme.colors.textSecondary, ml: 0.75 }}
                  variant="caption"
                >
                  {t('questionCount', { count: tag.questionCount })}
                </Typography>
              </Typography>
            }
            size="small"
            variant="outlined"
          />
        ))}
      </Stack>
    </Stack>
  );
};
