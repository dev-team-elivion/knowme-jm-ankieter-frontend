import { ComponentType, LazyExoticComponent } from 'react';

import { RouteEnum } from '@/models/route/Route.enum.ts';

export type RouteModel = {
  component: LazyExoticComponent<ComponentType>;
  path: RouteEnum;
};
