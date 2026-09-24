import { CurrentUserDto } from '@/api/generated';

export const getUserDisplayName = (user: CurrentUserDto): string => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
  return fullName || (user.email ?? '');
};

export const getUserInitials = (user: CurrentUserDto): string => {
  const initials = [user.firstName, user.lastName]
    .map(part => part?.trim().charAt(0) ?? '')
    .join('');
  return (initials || (user.email?.charAt(0) ?? '')).toUpperCase();
};
