import { createSearchParams, generatePath } from 'react-router-dom';

import {
  PAGINATION_PARAMS,
  withoutParams,
} from '@/components/dataTable/util/dataTableSearchParams.util.ts';
import { RouteEnum } from '@/models/route/Route.enum.ts';

export const DUPLICATE_OF_PARAM = 'duplicateOf';
export const RETURN_TO_PARAM = 'back';
export const FOCUS_QUESTION_PARAM = 'question';
export const FOCUS_SESSION_PARAM = 'review';

const withSearch = (path: string, params: Record<string, string | undefined>): string => {
  const search = createSearchParams(
    Object.entries(params).filter((entry): entry is [string, string] => entry[1] !== undefined),
  ).toString();
  return search ? `${path}?${search}` : path;
};

const QUESTION_BANK_PATH: string = RouteEnum.QUESTION_BANK;
const QUESTION_FOCUS_PATH: string = RouteEnum.QUESTION_FOCUS;

export const isSafeReturnPath = (value: string): boolean =>
  value === QUESTION_BANK_PATH ||
  value.startsWith(`${QUESTION_BANK_PATH}?`) ||
  value.startsWith(`${QUESTION_BANK_PATH}/`);

export const isFocusReturnPath = (value: string): boolean =>
  value === QUESTION_FOCUS_PATH || value.startsWith(`${QUESTION_FOCUS_PATH}?`);

export const buildQuestionEditPath = (questionId: string, returnTo?: string): string =>
  withSearch(generatePath(RouteEnum.QUESTION_EDIT, { questionId }), {
    [RETURN_TO_PARAM]: returnTo,
  });

export const buildQuestionHistoryPath = (questionId: string, returnTo?: string): string =>
  withSearch(generatePath(RouteEnum.QUESTION_HISTORY, { questionId }), {
    [RETURN_TO_PARAM]: returnTo,
  });

export const buildQuestionDuplicatePath = (questionId: string, returnTo?: string): string =>
  withSearch(RouteEnum.QUESTION_CREATE, {
    [DUPLICATE_OF_PARAM]: questionId,
    [RETURN_TO_PARAM]: returnTo,
  });

export const buildQuestionCreatePath = (returnTo?: string): string =>
  withSearch(RouteEnum.QUESTION_CREATE, { [RETURN_TO_PARAM]: returnTo });

export const buildQuestionBankPath = (search: URLSearchParams): string => {
  const query = withoutParams(search, [FOCUS_QUESTION_PARAM, FOCUS_SESSION_PARAM]).toString();
  return query ? `${RouteEnum.QUESTION_BANK}?${query}` : RouteEnum.QUESTION_BANK;
};

export const buildQuestionFocusPath = (search: URLSearchParams, questionId?: string): string => {
  const kept = [...withoutParams(search, [...PAGINATION_PARAMS, FOCUS_QUESTION_PARAM])];
  const query = new URLSearchParams(
    questionId === undefined ? kept : [...kept, [FOCUS_QUESTION_PARAM, questionId]],
  ).toString();
  return query ? `${RouteEnum.QUESTION_FOCUS}?${query}` : RouteEnum.QUESTION_FOCUS;
};

export const buildQuestionFocusEntryPath = (
  search: URLSearchParams,
  sessionId: string,
  questionId?: string,
): string =>
  buildQuestionFocusPath(
    new URLSearchParams([
      ...withoutParams(search, [FOCUS_SESSION_PARAM]),
      [FOCUS_SESSION_PARAM, sessionId],
    ]),
    questionId,
  );
