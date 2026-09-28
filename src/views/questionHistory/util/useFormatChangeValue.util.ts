import { useCallback } from 'react';

import { QuestionSourceDto, ScoringRuleDto, VersionStatusDto } from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { ChangeValue, HistoryField } from '@/views/questionHistory/model/HistoryField.model.ts';

type Return = (field: HistoryField | null, value: ChangeValue) => string;

const findEnumValue = <T extends string>(values: T[], raw: string): T | undefined =>
  values.find(value => value === raw);

export const useFormatChangeValue = (): Return => {
  const { t } = useTranslationWithPrefix('views.questionHistory.values');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');

  const formatText = useCallback(
    (field: HistoryField | null, text: string): string => {
      const scoringRule = findEnumValue(Object.values(ScoringRuleDto), text);
      if (field === 'scoringRule' && scoringRule) {
        return tDictionary(`scoringRule.${scoringRule}.label`);
      }
      const status = findEnumValue(Object.values(VersionStatusDto), text);
      if (field === 'status' && status) {
        return tDictionary(`versionStatus.${status}`);
      }
      const source = findEnumValue(Object.values(QuestionSourceDto), text);
      if (field === 'source' && source) {
        return tDictionary(`questionSource.${source}`);
      }
      return text;
    },
    [tDictionary],
  );

  return useCallback(
    (field, value) => {
      switch (value.type) {
        case 'boolean':
          if (field === 'answer.isCorrect') {
            return value.value ? t('correct') : t('incorrect');
          }
          return value.value ? t('yes') : t('no');
        case 'item':
          return t('item');
        case 'list':
          return value.items.length > 0 ? value.items.join(', ') : t('empty');
        case 'number':
          return String(value.value);
        case 'text':
          return formatText(field, value.text);
      }
    },
    [formatText, t],
  );
};
