import { ComponentsTranslation } from '@/assets/locales/components/components.translation.en.ts';

export const componentsTranslation: ComponentsTranslation = {
  dataTable: {
    displayedRows: '{{from}}–{{to}} z {{count}}',
    loadingLabel: 'Wczytywanie wierszy',
    rowsPerPage: 'Wierszy na stronie',
    sortAscending: 'sortowanie rosnąco',
    sortDescending: 'sortowanie malejąco',
  },
  emptyState: {
    noData: {
      description: 'Dodane pozycje pojawią się w tym miejscu.',
      title: 'Nic tu jeszcze nie ma',
    },
    noMatch: {
      clearFilters: 'Wyczyść filtry',
      description: 'Zmień wyszukiwaną frazę albo wyczyść filtry, aby zobaczyć więcej wyników.',
      title: 'Brak pasujących wyników',
    },
  },
  errorState: {
    description: 'Nie udało się wczytać danych. Sprawdź połączenie i spróbuj ponownie.',
    retry: 'Spróbuj ponownie',
    title: 'Coś poszło nie tak',
  },
  form: {
    requiredMark: 'wymagane',
    serverRejected: 'Niektóre pola wymagają poprawy. Popraw je i zapisz ponownie.',
    unexpectedError: 'Nie udało się zapisać zmian. Spróbuj ponownie.',
  },
  loadingState: {
    label: 'Wczytywanie',
  },
  notifications: {
    close: 'Zamknij powiadomienie',
  },
  searchField: {
    clear: 'Wyczyść wyszukiwanie',
    placeholder: 'Szukaj',
  },
  uploadField: {
    tooLarge: 'Plik jest za duży. Limit to {{maxFileSize}}.',
    wrongFormat: 'Ten format pliku nie jest obsługiwany.',
  },
};
