import { FieldChangeDto } from '@/api/generated';
import {
  ChangeValue,
  LANGUAGE_FIELDS,
  VisibleChange,
} from '@/views/questionHistory/model/HistoryField.model.ts';
import {
  isHistoryField,
  isRecord,
  isStringArray,
} from '@/views/questionHistory/util/historyValue.guard.ts';

const findNamedText = (value: Record<string, unknown>, locale: string): null | string => {
  const direct = [value.name, value.label, value.body].find(item => typeof item === 'string');
  if (typeof direct === 'string') {
    return direct;
  }
  const translations = Array.isArray(value.translations) ? value.translations : [];
  const localized = translations
    .filter(isRecord)
    .find(item => item.locale === locale && typeof item.body === 'string');
  return typeof localized?.body === 'string' ? localized.body : null;
};

export const toChangeValue = (value: unknown, locale: string): ChangeValue | null => {
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value === 'string') {
    return { text: value, type: 'text' };
  }
  if (typeof value === 'number') {
    return { type: 'number', value };
  }
  if (typeof value === 'boolean') {
    return { type: 'boolean', value };
  }
  if (isStringArray(value)) {
    return { items: value, type: 'list' };
  }
  if (isRecord(value)) {
    const text = findNamedText(value, locale);
    return text === null ? { type: 'item' } : { text, type: 'text' };
  }
  return { type: 'item' };
};

const isShownLanguage = (change: FieldChangeDto, locale: string): boolean =>
  change.locale === undefined || change.locale === locale;

export const toVisibleChanges = (changes: FieldChangeDto[], locale: string): VisibleChange[] =>
  changes
    .filter(change => !LANGUAGE_FIELDS.includes(change.field) && isShownLanguage(change, locale))
    .map((change, index) => ({
      after: toChangeValue(change.after, locale),
      before: toChangeValue(change.before, locale),
      field: isHistoryField(change.field) ? change.field : null,
      key: `${change.field}-${change.answerId ?? ''}-${index}`,
    }));
