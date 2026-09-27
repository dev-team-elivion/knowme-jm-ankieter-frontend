import { lazy } from 'react';

import { CONFIG } from '@/config/config.ts';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { RouteModel } from '@/models/route/Route.model.ts';

const ComingSoonView = lazy(() =>
  import('@/views/comingSoon/ComingSoon.view.tsx').then(module => ({
    default: module.ComingSoonView,
  })),
);

const DevPatternsView = lazy(() =>
  import('@/views/devPatterns/DevPatterns.view.tsx').then(module => ({
    default: module.DevPatternsView,
  })),
);

const QuestionBankView = lazy(() =>
  import('@/views/questionBank/QuestionBank.view.tsx').then(module => ({
    default: module.QuestionBankView,
  })),
);

const QuestionCreateView = lazy(() =>
  import('@/views/questionForm/QuestionCreate.view.tsx').then(module => ({
    default: module.QuestionCreateView,
  })),
);

const QuestionEditView = lazy(() =>
  import('@/views/questionForm/QuestionEdit.view.tsx').then(module => ({
    default: module.QuestionEditView,
  })),
);

const MODULE_ROUTES: RouteModel[] = [
  { component: ComingSoonView, path: RouteEnum.DASHBOARD },
  { component: ComingSoonView, path: RouteEnum.PATHS },
  { component: ComingSoonView, path: RouteEnum.PROCESSES },
  { component: QuestionBankView, path: RouteEnum.QUESTION_BANK },
  { component: QuestionCreateView, path: RouteEnum.QUESTION_CREATE },
  { component: QuestionEditView, path: RouteEnum.QUESTION_EDIT },
  { component: ComingSoonView, path: RouteEnum.SETTINGS },
  { component: ComingSoonView, path: RouteEnum.SURVEYS },
  { component: ComingSoonView, path: RouteEnum.TESTS },
];

const DEV_ROUTES: RouteModel[] = [{ component: DevPatternsView, path: RouteEnum.DEV_PATTERNS }];

export const ROUTES: RouteModel[] = CONFIG.DEV_TOOLS_ENABLED
  ? [...MODULE_ROUTES, ...DEV_ROUTES]
  : MODULE_ROUTES;
