import { QuestionVersionDto } from '@/api/generated';
import {
  AnswerSnapshot,
  DiffEntry,
  DiffKind,
  DiffSegment,
  VersionSnapshot,
} from '@/views/questionHistory/model/QuestionHistory.model.ts';

type Step<T> = {
  after?: T;
  before?: T;
  kind: DiffKind;
};

const buildSuffixTable = <T extends object | string>(
  before: T[],
  after: T[],
  isEqual: (left: T, right: T) => boolean,
): number[][] => {
  const emptyRow = after.map(() => 0).concat(0);
  return before.reduceRight<number[][]>(
    (rowsBelow, beforeItem) => {
      const below = rowsBelow.at(0) ?? emptyRow;
      const row = after.reduceRight<number[]>(
        (cellsRight, afterItem, column) => {
          const value = isEqual(beforeItem, afterItem)
            ? (below.at(column + 1) ?? 0) + 1
            : Math.max(below.at(column) ?? 0, cellsRight.at(0) ?? 0);
          return [value, ...cellsRight];
        },
        [0],
      );
      return [row, ...rowsBelow];
    },
    [emptyRow],
  );
};

const walkTable = <T extends object | string>(
  before: T[],
  after: T[],
  isEqual: (left: T, right: T) => boolean,
  table: number[][],
): Step<T>[] => {
  const steps: Step<T>[] = [];
  let row = 0;
  let column = 0;
  while (row < before.length || column < after.length) {
    const beforeItem = before.at(row);
    const afterItem = after.at(column);
    const isRemovalCheaper =
      (table.at(row + 1)?.at(column) ?? 0) >= (table.at(row)?.at(column + 1) ?? 0);
    if (beforeItem !== undefined && afterItem !== undefined && isEqual(beforeItem, afterItem)) {
      steps.push({ after: afterItem, before: beforeItem, kind: 'same' });
      row += 1;
      column += 1;
    } else if (beforeItem !== undefined && (afterItem === undefined || isRemovalCheaper)) {
      steps.push({ before: beforeItem, kind: 'removed' });
      row += 1;
    } else {
      steps.push({ after: afterItem, kind: 'added' });
      column += 1;
    }
  }
  return steps;
};

export const diffSequences = <T extends object | string>(
  before: T[],
  after: T[],
  isEqual: (left: T, right: T) => boolean,
): DiffEntry<T>[] =>
  walkTable(before, after, isEqual, buildSuffixTable(before, after, isEqual)).map(
    (step, position) => ({ ...step, id: `${step.kind}-${position}` }),
  );

const tokenize = (text: string): string[] => text.split(/(\s+)/).filter(token => token !== '');

export const diffText = (before: string, after: string): DiffSegment[] =>
  diffSequences(tokenize(before), tokenize(after), (left, right) => left === right).reduce<
    DiffSegment[]
  >((segments, entry) => {
    const text = entry.after ?? entry.before ?? '';
    const last = segments.at(-1);
    return last?.kind === entry.kind
      ? [...segments.slice(0, -1), { ...last, text: last.text + text }]
      : [...segments, { id: entry.id, kind: entry.kind, text }];
  }, []);

const normalizeForMatch = (text: string): string => text.trim().toLowerCase();

export const diffAnswers = (
  before: AnswerSnapshot[],
  after: AnswerSnapshot[],
): DiffEntry<AnswerSnapshot>[] =>
  diffSequences(
    before,
    after,
    (left, right) => normalizeForMatch(left.body) === normalizeForMatch(right.body),
  );

export const diffTextList = (before: string[], after: string[]): DiffEntry<string>[] =>
  diffSequences(
    before,
    after,
    (left, right) => normalizeForMatch(left) === normalizeForMatch(right),
  );

export const toVersionSnapshot = (version: QuestionVersionDto): VersionSnapshot => {
  const locale = version.sourceLocale;
  const translation = version.translations.find(item => item.locale === locale);

  return {
    answers: [...version.answers]
      .sort((first, second) => first.displayOrder - second.displayOrder)
      .map(answer => ({
        body: answer.translations.find(item => item.locale === locale)?.body ?? '',
        id: answer.id,
        isCorrect: answer.isCorrect,
      })),
    body: translation?.body ?? '',
    expectedAnswers: translation?.expectedAnswers ?? [],
    explanation: translation?.explanation ?? '',
    maxPoints: version.maxPoints,
    scoringRule: version.scoringRule,
  };
};
