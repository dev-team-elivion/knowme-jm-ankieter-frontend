import { KeyPrefix } from 'i18next';
import { useTranslation, UseTranslationResponse } from 'react-i18next';

import { I18N_NAMESPACE } from '@/assets/locales/i18nNamespace.ts';

type Namespace = typeof I18N_NAMESPACE;

export const useTranslationWithPrefix = <Prefix extends KeyPrefix<Namespace>>(
  prefix: Prefix,
): UseTranslationResponse<Namespace, Prefix> =>
  useTranslation(I18N_NAMESPACE, { keyPrefix: prefix });
