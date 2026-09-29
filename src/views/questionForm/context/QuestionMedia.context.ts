import { createContext, use } from 'react';

import { MediaAssetDto } from '@/api/generated';

export type QuestionMediaContextValue = {
  answerMedia: Map<string, MediaAssetDto[]>;
  target: QuestionMediaTarget;
  versionMedia: MediaAssetDto[];
};

export type QuestionMediaTarget =
  | { kind: 'editable'; questionId: string; versionId: string }
  | { kind: 'readOnly' }
  | { kind: 'unsaved' };

export const QuestionMediaContext = createContext<QuestionMediaContextValue>({
  answerMedia: new Map(),
  target: { kind: 'unsaved' },
  versionMedia: [],
});

export const useQuestionMedia = (): QuestionMediaContextValue => use(QuestionMediaContext);
