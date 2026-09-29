import { Box, Skeleton, Stack, useTheme } from '@mui/material';
import { JSX } from 'react';

import { panelSx } from '@/config/theme/uiTokens.ts';

const SKELETON_SECTIONS = [
  { bodyHeights: [40, 88], key: 'content' },
  { bodyHeights: [132], key: 'media' },
  { bodyHeights: [40, 88], key: 'answers' },
  { bodyHeights: [40, 88], key: 'scoring' },
  { bodyHeights: [40, 88], key: 'classification' },
] as const;

export const QuestionFormSkeleton = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Stack aria-busy="true" spacing={3}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', pb: 1 }}>
        <Skeleton height={48} variant="rounded" width={48} />
        <Stack spacing={1}>
          <Skeleton height={28} width={280} />
          <Skeleton height={18} width={200} />
        </Stack>
      </Stack>
      {SKELETON_SECTIONS.map(section => (
        <Box key={section.key} sx={{ ...panelSx(theme.colors), p: 3 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Skeleton height={40} variant="rounded" width={40} />
              <Skeleton height={24} width="25%" />
            </Stack>
            {section.bodyHeights.map(height => (
              <Skeleton height={height} key={`${section.key}-${height}`} />
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};
