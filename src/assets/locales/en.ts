import {
  componentsTranslation,
  ComponentsTranslation,
} from '@/assets/locales/components/components.translation.en.ts';
import {
  generalErrorTranslation,
  GeneralErrorTranslation,
} from '@/assets/locales/generalError/generalError.translation.en.ts';
import {
  layoutTranslation,
  LayoutTranslation,
} from '@/assets/locales/layout/layout.translation.en.ts';
import { menuTranslation, MenuTranslation } from '@/assets/locales/menu/menu.translation.en.ts';
import {
  validationTranslation,
  ValidationTranslation,
} from '@/assets/locales/validation/validation.translation.en.ts';
import { viewsTranslation, ViewsTranslation } from '@/assets/locales/views/views.translation.en.ts';

export type AppTranslation = {
  components: ComponentsTranslation;
  generalError: GeneralErrorTranslation;
  layout: LayoutTranslation;
  menu: MenuTranslation;
  validation: ValidationTranslation;
  views: ViewsTranslation;
};

export const en: AppTranslation = {
  components: componentsTranslation,
  generalError: generalErrorTranslation,
  layout: layoutTranslation,
  menu: menuTranslation,
  validation: validationTranslation,
  views: viewsTranslation,
};
