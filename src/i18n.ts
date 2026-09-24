import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { en } from '@/assets/locales/en.ts';
import { I18N_NAMESPACE } from '@/assets/locales/i18nNamespace.ts';
import { pl } from '@/assets/locales/pl.ts';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: I18N_NAMESPACE,
    detection: {
      caches: ['localStorage'],
      order: ['localStorage', 'htmlTag'],
    },
    fallbackLng: 'pl',
    interpolation: { escapeValue: false },
    ns: [I18N_NAMESPACE],
    resources: {
      en: { [I18N_NAMESPACE]: en },
      pl: { [I18N_NAMESPACE]: pl },
    },
    supportedLngs: ['pl', 'en'],
  });

export default i18n;
