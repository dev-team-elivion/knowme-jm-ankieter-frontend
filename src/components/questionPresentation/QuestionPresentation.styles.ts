import { ThemeColorSet } from '@/config/theme/themeColors.ts';

export const answerRowSx = (colors: ThemeColorSet, isHighlighted: boolean) => ({
  background: isHighlighted ? `${colors.green}1A` : colors.bgCard,
  border: `1px solid ${isHighlighted ? `${colors.green}66` : colors.border}`,
  borderRadius: '12px',
  px: 1.5,
  py: 1,
  transition: 'border-color 160ms ease, background 160ms ease',
});
