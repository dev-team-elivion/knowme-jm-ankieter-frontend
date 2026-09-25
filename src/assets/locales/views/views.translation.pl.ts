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
    questionSource: {
      HANDBOOK: 'Podręcznik',
      OPEROLKA: 'Operolka',
      OTHER: 'Inne',
      PROCEDURE: 'Procedura',
    },
    questionStatus: {
      ACTIVE: 'Aktywne',
      ARCHIVED: 'Zarchiwizowane',
      DRAFT: 'Szkic',
    },
    questionType: {
      MULTIPLE_CHOICE: 'Wielokrotny wybór',
      OPEN_TEXT: 'Pytanie otwarte',
      ORDERING: 'Ustalanie kolejności',
      PASS_FAIL: 'Zaliczone lub niezaliczone',
      PRACTICAL: 'Zadanie praktyczne',
      SINGLE_CHOICE: 'Jednokrotny wybór',
    },
    scoringRule: {
      ALL_OR_NOTHING: {
        description:
          'Punkty tylko za zaznaczenie wszystkich poprawnych odpowiedzi i żadnej błędnej.',
        label: 'Wszystko albo nic',
      },
      PARTIAL: {
        description:
          'Punkty proporcjonalnie do zaznaczonych poprawnych odpowiedzi. Błędne zaznaczenia nic nie odejmują, więc zaznaczenie wszystkich daje komplet punktów.',
        label: 'Częściowa',
      },
      PARTIAL_WITH_PENALTY: {
        description:
          'Każde błędne zaznaczenie odejmuje punkty. Wynik pytania nigdy nie spada poniżej zera.',
        label: 'Częściowa z karą',
      },
    },
    translationStatus: {
      APPROVED: 'Zatwierdzone',
      DRAFT: 'Szkic',
      MISSING: 'Brak',
    },
    versionStatus: {
      ACTIVE: 'Aktywna',
      DRAFT: 'Szkic',
      RETIRED: 'Wyłączona',
    },
  },
  questionForm: {
    actions: {
      fixTypo: 'Popraw literówkę',
      fixTypoHint: 'Zmienia bieżącą wersję. Tłumaczenia zachowują swój stan.',
      newVersion: 'Nowa wersja',
      newVersionHint:
        'Użyj, gdy zmienia się sens pytania. Obecna wersja zostanie wyłączona, a wszystkie tłumaczenia trzeba będzie przygotować od nowa.',
      saveDraft: 'Zapisz szkic',
    },
    answers: {
      add: 'Dodaj odpowiedź',
      answerLabel: 'Odpowiedź {{number}}',
      answerPlaceholder: 'Treść odpowiedzi',
      descriptionMultiple: 'Zaznacz wszystkie poprawne odpowiedzi.',
      descriptionSingle: 'Zaznacz jedną poprawną odpowiedź.',
      descriptionSurvey: 'Pytania ankietowe nie mają poprawnej odpowiedzi.',
      markCorrect: 'Oznacz odpowiedź {{number}} jako poprawną',
      moveDown: 'Przesuń odpowiedź {{number}} niżej',
      moveUp: 'Przesuń odpowiedź {{number}} wyżej',
      remove: 'Usuń odpowiedź {{number}}',
      removeDisabled: 'Pytanie musi mieć co najmniej dwie odpowiedzi.',
      title: 'Odpowiedzi',
    },
    backToBank: 'Wróć do bazy pytań',
    classification: {
      addTag: 'Dodaj tag „{{label}}”',
      businessKey: 'Klucz pytania',
      businessKeyAuto: 'Klucz zostanie nadany automatycznie, na przykład {{example}}.',
      businessKeyAutoNoCategory: 'Klucz zostanie nadany automatycznie po wybraniu kategorii.',
      businessKeyManual: 'Wpisz klucz ręcznie',
      businessKeyManualHelper: 'Tylko dla pytań przenoszonych z istniejącej bazy.',
      categoriesUnavailable: 'Nie udało się wczytać kategorii. Odśwież stronę.',
      category: 'Kategoria',
      categoryPlaceholder: 'Wybierz kategorię',
      description: 'Klasyfikację można później zmienić bez tworzenia nowej wersji.',
      noTags: 'Brak pasujących tagów',
      positionCodes: 'Stanowiska',
      positionCodesPlaceholder: 'Wpisz kod stanowiska i naciśnij Enter',
      source: 'Źródło',
      sourceName: 'Nazwa źródła',
      sourceNamePlaceholder: 'Na przykład: Procedura przyjęcia towaru',
      sourcePlaceholder: 'Wybierz źródło',
      tagCreateError: 'Nie udało się dodać tagu. Spróbuj ponownie.',
      tags: 'Tagi',
      tagsPlaceholder: 'Wpisz, aby wyszukać',
      tagsUnavailable: 'Nie udało się wczytać tagów. Odśwież stronę.',
      title: 'Klasyfikacja',
    },
    content: {
      body: 'Treść pytania',
      bodyPlaceholder: 'Na przykład: Jak długo można przechowywać otwarte mleko w chłodni?',
      description: 'Wybierz sposób odpowiedzi i wpisz treść pytania.',
      explanation: 'Wyjaśnienie po teście',
      explanationHelper: 'Opcjonalne. Pojawia się po teście, jeśli test ma włączone wyjaśnienia.',
      title: 'Treść',
      type: 'Typ pytania',
      typeLocked: 'Typu nie można zmienić po utworzeniu pytania.',
    },
    create: {
      description: 'Szkic możesz zapisać w dowolnym momencie i dokończyć pytanie później.',
      title: 'Nowe pytanie',
    },
    edit: {
      activateVersion: 'Aktywuj wersję',
      noEditableVersion: {
        description:
          'Wszystkie wersje tego pytania są wyłączone. Aby je zmienić, utwórz nową wersję.',
        title: 'Brak wersji do edycji',
      },
      notFound: {
        description: 'Link mógł stracić ważność. Wróć do bazy pytań i otwórz pytanie z listy.',
        title: 'Nie znaleziono pytania',
      },
      title: 'Edycja pytania',
      unsupportedType: {
        description: 'Pytań typu „{{type}}” nie można jeszcze tutaj edytować.',
        title: 'Tego pytania nie można jeszcze edytować',
      },
      versionLabel: 'Wersja {{number}}',
    },
    errors: {
      activateFailed: 'Nie udało się aktywować wersji. Spróbuj ponownie.',
      conflict: 'Pytanie zmieniło się w międzyczasie. Odśwież stronę i spróbuj ponownie.',
      forbidden: 'Nie masz uprawnień do zapisania tego pytania.',
      keyTaken: 'Ten klucz jest już zajęty. Wpisz inny.',
      notFound: 'To pytanie już nie istnieje. Wróć do bazy pytań.',
    },
    newVersionDialog: {
      cancel: 'Anuluj',
      confirm: 'Utwórz nową wersję',
      description:
        'Obecna wersja zostanie wyłączona. Tłumaczenia nowej wersji stracą ważność i trzeba je będzie przygotować od nowa. Jeśli poprawiasz tylko literówkę, wybierz Popraw literówkę.',
      title: 'Utworzyć nową wersję?',
    },
    notifications: {
      activated: 'Wersja jest teraz aktywna.',
      classificationSaved: 'Zapisano klasyfikację.',
      created: 'Zapisano szkic.',
      typoFixed: 'Zapisano poprawkę.',
      versionCreated: 'Utworzono nową wersję.',
    },
    scoring: {
      description: 'Ile punktów jest warte pytanie i jak się je liczy.',
      maxPoints: 'Liczba punktów',
      scoringRule: 'Reguła punktacji',
      singleChoiceRule:
        'Przy jednokrotnym wyborze poprawna odpowiedź daje komplet punktów, a każda inna zero.',
      title: 'Punktacja',
    },
    serverErrors: {
      answerBody: 'Wpisz treść odpowiedzi.',
      answers: 'Sprawdź odpowiedzi. Pytanie potrzebuje co najmniej dwóch odpowiedzi z treścią.',
      answersCorrect: 'Zaznacz co najmniej jedną poprawną odpowiedź.',
      body: 'Wpisz treść pytania.',
      businessKey: 'Sprawdź klucz pytania.',
      categoryId: 'Wybierz kategorię.',
      maxPoints: 'Wpisz liczbę punktów większą od zera.',
      positionCodes: 'Sprawdź wybrane stanowiska.',
      scoringRule: 'Wybierz regułę punktacji.',
      source: 'Wybierz źródło.',
      sourceName: 'Sprawdź nazwę źródła.',
      tags: 'Sprawdź wybrane tagi.',
    },
    translations: {
      answers: 'Odpowiedzi',
      description: 'Stan pytania w każdym języku. Na razie pytania powstają po polsku.',
      missing: 'Brak tłumaczenia.',
      sourceLanguage: 'Język źródłowy. Treść edytujesz w sekcji Treść powyżej.',
      title: 'Tłumaczenia',
    },
  },
};
