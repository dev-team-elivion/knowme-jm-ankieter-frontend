import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './i18n/en.json';
import pl from './i18n/pl.json';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pl',
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: en },
      pl: { translation: pl },
    },
    supportedLngs: ['pl', 'en'],
  });

export default i18n;
