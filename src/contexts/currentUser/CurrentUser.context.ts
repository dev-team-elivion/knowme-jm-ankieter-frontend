import { createContext, use } from 'react';

import { CurrentUserDto } from '@/api/generated';

export const CurrentUserContext = createContext<CurrentUserDto | null>(null);

export const useCurrentUserContext = (): CurrentUserDto => {
  const currentUser = use(CurrentUserContext);
  if (currentUser === null) {
    throw new Error('useCurrentUserContext must be used inside CurrentUserProvider');
  }
  return currentUser;
};
