import { Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { numericSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { DiffListItem } from '@/views/questionHistory/components/DiffListItem.comp.tsx';
import { DiffText } from '@/views/questionHistory/components/DiffText.comp.tsx';
import { LabeledBlock } from '@/views/questionHistory/components/LabeledBlock.comp.tsx';
import {
  AnswerSnapshot,
  DiffEntry,
  VersionSnapshot,
} from '@/views/questionHistory/model/QuestionHistory.model.ts';
import {
  diffAnswers,
  diffText,
  diffTextList,
} from '@/views/questionHistory/util/versionDiff.util.ts';

type Props = {
  from: VersionSnapshot;
  to: VersionSnapshot;
};

const hasAnswerChange = (entry: DiffEntry<AnswerSnapshot>): boolean =>
  entry.kind !== 'same' || entry.before?.isCorrect !== entry.after?.isCorrect;

export const VersionDiffContent = ({ from, to }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionHistory');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');
  const answers = diffAnswers(from.answers, to.answers);
  const expectedAnswers = diffTextList(from.expectedAnswers, to.expectedAnswers);
  const isBodyChanged = from.body !== to.body;
  const isExplanationChanged = from.explanation !== to.explanation;
  const isAnswersChanged = answers.some(hasAnswerChange);
  const isExpectedChanged = expectedAnswers.some(entry => entry.kind !== 'same');
  const isPointsChanged = from.maxPoints !== to.maxPoints;
  const isRuleChanged = from.scoringRule !== to.scoringRule;
  const hasChanges = [
    isBodyChanged,
    isExplanationChanged,
    isAnswersChanged,
    isExpectedChanged,
    isPointsChanged,
    isRuleChanged,
  ].some(Boolean);
  const valueSx = { ...numericSx, color: theme.colors.textPrimary } as const;

  return (
    <Stack spacing={2.5}>
      {!hasChanges && <InfoCallout>{t('compare.noChanges')}</InfoCallout>}
      <LabeledBlock label={t('compare.body')}>
        <DiffText segments={diffText(from.body, to.body)} variant="body1" />
      </LabeledBlock>
      {answers.length > 0 && (
        <LabeledBlock label={t('compare.answers')}>
          <Stack component="ol" spacing={1} sx={{ m: 0, p: 0 }}>
            {answers.map(entry => {
              const answer = entry.after ?? entry.before;
              const wasCorrect = entry.before?.isCorrect ?? false;
              const isCorrect = entry.after?.isCorrect ?? wasCorrect;
              const pillLabel =
                entry.kind === 'same' && wasCorrect !== isCorrect
                  ? `${wasCorrect ? t('values.correct') : t('values.incorrect')} → ${
                      isCorrect ? t('values.correct') : t('values.incorrect')
                    }`
                  : t('preview.correct');
              const showPill = isCorrect || wasCorrect !== isCorrect;
              return (
                <DiffListItem
                  aside={
                    showPill ? (
                      <StatusPill
                        label={pillLabel}
                        tone={wasCorrect !== isCorrect ? 'warning' : 'success'}
                      />
                    ) : undefined
                  }
                  key={entry.id}
                  kind={entry.kind}
                  text={answer?.body ?? ''}
                />
              );
            })}
          </Stack>
        </LabeledBlock>
      )}
      {expectedAnswers.length > 0 && (
        <LabeledBlock label={t('compare.expectedAnswers')}>
          <Stack component="ul" spacing={1} sx={{ m: 0, p: 0 }}>
            {expectedAnswers.map(entry => (
              <DiffListItem
                key={entry.id}
                kind={entry.kind}
                text={entry.after ?? entry.before ?? ''}
              />
            ))}
          </Stack>
        </LabeledBlock>
      )}
      {(from.explanation || to.explanation) && (
        <LabeledBlock label={t('compare.explanation')}>
          <DiffText segments={diffText(from.explanation, to.explanation)} />
        </LabeledBlock>
      )}
      <Stack direction="row" spacing={4}>
        <LabeledBlock label={t('compare.maxPoints')}>
          <Typography sx={valueSx} variant="body2">
            {isPointsChanged ? `${from.maxPoints} → ${to.maxPoints}` : to.maxPoints}
          </Typography>
        </LabeledBlock>
        <LabeledBlock label={t('compare.scoringRule')}>
          <Typography sx={valueSx} variant="body2">
            {isRuleChanged
              ? `${tDictionary(`scoringRule.${from.scoringRule}.label`)} → ${tDictionary(
                  `scoringRule.${to.scoringRule}.label`,
                )}`
              : tDictionary(`scoringRule.${to.scoringRule}.label`)}
          </Typography>
        </LabeledBlock>
      </Stack>
    </Stack>
  );
};
