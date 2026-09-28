import { ButtonBase, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { VersionHistoryDto } from '@/api/generated';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { innerPanelSx, numericSx } from '@/config/theme/uiTokens.ts';
import { formatApiDate } from '@/utils/formatDate.util.ts';
import { getVersionStatusTone } from '@/utils/questionStatusTone.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { HistoryEventItem } from '@/views/questionHistory/components/HistoryEventItem.comp.tsx';

type Props = {
  isSelected: boolean;
  locale: string;
  onSelect: (versionId: string) => void;
  version: VersionHistoryDto;
};

export const VersionHistoryCard = ({
  isSelected,
  locale,
  onSelect,
  version,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionHistory');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');
  const retiredAt = formatApiDate(version.retiredAt, { withTime: true });

  return (
    <Stack
      component="li"
      spacing={1.5}
      sx={{
        ...innerPanelSx(theme.colors),
        backgroundColor: isSelected ? theme.colors.accentBg : undefined,
        borderColor: isSelected ? theme.colors.accentBorder : theme.colors.border,
        listStyle: 'none',
        p: 2,
        transition: 'border-color 0.18s, background-color 0.18s',
      }}
    >
      <ButtonBase
        aria-pressed={isSelected}
        onClick={() => onSelect(version.id)}
        sx={{ borderRadius: '8px', justifyContent: 'flex-start', textAlign: 'left' }}
      >
        <Stack spacing={0.5} sx={{ width: '100%' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Typography sx={{ ...numericSx, color: theme.colors.textPrimary }} variant="subtitle2">
              {t('versionLabel', { number: version.versionNo })}
            </Typography>
            <StatusPill
              label={tDictionary(`versionStatus.${version.status}`)}
              tone={getVersionStatusTone(version.status)}
            />
          </Stack>
          <Typography sx={{ ...numericSx, color: theme.colors.textSecondary }} variant="body2">
            {t('created', {
              author: version.createdBy,
              date: formatApiDate(version.createdAt, { withTime: true }),
            })}
          </Typography>
          {retiredAt && (
            <Typography sx={{ ...numericSx, color: theme.colors.textSecondary }} variant="body2">
              {t('retired', { date: retiredAt })}
            </Typography>
          )}
        </Stack>
      </ButtonBase>
      {version.events.length > 0 && (
        <Stack component="ul" spacing={1.5} sx={{ m: 0, p: 0 }}>
          {version.events.map(event => (
            <HistoryEventItem event={event} key={event.id} locale={locale} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
