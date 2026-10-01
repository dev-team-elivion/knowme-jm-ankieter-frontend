import { Box, useTheme } from '@mui/material';
import { AnimatePresence, motion, PanInfo, useReducedMotion } from 'framer-motion';
import { JSX, PointerEvent, useRef } from 'react';

import { panelSx } from '@/config/theme/uiTokens.ts';
import { FocusQuestionContent } from '@/views/questionFocus/components/FocusQuestionContent.comp.tsx';
import {
  FOCUS_SLIDE_OFFSET,
  FOCUS_SWIPE_THRESHOLD,
} from '@/views/questionFocus/model/questionFocus.constants.ts';

type Props = {
  direction: number;
  onNext: () => void;
  onPrevious: () => void;
  onShowCorrectChange: (showCorrect: boolean) => void;
  questionId: string;
  showCorrect: boolean;
};

const SLIDE_TRANSITION = { duration: 0.28, ease: [0.16, 1, 0.3, 1] } as const;
const INTERACTIVE_TARGETS = 'input, textarea, button, [role="slider"], li';

export const FocusStage = ({
  direction,
  onNext,
  onPrevious,
  onShowCorrectChange,
  questionId,
  showCorrect,
}: Props): JSX.Element => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const canSwipeRef = useRef(false);
  const offset = prefersReducedMotion ? 0 : FOCUS_SLIDE_OFFSET;
  const variants = {
    center: { opacity: 1, x: 0 },
    enter: (slideDirection: number) => ({ opacity: 0, x: slideDirection * offset }),
    exit: (slideDirection: number) => ({ opacity: 0, x: -slideDirection * offset }),
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    const isInteractive =
      event.target instanceof Element && event.target.closest(INTERACTIVE_TARGETS) !== null;
    canSwipeRef.current = event.pointerType !== 'mouse' && !isInteractive;
  };

  const handlePanEnd = (_: unknown, { offset: pan }: PanInfo): void => {
    const isHorizontal = Math.abs(pan.x) > Math.abs(pan.y);
    if (!canSwipeRef.current || !isHorizontal || Math.abs(pan.x) < FOCUS_SWIPE_THRESHOLD) {
      return;
    }
    if (pan.x < 0) {
      onNext();
    } else {
      onPrevious();
    }
  };

  return (
    <Box
      sx={{
        ...panelSx(theme.colors),
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <motion.div
          animate="center"
          custom={direction}
          exit="exit"
          initial="enter"
          key={questionId}
          onPanEnd={handlePanEnd}
          onPointerDownCapture={handlePointerDown}
          style={{ padding: 24, touchAction: 'pan-y' }}
          transition={SLIDE_TRANSITION}
          variants={variants}
        >
          <FocusQuestionContent
            onShowCorrectChange={onShowCorrectChange}
            questionId={questionId}
            showCorrect={showCorrect}
          />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};
