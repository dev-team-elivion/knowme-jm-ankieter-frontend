import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import {
  Avatar,
  Box,
  ButtonBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { JSX, MouseEvent, useId, useState } from 'react';

import { getUserDisplayName, getUserInitials } from '@/components/layout/topBar/userName.util.ts';
import { useThemeMode } from '@/config/theme/ThemeMode.context.ts';
import { microLabelSx } from '@/config/theme/uiTokens.ts';
import { useCurrentUserContext } from '@/contexts/currentUser/CurrentUser.context.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export const UserMenu = (): JSX.Element => {
  const theme = useTheme();
  const menuId = useId();
  const { t } = useTranslationWithPrefix('layout.userMenu');
  const { mode, toggleMode } = useThemeMode();
  const currentUser = useCurrentUserContext();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const displayName = getUserDisplayName(currentUser);
  const ThemeIcon = mode === 'dark' ? LightModeOutlinedIcon : DarkModeOutlinedIcon;

  const handleToggleMode = (): void => {
    toggleMode();
    setAnchor(null);
  };

  return (
    <>
      <ButtonBase
        aria-controls={anchor ? menuId : undefined}
        aria-expanded={anchor !== null}
        aria-haspopup="menu"
        aria-label={t('open')}
        onClick={(event: MouseEvent<HTMLElement>) => setAnchor(event.currentTarget)}
        sx={{
          '&:focus-visible, &:hover': { background: theme.colors.topbarHover },
          borderRadius: 50,
          gap: 1.25,
          pl: 0.75,
          pr: 1.25,
          py: 0.75,
          transition: 'background-color 0.2s ease',
        }}
      >
        <Avatar sx={{ height: 32, width: 32 }}>{getUserInitials(currentUser)}</Avatar>
        <Typography sx={{ color: theme.colors.topbarText }} variant="subtitle2">
          {displayName}
        </Typography>
        <KeyboardArrowDownRoundedIcon sx={{ color: theme.colors.topbarTextMuted }} />
      </ButtonBase>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        id={menuId}
        onClose={() => setAnchor(null)}
        open={anchor !== null}
        slotProps={{ paper: { sx: { minWidth: 260 } } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Box sx={{ px: 1.5, py: 1.25 }}>
          <Typography sx={microLabelSx(theme.colors.textMuted)}>{t('signedInAs')}</Typography>
          <Stack spacing={0.25} sx={{ mt: 0.75 }}>
            <Typography sx={{ color: theme.colors.textPrimary }} variant="subtitle2">
              {displayName}
            </Typography>
            {currentUser.email && (
              <Typography sx={{ color: theme.colors.textSecondary }} variant="caption">
                {currentUser.email}
              </Typography>
            )}
          </Stack>
        </Box>
        <MenuItem onClick={handleToggleMode}>
          <ListItemIcon>
            <ThemeIcon fontSize="small" />
          </ListItemIcon>
          {mode === 'dark' ? t('switchToLight') : t('switchToDark')}
        </MenuItem>
      </Menu>
    </>
  );
};
