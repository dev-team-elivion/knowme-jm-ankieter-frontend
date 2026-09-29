import { Box, Tooltip, useTheme } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { Fragment, JSX, useId } from 'react';

import { SegmentedControlItem } from '@/components/segmentedControl/SegmentedControl.model.ts';
import { pressableSx } from '@/config/theme/uiTokens.ts';

type Props<TValue extends string> = {
  ariaLabel: string;
  items: SegmentedControlItem<TValue>[];
  onChange: (value: TValue) => void;
  value: TValue;
};

const PILL_SPRING = { damping: 32, stiffness: 380, type: 'spring' } as const;

export const SegmentedControl = <TValue extends string>({
  ariaLabel,
  items,
  onChange,
  value,
}: Props<TValue>): JSX.Element => {
  const theme = useTheme();
  const { colors } = theme;
  const layoutId = useId();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      aria-label={ariaLabel}
      role="group"
      sx={{
        alignItems: 'center',
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '16px',
        display: 'flex',
        gap: 0.25,
        p: 0.5,
        width: 'fit-content',
      }}
    >
      {items.map((item, index) => {
        const isActive = item.value === value;
        const isDisabled = item.disabled === true;
        const isSeparatorHidden = isActive || items[index - 1]?.value === value;

        const segment = (
          <Box
            aria-pressed={isActive}
            component="button"
            disabled={isDisabled}
            onClick={() => onChange(item.value)}
            sx={{
              ...pressableSx,
              '&:focus-visible': { boxShadow: `0 0 0 3px ${colors.accentRing}` },
              '&:hover':
                isActive || isDisabled
                  ? {}
                  : { background: colors.bgHover, color: colors.textPrimary },
              '& svg': { fontSize: 16 },
              alignItems: 'center',
              appearance: 'none',
              background: 'transparent',
              border: '1px solid transparent',
              borderRadius: '12px',
              color: isActive ? colors.accentInk : colors.textSecondary,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: isActive ? 800 : 700,
              lineHeight: 1.2,
              opacity: isDisabled ? 0.45 : 1,
              outline: 'none',
              position: 'relative',
              px: 2,
              py: 1,
              transition:
                'color 200ms ease-out, background-color 200ms ease-out, opacity 200ms ease-out, transform 120ms cubic-bezier(0.2, 0, 0, 1)',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
            type="button"
          >
            {isActive && (
              <Box
                component={motion.div}
                layoutId={`${layoutId}-active-pill`}
                sx={{
                  background: colors.accentBg,
                  border: `1px solid ${colors.accentBorder}`,
                  borderRadius: '12px',
                  inset: 0,
                  position: 'absolute',
                }}
                transition={prefersReducedMotion ? { duration: 0 } : PILL_SPRING}
              />
            )}
            <Box sx={{ alignItems: 'center', display: 'flex', gap: 1, position: 'relative' }}>
              {item.icon}
              {item.label}
            </Box>
          </Box>
        );

        return (
          <Fragment key={item.value}>
            {index > 0 && (
              <Box
                aria-hidden
                sx={{
                  background: colors.border,
                  height: 18,
                  mx: 0.25,
                  visibility: isSeparatorHidden ? 'hidden' : 'visible',
                  width: '1px',
                }}
              />
            )}
            {item.tooltip ? (
              <Tooltip title={item.tooltip}>
                <span>{segment}</span>
              </Tooltip>
            ) : (
              segment
            )}
          </Fragment>
        );
      })}
    </Box>
  );
};
