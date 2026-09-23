import { StatusPillTone } from '@/components/state/model/StatusPill.model.ts';
import { ThemeColorSet } from '@/config/theme/themeColors.ts';

export const getStatusPillColor = (colors: ThemeColorSet, tone: StatusPillTone): string => {
  switch (tone) {
    case 'error':
      return colors.red;
    case 'info':
      return colors.blue;
    case 'neutral':
      return colors.textSecondary;
    case 'success':
      return colors.green;
    case 'warning':
      return colors.orange;
  }
};
