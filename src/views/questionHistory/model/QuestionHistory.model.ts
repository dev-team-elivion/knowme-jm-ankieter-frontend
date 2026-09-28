import { ScoringRuleDto } from '@/api/generated';

export type AnswerSnapshot = {
  body: string;
  id: string;
  isCorrect: boolean;
};

export type DiffEntry<T> = {
  after?: T;
  before?: T;
  id: string;
  kind: DiffKind;
};

export type DiffKind = 'added' | 'removed' | 'same';

export type DiffSegment = {
  id: string;
  kind: DiffKind;
  text: string;
};

export type HistoryPanelMode = 'compare' | 'preview';

export type VersionSnapshot = {
  answers: AnswerSnapshot[];
  body: string;
  expectedAnswers: string[];
  explanation: string;
  maxPoints: number;
  scoringRule: ScoringRuleDto;
};
