export const HISTORY_FIELDS = [
  'answer',
  'answer.body',
  'answer.correctOrder',
  'answer.displayOrder',
  'answer.isCorrect',
  'answer.points',
  'answerKey',
  'body',
  'category',
  'examinerCommentRequired',
  'expectedAnswers',
  'explanation',
  'maxPoints',
  'media',
  'positionCodes',
  'review',
  'scaleMax',
  'scoringRule',
  'source',
  'sourceName',
  'status',
  'tags',
  'topics',
  'topicsToPick',
  'translationStatus',
] as const;

export type HistoryField = (typeof HISTORY_FIELDS)[number];

export const LANGUAGE_FIELDS: readonly string[] = ['sourceLocale', 'translation'];

export const TEXT_DIFF_FIELDS: readonly HistoryField[] = [
  'answer.body',
  'answerKey',
  'body',
  'explanation',
  'sourceName',
];

export type ChangeValue =
  | { items: string[]; type: 'list' }
  | { markedBy: string; reason?: string; type: 'review' }
  | { text: string; type: 'text' }
  | { type: 'boolean'; value: boolean }
  | { type: 'item' }
  | { type: 'number'; value: number };

export type VisibleChange = {
  after: ChangeValue | null;
  before: ChangeValue | null;
  field: HistoryField | null;
  key: string;
};
