import { generatePath } from 'react-router-dom';

import { RouteEnum } from '@/models/route/Route.enum.ts';

export const buildQuestionEditPath = (questionId: string): string =>
  generatePath(RouteEnum.QUESTION_EDIT, { questionId });
