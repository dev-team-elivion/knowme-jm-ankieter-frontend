import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QuestionListItemDto, QuestionPageDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';
import { DataTableSource } from '@/components/dataTable/model/DataTable.model.ts';
import { QuestionBankQuery } from '@/views/questionBank/model/QuestionBank.model.ts';
import { toQuestionListParams } from '@/views/questionBank/util/questionListParams.util.ts';

export const useGetQuestionList = (
  query: QuestionBankQuery,
): DataTableSource<QuestionListItemDto> => {
  const { questionsApi } = useApiClient();
  const params = toQuestionListParams(query);

  const { data, isError, isFetching, isLoading, refetch } = useQuery<QuestionPageDto, AxiosError>({
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await questionsApi.listQuestions(
        params.categoryId,
        params.type,
        params.purpose,
        params.status,
        params.source,
        params.tagId,
        params.positionCode,
        params.locale,
        undefined,
        params.author,
        params.q,
        params.changedFrom,
        params.changedTo,
        params.page,
        params.size,
        params.sort,
      );
      return data;
    },
    queryKey: [QueryKeyEnum.LIST_QUESTIONS, params],
  });

  return {
    data: data && { items: data.content, totalElements: data.totalElements },
    isError,
    isFetching,
    isLoading,
    retry: () => void refetch(),
  };
};
