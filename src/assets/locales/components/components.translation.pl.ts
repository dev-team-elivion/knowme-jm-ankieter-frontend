import { VersionStatusDto } from '@/api/generated';
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
  mediaPreview: {
    imageAlt: 'Materiał: {{name}}',
    loadFailed: 'Nie udało się wczytać materiału.',
    retry: 'Wczytaj ponownie',
  },
  notifications: {
    close: 'Zamknij powiadomienie',
  },
  questionPresentation: {
    answerKey: 'Klucz odpowiedzi',
    answerMediaLabel: 'Materiały do odpowiedzi',
    answerPlaceholder: 'Wpisz odpowiedź',
    answerPoints: 'Punkty: {{points}}',
    answersLabel: 'Odpowiedzi',
    correct: 'Poprawna',
    emptyAnswer: 'Pusta odpowiedź',
    emptyBody: 'Tu pojawi się treść pytania.',
    examiner: {
      answerKey: 'Klucz dla egzaminatora',
      comment: 'Komentarz egzaminatora',
      commentRequired: 'Komentarz egzaminatora (wymagany)',
      fail: 'Niezaliczone',
      pass: 'Zaliczone',
      result: 'Wynik',
      scale: 'Ocena od 0 do {{max}}',
      topics: 'Zagadnienia',
      topicsToPick_few: 'Egzaminator wybiera {{count}} zagadnienia.',
      topicsToPick_many: 'Egzaminator wybiera {{count}} zagadnień.',
      topicsToPick_one: 'Egzaminator wybiera {{count}} zagadnienie.',
    },
    expectedAnswers: 'Oczekiwana odpowiedź',
    hiddenMarker: {
      [VersionStatusDto.Draft]: 'Tylko szkic, pracownik go nie widzi',
      [VersionStatusDto.Retired]: 'Wyłączone, pracownik go nie widzi',
    },
    missingTranslation:
      'To pytanie nie ma zatwierdzonej treści w tym języku, więc nie pojawi się w teście w tym języku.',
    noVersion: 'Pytanie nie ma jeszcze wersji do pokazania.',
    openPlaceholder: 'Napisz odpowiedź',
    ordering: {
      correctPosition: 'Właściwe miejsce: {{position}}',
      hint: 'Przeciągnij odpowiedzi albo użyj strzałek, aby ułożyć je w kolejności.',
      moveDown: 'Przesuń niżej: {{answer}}',
      moveUp: 'Przesuń wyżej: {{answer}}',
    },
    questionMediaLabel: 'Materiały do pytania',
    showCorrect: 'Pokaż poprawne odpowiedzi',
    solution: {
      explanation: 'Wyjaśnienie',
      maxPoints: 'Punkty za pytanie',
    },
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
