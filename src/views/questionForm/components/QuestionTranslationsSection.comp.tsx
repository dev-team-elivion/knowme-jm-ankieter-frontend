import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import { JSX, useState } from 'react';

import { QuestionTranslationDto, QuestionVersionDto, TranslationStatusDto } from '@/api/generated';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { formatLocaleName } from '@/utils/localeName.util.ts';
import { getTranslationStatusTone } from '@/utils/questionStatusTone.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { TranslationPreview } from '@/views/questionForm/components/TranslationPreview.comp.tsx';
import { SOURCE_LOCALE } from '@/views/questionForm/model/QuestionForm.constants.ts';
import { getSourceLocale } from '@/views/questionForm/util/questionFormMapping.util.ts';

const NEW_QUESTION_TRANSLATIONS: QuestionTranslationDto[] = [
  { body: '', locale: SOURCE_LOCALE, status: TranslationStatusDto.Draft },
];

type Props = {
  revealIndex: number;
  version: QuestionVersionDto | undefined;
};

export const QuestionTranslationsSection = ({ revealIndex, version }: Props): JSX.Element => {
  const { i18n, t } = useTranslationWithPrefix('views.questionForm.translations');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');
  const sourceLocale = getSourceLocale(version);
  const translations = version?.translations ?? NEW_QUESTION_TRANSLATIONS;
  const [selectedLocale, setSelectedLocale] = useState(sourceLocale);
  const activeLocale = translations.some(item => item.locale === selectedLocale)
    ? selectedLocale
    : sourceLocale;

  return (
    <SectionPanel
      description={t('description')}
      icon={TranslateRoundedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <Tabs onChange={(_event, locale: string) => setSelectedLocale(locale)} value={activeLocale}>
        {translations.map(({ locale, status }) => (
          <Tab
            key={locale}
            label={
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <span>{formatLocaleName(locale, i18n.language)}</span>
                <StatusPill
                  label={tDictionary(`translationStatus.${status}`)}
                  tone={getTranslationStatusTone(status)}
                />
              </Stack>
            }
            value={locale}
          />
        ))}
      </Tabs>
      <Box sx={{ pt: 2.5 }}>
        {activeLocale === sourceLocale ? (
          <InfoCallout>{t('sourceLanguage')}</InfoCallout>
        ) : (
          <TranslationPreview
            answers={version?.answers ?? []}
            locale={activeLocale}
            translation={translations.find(item => item.locale === activeLocale)}
          />
        )}
      </Box>
    </SectionPanel>
  );
};
