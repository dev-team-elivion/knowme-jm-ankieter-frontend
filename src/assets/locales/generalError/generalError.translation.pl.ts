import { GeneralErrorTranslation } from '@/assets/locales/generalError/generalError.translation.en.ts';

export const generalErrorTranslation: GeneralErrorTranslation = {
  backendUnavailable: {
    description:
      'Aplikacja nie może teraz połączyć się z serwerem. Odczekaj chwilę i spróbuj ponownie. Jeśli problem się powtarza, zgłoś go administratorowi.',
    retry: 'Spróbuj ponownie',
    statusLabel: 'Brak połączenia',
    title: 'Nie udało się połączyć',
  },
  crash: {
    description:
      'Ten ekran przestał działać. Zapisane dane są bezpieczne. Odśwież stronę albo wróć do dashboardu.',
    goToDashboard: 'Przejdź do dashboardu',
    reload: 'Odśwież stronę',
    statusLabel: 'Nieoczekiwany błąd',
    title: 'Coś poszło nie tak',
  },
  notFound: {
    description:
      'Adres może zawierać literówkę albo strona została przeniesiona. Skorzystaj z menu, aby ją znaleźć.',
    goBack: 'Wróć',
    goToDashboard: 'Przejdź do dashboardu',
    statusLabel: 'Błąd 404',
    title: 'Nie znaleziono strony',
  },
  sessionExpired: {
    description:
      'Za chwilę zobaczysz stronę logowania. Po zalogowaniu wrócisz w to samo miejsce. Jeśli nic się nie dzieje, użyj przycisku poniżej.',
    signIn: 'Zaloguj się',
    statusLabel: 'Sesja',
    title: 'Przekierowanie do logowania',
  },
};
