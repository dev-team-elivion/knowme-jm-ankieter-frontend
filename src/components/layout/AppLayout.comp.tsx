import { Box, useTheme } from '@mui/material';
import { JSX } from 'react';

import { AppRoutes } from '@/components/layout/routes/AppRoutes.comp.tsx';
import { SideMenu } from '@/components/layout/sideMenu/SideMenu.comp.tsx';
import { TopBar } from '@/components/layout/topBar/TopBar.comp.tsx';
import { useDocumentTitle } from '@/components/layout/useDocumentTitle.util.ts';
import { CONTENT_MAX_WIDTH } from '@/config/theme/uiTokens.ts';

export const AppLayout = (): JSX.Element => {
  const theme = useTheme();
  useDocumentTitle();

  return (
    <Box sx={{ background: theme.colors.bg, minHeight: '100vh' }}>
      <TopBar />
      <Box sx={{ alignItems: 'flex-start', display: 'flex' }}>
        <SideMenu />
        <Box component="main" sx={{ flex: 1, minWidth: 0, px: 4, py: 4 }}>
          <Box sx={{ maxWidth: CONTENT_MAX_WIDTH, mx: 'auto' }}>
            <AppRoutes />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
