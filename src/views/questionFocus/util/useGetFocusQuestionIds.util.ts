import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo } from 'react';

import { QuestionPageDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';
import { QuestionBankQuery } from '@/views/questionBank/model/QuestionBank.model.ts';
import { toQuestionListParams } from '@/views/questionBank/util/questionListParams.util.ts';

const FOCUS_PAGE_SIZE = 200;
const FROZEN_ORDER_GC_TIME = 30 * 60 * 1000;

type Return = {
  hasMore: boolean;
  ids: string[];
  isError: boolean;
  isFetchingMore: boolean;
  isLoading: boolean;
  isRetrying: boolean;
  loadMore: () => void;
  retry: () => void;
  total: number;
};

export const useGetFocusQuestionIds = (query: QuestionBankQuery, sessionId: string): Return => {
  const { questionsApi } = useApiClient();
  const params = toQuestionListParams({ ...query, page: 0, pageSize: FOCUS_PAGE_SIZE });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useInfiniteQuery<
    QuestionPageDto,
    AxiosError,
    InfiniteData<QuestionPageDto>,
    QueryKey,
    number
  >({
    gcTime: FROZEN_ORDER_GC_TIME,
    getNextPageParam: last => (last.page + 1 < last.totalPages ? last.page + 1 : undefined),
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const { data } = await questionsApi.listQuestions(
        params.categoryId,
        params.type,
        params.purpose,
        params.status,
        params.source,
        params.tagId,
        params.positionCode,
        params.locale,
        params.translationStatus,
        params.author,
        params.q,
        params.changedFrom,
        params.changedTo,
        pageParam,
        params.size,
        params.sort,
        params.forReview,
      );
      return data;
    },
    queryKey: [QueryKeyEnum.FOCUS_QUESTION_IDS, sessionId, params],
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const ids = useMemo(
    () => [...new Set(data?.pages.flatMap(page => page.content.map(item => item.id)) ?? [])],
    [data],
  );

  return {
    hasMore: hasNextPage,
    ids,
    isError,
    isFetchingMore: isFetchingNextPage,
    isLoading: isPending,
    isRetrying: isFetching,
    loadMore: () => void fetchNextPage(),
    retry: () => void refetch(),
    total: data?.pages.at(0)?.totalElements ?? 0,
  };
};
