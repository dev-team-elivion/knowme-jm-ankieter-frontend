import { useMemo } from 'react';

import { DataTableSource } from '@/components/dataTable/model/DataTable.model.ts';
import { QUESTIONS_FIXTURE } from '@/views/devPatterns/fixtures/questions.fixture.ts';
import { QuestionRow, QuestionTableQuery } from '@/views/devPatterns/model/Question.model.ts';
import { queryQuestionFixture } from '@/views/devPatterns/util/queryQuestionFixture.util.ts';

export const useQuestionFixtureSource = (
  query: QuestionTableQuery,
  isEmptyDataset: boolean,
): DataTableSource<QuestionRow> => {
  const data = useMemo(
    () => queryQuestionFixture(isEmptyDataset ? [] : QUESTIONS_FIXTURE, query),
    [isEmptyDataset, query],
  );

  return {
    data,
    isError: false,
    isFetching: false,
    isLoading: false,
    retry: () => undefined,
  };
};
