import { useState } from 'react';

import { QuestionSelection } from '@/views/questionBank/model/QuestionSelection.model.ts';

type Return = {
  clear: () => void;
  isSelected: (questionId: string) => boolean;
  selectAllMatching: () => void;
  selection: QuestionSelection;
  toggle: (questionId: string) => void;
  togglePage: (pageIds: string[]) => void;
};

type ScopedSelection = {
  scope: string;
  selection: QuestionSelection;
};

const EMPTY_SELECTION: QuestionSelection = { ids: [], kind: 'ids' };

const selectedIds = (selection: QuestionSelection): string[] =>
  selection.kind === 'ids' ? selection.ids : [];

export const useQuestionSelection = (scope: string): Return => {
  const [state, setState] = useState<ScopedSelection>({ scope, selection: EMPTY_SELECTION });
  const selection = state.scope === scope ? state.selection : EMPTY_SELECTION;

  const update = (next: QuestionSelection): void => setState({ scope, selection: next });

  return {
    clear: () => update(EMPTY_SELECTION),
    isSelected: questionId =>
      selection.kind === 'allMatching' || selection.ids.includes(questionId),
    selectAllMatching: () => update({ kind: 'allMatching' }),
    selection,
    toggle: questionId => {
      const ids = selectedIds(selection);
      update({
        ids: ids.includes(questionId) ? ids.filter(id => id !== questionId) : [...ids, questionId],
        kind: 'ids',
      });
    },
    togglePage: pageIds => {
      const ids = selectedIds(selection);
      const isPageSelected = pageIds.every(id => ids.includes(id));
      update({
        ids: isPageSelected
          ? ids.filter(id => !pageIds.includes(id))
          : [...ids, ...pageIds.filter(id => !ids.includes(id))],
        kind: 'ids',
      });
    },
  };
};
