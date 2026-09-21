import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { CONFIG } from '@/config/config.ts';
import { useCurrentUserQuery } from '@/hooks/useCurrentUser.query.ts';
import { usePingQuery } from '@/hooks/usePing.query.ts';

export const HomeView = (): JSX.Element => {
  const { t } = useTranslation();
  const ping = usePingQuery();
  const currentUser = useCurrentUserQuery();

  const login = (): void => {
    window.location.href = `${CONFIG.HOST}/${CONFIG.KEYCLOAK_REDIRECT_URL}`;
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box>
          <Typography component="h1" gutterBottom variant="h4">
            {t('app.title')}
          </Typography>
          <Typography color="text.secondary">{t('app.subtitle')}</Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h6">
              {t('backend.heading')}
            </Typography>

            {ping.isPending && (
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <CircularProgress size={18} />
                <Typography>{t('backend.checking')}</Typography>
              </Stack>
            )}

            {ping.isError && (
              <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
                <Alert severity="error" sx={{ width: '100%' }}>
                  {t('backend.offline')}
                </Alert>
                <Button onClick={() => void ping.refetch()} size="small" variant="outlined">
                  {t('backend.retry')}
                </Button>
              </Stack>
            )}

            {ping.isSuccess && (
              <Stack spacing={1}>
                <Chip
                  color="success"
                  label={t('backend.online')}
                  sx={{ alignSelf: 'flex-start' }}
                />
                <Typography variant="body2">
                  {t('backend.application')}: <strong>{ping.data.application}</strong>
                </Typography>
                <Typography variant="body2">
                  {t('backend.serverTime')}:{' '}
                  <strong>{new Date(ping.data.serverTime).toLocaleString()}</strong>
                </Typography>
              </Stack>
            )}
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h6">
              {t('user.heading')}
            </Typography>

            {currentUser.data?.authenticated === true ? (
              <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                <Typography>
                  {currentUser.data.firstName} {currentUser.data.lastName}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {currentUser.data.email}
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
                <Typography color="text.secondary">{t('user.anonymous')}</Typography>
                <Button onClick={login} variant="contained">
                  {t('user.login')}
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};
