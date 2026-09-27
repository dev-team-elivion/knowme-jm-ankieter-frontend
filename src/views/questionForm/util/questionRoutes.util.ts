import { createSearchParams, generatePath } from 'react-router-dom';

import { RouteEnum } from '@/models/route/Route.enum.ts';

export const DUPLICATE_OF_PARAM = 'duplicateOf';

export const buildQuestionEditPath = (questionId: string): string =>
  generatePath(RouteEnum.QUESTION_EDIT, { questionId });

export const buildQuestionDuplicatePath = (questionId: string): string =>
  `${RouteEnum.QUESTION_CREATE}?${createSearchParams({ [DUPLICATE_OF_PARAM]: questionId }).toString()}`;
