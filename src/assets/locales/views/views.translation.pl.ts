import {
  HistoryEventKindDto,
  QuestionPurposeDto,
  QuestionSourceDto,
  QuestionTypeDto,
  ScoringRuleDto,
  TranslationStatusDto,
  VersionStatusDto,
} from '@/api/generated';
import { ViewsTranslation } from '@/assets/locales/views/views.translation.en.ts';
import {
  DictionarySectionEnum,
  DictionaryStatusFilterEnum,
} from '@/views/dictionaryManagement/model/DictionaryManagement.enum.ts';
import { QuestionSortKeyEnum } from '@/views/questionBank/model/QuestionSortKey.enum.ts';
import { QuestionPageViewEnum } from '@/views/questionForm/model/QuestionPageView.enum.ts';

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
    questionPurpose: {
      [QuestionPurposeDto.Survey]: 'Ankieta',
      [QuestionPurposeDto.Test]: 'Test',
    },
    questionSource: {
      [QuestionSourceDto.Handbook]: 'Podręcznik',
      [QuestionSourceDto.Operolka]: 'Operolka',
      [QuestionSourceDto.Other]: 'Inne',
      [QuestionSourceDto.Procedure]: 'Procedura',
    },
    questionStatus: {
      ACTIVE: 'Aktywne',
      ARCHIVED: 'Zarchiwizowane',
      DRAFT: 'Szkic',
    },
    questionType: {
      [QuestionTypeDto.ExpectedAnswer]: 'Oczekiwana odpowiedź',
      [QuestionTypeDto.MultipleChoice]: 'Wielokrotny wybór',
      [QuestionTypeDto.OpenText]: 'Pytanie otwarte',
      [QuestionTypeDto.Ordering]: 'Ustalanie kolejności',
      [QuestionTypeDto.PassFail]: 'Zaliczone lub niezaliczone',
      [QuestionTypeDto.Practical]: 'Zadanie praktyczne',
      [QuestionTypeDto.SingleChoice]: 'Jednokrotny wybór',
    },
    scoringRule: {
      [ScoringRuleDto.AllOrNothing]: {
        description:
          'Punkty tylko za zaznaczenie wszystkich poprawnych odpowiedzi i żadnej błędnej.',
        label: 'Wszystko albo nic',
      },
      [ScoringRuleDto.Partial]: {
        description:
          'Punkty proporcjonalnie do zaznaczonych poprawnych odpowiedzi. Błędne zaznaczenia nic nie odejmują, więc zaznaczenie wszystkich daje komplet punktów.',
        label: 'Częściowa',
      },
      [ScoringRuleDto.PartialWithPenalty]: {
        description:
          'Każde błędne zaznaczenie odejmuje punkty. Wynik pytania nigdy nie spada poniżej zera.',
        label: 'Częściowa z karą',
      },
    },
    translationStatus: {
      [TranslationStatusDto.Approved]: 'Zatwierdzone',
      [TranslationStatusDto.Draft]: 'Szkic',
      [TranslationStatusDto.Missing]: 'Brak',
    },
    versionStatus: {
      [VersionStatusDto.Active]: 'Aktywna',
      [VersionStatusDto.Draft]: 'Szkic',
      [VersionStatusDto.Retired]: 'Wyłączona',
    },
  },
  dictionaryManagement: {
    categories: {
      actions: {
        activate: 'Włącz',
        deactivate: 'Wyłącz',
        edit: 'Edytuj',
        menu: 'Akcje dla kategorii {{name}}',
        moveDown: 'Przesuń kategorię {{name}} niżej',
        moveUp: 'Przesuń kategorię {{name}} wyżej',
      },
      activated: 'Włączono kategorię {{name}}.',
      add: 'Dodaj kategorię',
      columns: {
        actions: 'Akcje',
        name: 'Nazwa',
        order: 'Kolejność',
        prefix: 'Prefiks',
        questions: 'Pytania',
        status: 'Status',
      },
      conflict: 'Kategoria o tej nazwie lub prefiksie już istnieje. Zmień nazwę lub prefiks.',
      created: 'Dodano kategorię.',
      deactivated: 'Wyłączono kategorię {{name}}.',
      empty: {
        description: 'Dodaj pierwszą kategorię, żeby autorzy mogli ją wybrać w pytaniu.',
        title: 'Nie ma jeszcze kategorii',
      },
      form: {
        cancel: 'Anuluj',
        createTitle: 'Nowa kategoria',
        editTitle: 'Edytuj kategorię',
        name: 'Nazwa',
        prefix: 'Prefiks',
        prefixHint: 'Na przykład BHP. Po dodaniu pierwszego pytania nie będzie można go zmienić.',
        prefixLocked_few: 'Prefiksu nie można zmienić, bo kategoria ma już {{count}} pytania.',
        prefixLocked_many: 'Prefiksu nie można zmienić, bo kategoria ma już {{count}} pytań.',
        prefixLocked_one: 'Prefiksu nie można zmienić, bo kategoria ma już {{count}} pytanie.',
        save: 'Zapisz',
      },
      orderHint: 'W tej kolejności autorzy widzą kategorie w formularzu pytania.',
      prefixNotice:
        'Z prefiksu powstają klucze pytań, na przykład BHP-1. Gdy kategoria ma już pytania, prefiksu nie można zmienić.',
      reorderFailed: 'Nie udało się zmienić kolejności. Spróbuj ponownie.',
      saved: 'Zapisano zmiany.',
      status: {
        [DictionaryStatusFilterEnum.ACTIVE]: 'Aktywna',
        [DictionaryStatusFilterEnum.INACTIVE]: 'Wyłączona',
      },
      statusDialog: {
        cancel: 'Anuluj',
        confirm: 'Wyłącz',
        title: 'Wyłączyć kategorię {{name}}?',
        used_few:
          'Korzystają z niej {{count}} pytania. Zachowają ją, ale nowym pytaniom nie będzie można jej przypisać. Możesz ją później włączyć.',
        used_many:
          'Korzysta z niej {{count}} pytań. Zachowają ją, ale nowym pytaniom nie będzie można jej przypisać. Możesz ją później włączyć.',
        used_one:
          'Korzysta z niej {{count}} pytanie. Zachowa ją, ale nowym pytaniom nie będzie można jej przypisać. Możesz ją później włączyć.',
      },
      statusFailed: 'Nie udało się zmienić statusu kategorii. Spróbuj ponownie.',
      tableLabel: 'Kategorie pytań',
    },
    description: 'Kategorie, tagi i nazwy procedur, którymi autorzy opisują pytania.',
    procedureNames: {
      columns: {
        name: 'Nazwa procedury',
      },
      empty: {
        description: 'Nazwa pojawi się tutaj, gdy autor wpisze ją jako źródło pytania.',
        title: 'Nie ma jeszcze nazw procedur',
      },
      notice:
        'Nazwy procedur wpisane w pytaniach, najczęściej używane na górze. Formularz pytania podpowiada je przy wpisywaniu, żeby ta sama procedura zawsze miała tę samą nazwę.',
      search: 'Szukaj nazwy procedury',
      tableLabel: 'Nazwy procedur',
    },
    questionCount_few: '{{count}} pytania',
    questionCount_many: '{{count}} pytań',
    questionCount_one: '{{count}} pytanie',
    sections: {
      [DictionarySectionEnum.CATEGORIES]: 'Kategorie',
      [DictionarySectionEnum.PROCEDURE_NAMES]: 'Nazwy procedur',
      [DictionarySectionEnum.TAGS]: 'Tagi',
    },
    sectionsLabel: 'Słownik',
    tags: {
      actions: {
        menu: 'Akcje dla tagu {{label}}',
        merge: 'Scal z innym tagiem',
        mergeUnavailable: 'Wyłączonego tagu nie można scalić',
      },
      add: 'Dodaj tag',
      columns: {
        actions: 'Akcje',
        label: 'Tag',
        questions: 'Pytania',
        status: 'Status',
      },
      created: 'Dodano tag.',
      empty: {
        description: 'Autorzy dodają tagi przy pisaniu pytań. Tag możesz też dodać tutaj.',
        title: 'Nie ma jeszcze tagów',
      },
      form: {
        cancel: 'Anuluj',
        label: 'Nazwa tagu',
        save: 'Dodaj',
        similar: 'Podobne tagi, które już istnieją',
        title: 'Nowy tag',
      },
      merge: {
        cancel: 'Anuluj',
        confirm: 'Scal tagi',
        noOptions: 'Brak pasujących tagów',
        preview_few:
          '{{count}} pytania przejdą z tagu „{{source}}” na „{{target}}”. Tag „{{source}}” zostanie wyłączony.',
        preview_many:
          '{{count}} pytań przejdzie z tagu „{{source}}” na „{{target}}”. Tag „{{source}}” zostanie wyłączony.',
        preview_one:
          '{{count}} pytanie przejdzie z tagu „{{source}}” na „{{target}}”. Tag „{{source}}” zostanie wyłączony.',
        source: 'Tag scalany',
        target: 'Tag docelowy',
        targetPlaceholder: 'Wybierz tag, który zostaje',
        title: 'Scal tag „{{label}}”',
      },
      merged: 'Scalono tag „{{source}}” z tagiem „{{target}}”.',
      mergeFailed: 'Nie udało się scalić tagów. Spróbuj ponownie.',
      notice:
        'Tagi, które znaczą to samo, na przykład „bhp” i „b.h.p.”, scal w jeden. Pytania przejdą na wybrany tag, a scalony tag zostanie wyłączony.',
      search: 'Szukaj tagu',
      status: {
        [DictionaryStatusFilterEnum.ACTIVE]: 'Aktywny',
        [DictionaryStatusFilterEnum.INACTIVE]: 'Wyłączony',
      },
      statusFilter: {
        all: 'Wszystkie statusy',
        label: 'Status',
        options: {
          [DictionaryStatusFilterEnum.ACTIVE]: 'Aktywne',
          [DictionaryStatusFilterEnum.INACTIVE]: 'Wyłączone',
        },
      },
      tableLabel: 'Tagi pytań',
    },
    title: 'Słowniki',
  },
  questionBank: {
    actions: {
      duplicate: 'Duplikuj',
      edit: 'Edytuj',
      history: 'Historia wersji',
      menu: 'Akcje dla pytania {{key}}',
      preview: 'Podgląd jak u pracownika',
      retire: 'Wyłącz',
      retireUnavailable: 'Wyłączanie pytań nie jest jeszcze dostępne.',
      unsupportedType: 'Pytań tego typu nie można jeszcze edytować.',
    },
    addQuestion: 'Dodaj pytanie',
    columns: {
      actions: 'Akcje',
      category: 'Kategoria',
      key: 'Klucz',
      languages: 'Języki',
      positions: 'Stanowiska',
      status: 'Status',
      summary: 'Treść',
      type: 'Typ',
      updatedAt: 'Zmieniono',
      version: 'Wersja',
    },
    description:
      'Wszystkie pytania w jednym miejscu. Zawęź listę filtrami albo wyszukaj po treści.',
    empty: {
      description: 'Dodaj pierwsze pytanie, a pojawi się na tej liście.',
      title: 'Baza pytań jest pusta',
    },
    filters: {
      activeSummary: 'Zawężono do',
      all: 'Wszystkie',
      author: 'Autor',
      category: 'Kategoria',
      changedFrom: 'Zmienione od',
      changedTo: 'Zmienione do',
      clearAll: 'Wyczyść filtry',
      hide: 'Ukryj filtry',
      noTags: 'Brak pasujących tagów',
      positionCode: 'Stanowisko',
      purpose: 'Przeznaczenie',
      search: 'Treść',
      show: 'Filtry',
      showWithCount: 'Filtry ({{count}})',
      source: 'Źródło',
      status: 'Status',
      tags: 'Tagi',
      translationStatus: 'Tłumaczenie',
      type: 'Typ',
    },
    hasMedia: 'Pytanie z materiałem',
    languageStatus: '{{language}}: {{status}}',
    noSummary: 'Brak treści',
    review: 'Przegląd',
    search: {
      label: 'Szukaj w treści pytań i odpowiedzi',
      language: 'Język',
    },
    tableLabel: 'Pytania',
    title: 'Baza pytań',
  },
  questionFocus: {
    backToList: 'Wróć do listy',
    description:
      'Jedno pytanie na ekranie, tak jak zobaczy je pracownik. Strzałki przełączają pytania, Esc wraca do listy.',
    empty: {
      clearFilters: 'Wyczyść filtry',
      description: 'Dodaj pytanie, a pojawi się tutaj do przeglądu.',
      noMatchDescription: 'Zmień albo wyczyść filtry, aby zobaczyć więcej pytań.',
      noMatchTitle: 'Żadne pytanie nie pasuje do filtrów',
      title: 'Nie ma pytań do przeglądu',
    },
    navigation: {
      counter: '{{position}} z {{total}}',
      edit: 'Edytuj',
      next: 'Następne',
      previous: 'Poprzednie',
    },
    notFound: {
      description: 'Pytanie mogło zostać usunięte. Przejdź do następnego.',
      title: 'To pytanie jest już niedostępne',
    },
    sort: {
      label: 'Kolejność',
      options: {
        [QuestionSortKeyEnum.BUSINESS_KEY]: { asc: 'Klucz od A do Z', desc: 'Klucz od Z do A' },
        [QuestionSortKeyEnum.UPDATED_AT]: {
          asc: 'Najdawniej zmienione',
          desc: 'Ostatnio zmienione',
        },
        [QuestionSortKeyEnum.VERSION_NO]: { asc: 'Najniższa wersja', desc: 'Najwyższa wersja' },
      },
    },
    title: 'Przegląd pytań',
  },
  questionForm: {
    actions: {
      fixTypo: 'Popraw literówkę',
      fixTypoHint: 'Zapisuje zmiany w bieżącej wersji.',
      newVersion: 'Nowa wersja',
      newVersionHint: 'Użyj, gdy zmienia się sens pytania. Obecna wersja zostanie wyłączona.',
      saveDraft: 'Zapisz szkic',
      saveDraftHint: 'Zapisuje zmiany w tym szkicu.',
      status: {
        clean: 'Brak zmian',
        cleanDescription: 'Zmień pytanie powyżej, a potem wybierz sposób zapisu.',
        cleanDraftDescription: 'Zmień pytanie powyżej, a potem zapisz szkic.',
        dirty: 'Niezapisane zmiany',
        dirtyDescription:
          'Poprawka literówki zostaje w bieżącej wersji. Zmiana sensu pytania wymaga nowej wersji, a obecna zostanie wyłączona.',
        dirtyDraftDescription: 'Zapisz szkic, aby zachować zmiany.',
        locked: 'Ta wersja jest wyłączona',
        lockedDescription: 'Zmiany zapiszesz jako nową wersję.',
      },
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
    backToFocus: 'Wróć do przeglądu',
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
      duplicateDescription: 'Kopia pytania {{key}}. Zapisz ją jako nowy szkic.',
      title: 'Nowe pytanie',
    },
    edit: {
      activateVersion: 'Aktywuj wersję',
      history: 'Historia wersji',
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
    expectedAnswers: {
      add: 'Dodaj oczekiwaną odpowiedź',
      addDisabled: 'Pytanie może mieć najwyżej {{max}} oczekiwanych odpowiedzi.',
      answerLabel: 'Oczekiwana odpowiedź {{number}}',
      answerPlaceholder: 'Na przykład: 4',
      description:
        'Pracownik wpisuje odpowiedź, a system porównuje ją z tą listą. Wielkość liter i zbędne spacje się nie liczą, każda inna różnica już tak. Dlatego „4” i „4,0” to dwie różne odpowiedzi. Jeśli obie są poprawne, dodaj obie.',
      remove: 'Usuń oczekiwaną odpowiedź {{number}}',
      removeDisabled: 'Pytanie potrzebuje co najmniej jednej oczekiwanej odpowiedzi.',
      title: 'Oczekiwane odpowiedzi',
    },
    formPreview: {
      description:
        'Tak pytanie zobaczy pracownik, razem z niezapisanymi zmianami. Odpowiedzi w podglądzie nie są zapisywane.',
      hide: 'Ukryj podgląd',
      show: 'Podgląd',
      title: 'Podgląd',
    },
    media: {
      actions: {
        remove: 'Usuń {{name}}',
      },
      answerLabel: 'Materiał odpowiedzi {{number}}',
      deleteDialog: {
        cancel: 'Anuluj',
        confirm: 'Usuń',
        description: 'Materiał {{name}} zostanie usunięty z tej wersji pytania.',
        title: 'Usunąć materiał?',
      },
      description: 'Zdjęcie lub film, który pracownik zobaczy przy pytaniu.',
      disabled: {
        unsaved: 'Materiał dodasz po zapisaniu pytania.',
        unsavedAnswer: 'Materiał dodasz po zapisaniu tej odpowiedzi.',
      },
      dropzone: {
        answerLabel: 'Przeciągnij materiał do tej odpowiedzi albo kliknij, żeby go dodać',
        formats: 'Zdjęcie JPEG, PNG lub WebP albo film MP4',
        label: 'Przeciągnij zdjęcie lub film tutaj albo kliknij, żeby go dodać',
        limits: 'Zdjęcie do 5 MB, film do 20 MB i 90 s',
      },
      empty: 'Pytanie nie ma jeszcze materiału.',
      errors: {
        FILE_TOO_LARGE:
          'Plik ma {{actual}}, a limit to {{limit}}. Zmniejsz plik i dodaj go ponownie.',
        fileTooLargeWithoutActual:
          'Plik ma więcej niż {{limit}}. Zmniejsz plik i dodaj go ponownie.',
        fileTooLargeWithoutLimit: 'Plik jest za duży. Zdjęcie może mieć do 5 MB, a film do 20 MB.',
        forbidden: 'Nie masz uprawnień do zmiany materiału w tym pytaniu.',
        IMAGE_TOO_LARGE:
          'Dłuższy bok zdjęcia ma {{actual}} px, a limit to {{limit}} px. Zmniejsz zdjęcie i dodaj je ponownie.',
        notADraft: 'Materiał zmienisz tylko w szkicu. Utwórz nową wersję i dodaj materiał w niej.',
        outOfLimits:
          'Plik nie spełnia wymagań. Zdjęcia: JPEG, PNG lub WebP do 5 MB. Filmy: MP4 do 20 MB i 90 sekund.',
        removeFailed: 'Nie udało się usunąć materiału. Spróbuj ponownie.',
        unavailable: 'Materiały są teraz niedostępne. Spróbuj ponownie za chwilę.',
        unknown: 'Nie udało się dodać pliku. Spróbuj ponownie.',
        UNREADABLE:
          'Nie udało się odczytać pliku. Może być uszkodzony albo niepełny. Zapisz go ponownie i dodaj jeszcze raz.',
        UNSUPPORTED_TYPE:
          'Ten format pliku nie jest obsługiwany. Dodaj zdjęcie JPEG, PNG lub WebP albo film MP4.',
        unsupportedHeic:
          'Zdjęcia HEIC z telefonu nie są obsługiwane. Zapisz zdjęcie jako JPEG i dodaj je ponownie.',
        unsupportedQuickTime:
          'Filmy MOV nie są obsługiwane. Zapisz film jako MP4 i dodaj go ponownie.',
        VIDEO_CODEC_UNSUPPORTED:
          'Przeglądarka nie odtworzy tego filmu. Zapisz go jako MP4 z obrazem H.264 i dźwiękiem AAC, a potem dodaj ponownie.',
        VIDEO_NOT_FASTSTART:
          'Film musi się pobrać w całości, zanim ruszy. Wyeksportuj go z włączoną opcją Fast start lub Optymalizuj dla sieci i dodaj ponownie.',
        VIDEO_RESOLUTION_TOO_HIGH:
          'Film ma rozdzielczość {{actual}}p, a limit to {{limit}}p. Wyeksportuj go w niższej jakości i dodaj ponownie.',
        VIDEO_TOO_LONG:
          'Film trwa {{actual}}, a limit to {{limit}}. Skróć film i dodaj go ponownie.',
      },
      kind: {
        IMAGE: 'Zdjęcie',
        VIDEO: 'Film',
      },
      notifications: {
        removed: 'Usunięto materiał.',
        uploaded: 'Dodano materiał.',
      },
      readOnly: {
        description:
          'Materiał zmienia się tylko w szkicu, żeby pracownicy widzieli to samo co w teście. Aby go zmienić, utwórz nową wersję.',
        title: 'Materiał zmienisz w nowej wersji',
      },
      title: 'Materiał',
      units: {
        dimensions: '{{width}} × {{height}} px',
        megabytes: '{{value}} MB',
        minutes: '{{minutes}} min',
        minutesSeconds: '{{minutes}} min {{seconds}} s',
        seconds: '{{seconds}} s',
      },
      uploading: 'Dodawanie materiału {{name}}',
    },
    newVersionDialog: {
      cancel: 'Anuluj',
      confirm: 'Utwórz nową wersję',
      description:
        'Obecna wersja zostanie wyłączona. Jeśli poprawiasz tylko literówkę, wybierz Popraw literówkę.',
      title: 'Utworzyć nową wersję?',
    },
    notifications: {
      activated: 'Wersja jest teraz aktywna.',
      classificationSaved: 'Zapisano klasyfikację.',
      created: 'Zapisano szkic.',
      typoFixed: 'Zapisano poprawkę.',
      versionCreated: 'Utworzono nową wersję.',
    },
    page: {
      title: 'Pytanie {{key}}',
      views: {
        [QuestionPageViewEnum.EDIT]: 'Edycja',
        [QuestionPageViewEnum.HISTORY]: 'Historia wersji',
      },
      viewsLabel: 'Widok pytania',
    },
    scoring: {
      description: 'Ile punktów jest warte pytanie i jak się je liczy.',
      expectedAnswerRule:
        'Pytanie daje komplet punktów, gdy odpowiedź zgadza się z którąkolwiek oczekiwaną odpowiedzią, a w przeciwnym razie zero.',
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
      expectedAnswers:
        'Sprawdź oczekiwane odpowiedzi. Każda musi mieć treść i może wystąpić tylko raz.',
      maxPoints: 'Wpisz liczbę punktów większą od zera.',
      positionCodes: 'Sprawdź wybrane stanowiska.',
      scoringRule: 'Wybierz regułę punktacji.',
      source: 'Wybierz źródło.',
      sourceName: 'Sprawdź nazwę źródła.',
      tags: 'Sprawdź wybrane tagi.',
    },
    translations: {
      answers: 'Odpowiedzi',
      description: 'Stan pytania w każdym języku.',
      missing: 'Brak tłumaczenia.',
      sourceLanguage: 'Język źródłowy. Treść edytujesz w sekcji Treść powyżej.',
      title: 'Tłumaczenia',
    },
  },
  questionHistory: {
    classification: {
      description:
        'Zmiany kategorii, źródła, tagów i stanowisk. Dotyczą pytania, a nie jednej wersji.',
      empty: 'Klasyfikacja nie zmieniła się od utworzenia pytania.',
      title: 'Klasyfikacja',
    },
    compare: {
      answers: 'Odpowiedzi',
      body: 'Treść',
      expectedAnswers: 'Oczekiwane odpowiedzi',
      explanation: 'Wyjaśnienie po teście',
      from: 'Wersja wcześniejsza',
      maxPoints: 'Liczba punktów',
      needTwo: 'Pytanie ma tylko jedną wersję, więc nie ma czego porównać.',
      noChanges: 'Te wersje mają taką samą treść, odpowiedzi i punktację.',
      scoringRule: 'Reguła punktacji',
      to: 'Wersja późniejsza',
    },
    created: 'Utworzono {{date}}, autor: {{author}}',
    description: 'Najnowsza wersja jest na górze, każda z listą zmian.',
    eventMeta: '{{date}}, {{author}}',
    events: {
      [HistoryEventKindDto.ClassificationChanged]: 'Zmieniono klasyfikację',
      [HistoryEventKindDto.Corrected]: 'Poprawiono w miejscu',
      [HistoryEventKindDto.Created]: 'Utworzono wersję',
      [HistoryEventKindDto.MediaAdded]: 'Dodano materiał',
      [HistoryEventKindDto.MediaRemoved]: 'Usunięto materiał',
      [HistoryEventKindDto.ReviewChanged]: 'Zmieniono oznaczenie do przeglądu',
      [HistoryEventKindDto.StatusChanged]: 'Zmieniono status',
    },
    fields: {
      answer: 'Odpowiedź',
      'answer.body': 'Treść odpowiedzi',
      'answer.correctOrder': 'Miejsce w poprawnej kolejności',
      'answer.displayOrder': 'Kolejność odpowiedzi',
      'answer.isCorrect': 'Poprawna odpowiedź',
      'answer.points': 'Punkty za odpowiedź',
      answerKey: 'Klucz dla egzaminatora',
      body: 'Treść',
      category: 'Kategoria',
      examinerCommentRequired: 'Wymagany komentarz egzaminatora',
      expectedAnswers: 'Oczekiwane odpowiedzi',
      explanation: 'Wyjaśnienie po teście',
      maxPoints: 'Liczba punktów',
      media: 'Materiał',
      positionCodes: 'Stanowiska',
      scaleMax: 'Górna granica skali',
      scoringRule: 'Reguła punktacji',
      source: 'Źródło',
      sourceName: 'Nazwa źródła',
      status: 'Status',
      tags: 'Tagi',
      topics: 'Tematy',
      topicsToPick: 'Liczba tematów do wyboru',
    },
    notFound: {
      description: 'Link mógł stracić ważność. Wróć do bazy pytań i otwórz pytanie z listy.',
      title: 'Nie znaleziono pytania',
    },
    otherField: 'Inna zmiana',
    panel: {
      compare: 'Porównanie',
      description: 'Treść dokładnie taka, jaka obowiązywała w tej wersji.',
      modeLabel: 'Widok wersji',
      preview: 'Podgląd',
      title: 'Wersja {{number}}',
    },
    preview: {
      answers: 'Odpowiedzi',
      body: 'Treść',
      correct: 'Poprawna',
      expectedAnswers: 'Oczekiwane odpowiedzi',
      explanation: 'Wyjaśnienie po teście',
      maxPoints: 'Liczba punktów',
      scoringRule: 'Reguła punktacji',
    },
    readOnly:
      'Historii nie można zmienić. Aby wrócić do starszej treści, utwórz nową wersję w formularzu pytania.',
    retired: 'Wyłączono {{date}}',
    title: 'Historia pytania',
    values: {
      added: 'Dodano',
      correct: 'poprawna',
      empty: 'brak',
      incorrect: 'niepoprawna',
      item: 'element',
      no: 'nie',
      removed: 'Usunięto',
      yes: 'tak',
    },
    versionLabel: 'Wersja {{number}}',
    versions: {
      description: 'Wybierz wersję, aby zobaczyć jej treść.',
      title: 'Wersje',
    },
  },
};
