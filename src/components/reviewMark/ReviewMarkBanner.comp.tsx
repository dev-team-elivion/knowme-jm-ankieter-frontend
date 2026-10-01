import { Button, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { ReviewMarkDto } from '@/api/generated';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { numericSx } from '@/config/theme/uiTokens.ts';
import { formatApiDate } from '@/utils/formatDate.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  isPending: boolean;
  onClear: () => void;
  review: ReviewMarkDto;
};

export const ReviewMarkBanner = ({ isPending, onClear, review }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.reviewMark');

  return (
    <InfoCallout title={t('title')} tone="warning">
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
      >
        <Stack spacing={0.5} sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: review.reason ? theme.colors.textPrimary : theme.colors.textSecondary,
              whiteSpace: 'pre-wrap',
            }}
            variant="body2"
          >
            {review.reason ?? t('noReason')}
          </Typography>
          <Typography sx={{ ...numericSx, color: theme.colors.textSecondary }} variant="caption">
            {t('markedBy', {
              date: formatApiDate(review.markedAt, { withTime: true }),
              person: review.markedBy,
            })}
          </Typography>
        </Stack>
        <Button
          disabled={isPending}
          loading={isPending}
          onClick={onClear}
          size="small"
          sx={{ flexShrink: 0 }}
          variant="outlined"
        >
          {t('clear')}
        </Button>
      </Stack>
    </InfoCallout>
  );
};
