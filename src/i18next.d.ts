import 'i18next';

import { AppTranslation } from '@/assets/locales/en.ts';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ankieter';
    resources: {
      ankieter: AppTranslation;
    };
  }
}
