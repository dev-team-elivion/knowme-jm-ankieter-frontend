import { JSX, ReactNode } from 'react';

import { BackendUnavailable } from '@/components/appState/BackendUnavailable.comp.tsx';
import { FullPageSpinner } from '@/components/state/FullPageSpinner.comp.tsx';
import { usePing } from '@/hooks/usePing.util.ts';

type Props = {
  children: ReactNode;
};

export const BackendGate = ({ children }: Props): JSX.Element => {
  const { isError, isFetching, isPending, retry } = usePing();

  if (isError) {
    return <BackendUnavailable isRetrying={isFetching} onRetry={retry} />;
  }

  if (isPending) {
    return <FullPageSpinner />;
  }

  return <>{children}</>;
};
