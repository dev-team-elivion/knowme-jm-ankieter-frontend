import { JSX, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { consumeReturnPath } from '@/api/utils/ssoRedirect.util.ts';
import { BackendUnavailable } from '@/components/appState/BackendUnavailable.comp.tsx';
import { SessionRedirect } from '@/components/appState/SessionRedirect.comp.tsx';
import { FullPageSpinner } from '@/components/state/FullPageSpinner.comp.tsx';
import { CurrentUserContext } from '@/contexts/currentUser/CurrentUser.context.ts';
import { useCurrentUser } from '@/hooks/useCurrentUser.util.ts';

type Props = {
  children: ReactNode;
};

export const CurrentUserProvider = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();
  const { currentUser, isError, isFetching, isPending, isUnauthorized, retry } = useCurrentUser();
  const isAuthenticated = currentUser?.authenticated === true;

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const returnPath = consumeReturnPath();
    if (returnPath !== null) {
      void navigate(returnPath, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isPending) {
    return <FullPageSpinner />;
  }

  if (isError && !isUnauthorized) {
    return <BackendUnavailable isRetrying={isFetching} onRetry={retry} />;
  }

  if (!isAuthenticated || currentUser === undefined) {
    return <SessionRedirect />;
  }

  return <CurrentUserContext value={currentUser}>{children}</CurrentUserContext>;
};
