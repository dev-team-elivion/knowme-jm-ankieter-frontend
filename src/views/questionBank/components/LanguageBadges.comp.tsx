import { Box, Stack, Tooltip, useTheme } from '@mui/material';
import { JSX } from 'react';

import { LocaleStatusDto, TranslationStatusDto } from '@/api/generated';
import { getStatusPillColor } from '@/components/state/util/statusPillColor.util.ts';
import { statusPillSx } from '@/config/theme/uiTokens.ts';
import { formatLocaleName } from '@/utils/localeName.util.ts';
import { getTranslationStatusTone } from '@/utils/questionStatusTone.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { SUPPORTED_LOCALES } from '@/views/questionBank/model/questionBank.constants.ts';

type Props = {
  locales: LocaleStatusDto[];
};

export const LanguageBadges = ({ locales }: Props): JSX.Element => {
  const theme = useTheme();
  const { i18n, t } = useTranslationWithPrefix('views.questionBank');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');

  return (
    <Stack direction="row" spacing={0.5}>
      {SUPPORTED_LOCALES.map(locale => {
        const status =
          locales.find(item => item.locale === locale)?.status ?? TranslationStatusDto.Missing;
        const label = t('languageStatus', {
          language: formatLocaleName(locale, i18n.language),
          status: tDictionary(`translationStatus.${status}`),
        });
        return (
          <Tooltip key={locale} title={label}>
            <Box
              aria-label={label}
              component="span"
              sx={{
                ...statusPillSx(getStatusPillColor(theme.colors, getTranslationStatusTone(status))),
                px: 0.75,
                textTransform: 'uppercase',
              }}
            >
              {locale}
            </Box>
          </Tooltip>
        );
      })}
    </Stack>
  );
};
