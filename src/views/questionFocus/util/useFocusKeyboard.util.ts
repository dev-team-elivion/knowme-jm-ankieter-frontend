import { useEffect } from 'react';

type Handlers = {
  onExit: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

const IGNORED_TARGETS =
  'input, textarea, select, [contenteditable="true"], [role="menu"], [role="listbox"], [role="dialog"]';

const isIgnoredTarget = (target: EventTarget | null): boolean =>
  target instanceof Element && target.closest(IGNORED_TARGETS) !== null;

export const useFocusKeyboard = ({ onExit, onNext, onPrevious }: Handlers): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const hasModifier = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
      if (event.defaultPrevented || hasModifier || isIgnoredTarget(event.target)) {
        return;
      }
      const action = new Map([
        ['ArrowLeft', onPrevious],
        ['ArrowRight', onNext],
        ['Escape', onExit],
      ]).get(event.key);
      if (action) {
        event.preventDefault();
        action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit, onNext, onPrevious]);
};
