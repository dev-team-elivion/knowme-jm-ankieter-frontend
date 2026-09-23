import { ViewsTranslation } from '@/assets/locales/views/views.translation.en.ts';

export const viewsTranslation: ViewsTranslation = {
  comingSoon: {
    description: 'Ten moduł jest w przygotowaniu. Pojawi się tutaj w jednej z kolejnych wersji.',
    goToDashboard: 'Przejdź do dashboardu',
    hint: 'Pozostałe moduły znajdziesz w menu po lewej stronie.',
    statusLabel: 'W przygotowaniu',
  },
  devPatterns: {
    description:
      'Ekran dla zespołu. Pokazuje wspólne komponenty na lokalnych danych przykładowych, bez połączenia z serwerem.',
    form: {
      description:
        'Walidacja działa najpierw w przeglądarce. Błędy zwrócone przez serwer pojawiają się przy odpowiednich polach.',
      fields: {
        category: 'Kategoria',
        content: 'Treść pytania',
        contentPlaceholder: 'Na przykład: Jak przechowywać towar chłodzony?',
        email: 'E-mail autora',
        emailPlaceholder: 'imie.nazwisko@firma.pl',
      },
      reset: 'Wyczyść formularz',
      savedMessage: 'Zapisano pytanie.',
      simulateServerError: 'Symuluj odrzucenie przez serwer',
      submit: 'Zapisz pytanie',
      title: 'Formularz',
    },
    notifications: {
      description: 'Krótkie potwierdzenia znikają same. Błędy zostają do czasu zamknięcia.',
      errorMessage: 'Nie udało się zapisać zmian. Spróbuj ponownie.',
      showError: 'Pokaż błąd',
      showSuccess: 'Pokaż potwierdzenie',
      successMessage: 'Zapisano zmiany.',
      title: 'Powiadomienia',
    },
    states: {
      calloutBody: 'Tego bloku używaj do informacji, które pomagają, ale nie blokują pracy.',
      calloutTitle: 'Informacja',
      description: 'Każda lista poza danymi ma trzy stany. Każdy ma własny komponent.',
      emptyLabel: 'Pusto',
      errorLabel: 'Błąd',
      loadingLabel: 'Wczytywanie',
      title: 'Stany ekranu',
    },
    table: {
      columns: {
        category: 'Kategoria',
        code: 'Kod',
        content: 'Treść',
        status: 'Status',
        updatedAt: 'Zmieniono',
      },
      description:
        'Stronicowanie, sortowanie i filtry trafiają do źródła danych jako jedno zapytanie i są zapisane w adresie, więc widokiem można się podzielić.',
      filters: {
        allCategories: 'Wszystkie kategorie',
        allStatuses: 'Wszystkie statusy',
        category: 'Kategoria',
        search: 'Szukaj pytań',
        status: 'Status',
      },
      showEmptyDataset: 'Pokaż pustą listę',
      title: 'Tabela',
    },
    title: 'Wzorce interfejsu',
  },
  dictionaries: {
    questionCategory: {
      COMMUNICATION: 'Komunikacja',
      CUSTOMER_SERVICE: 'Obsługa klienta',
      FOOD_SAFETY: 'Bezpieczeństwo żywności',
      OCCUPATIONAL_SAFETY: 'BHP',
    },
    questionStatus: {
      ACTIVE: 'Aktywne',
      ARCHIVED: 'Zarchiwizowane',
      DRAFT: 'Szkic',
    },
  },
};
