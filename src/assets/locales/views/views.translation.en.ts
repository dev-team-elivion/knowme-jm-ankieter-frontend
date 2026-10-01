import {
  BulkOperationDto,
  HistoryEventKindDto,
  QuestionPurposeDto,
  QuestionSourceDto,
  QuestionTypeDto,
  ScoringRuleDto,
  TranslationStatusDto,
  VersionStatusDto,
} from '@/api/generated';
import { SortDirection } from '@/components/dataTable/model/DataTable.model.ts';
import {
  DictionarySectionEnum,
  DictionaryStatusFilterEnum,
} from '@/views/dictionaryManagement/model/DictionaryManagement.enum.ts';
import { QuestionSortKeyEnum } from '@/views/questionBank/model/QuestionSortKey.enum.ts';
import { QuestionPageViewEnum } from '@/views/questionForm/model/QuestionPageView.enum.ts';
import { HistoryField } from '@/views/questionHistory/model/HistoryField.model.ts';
export type ViewsTranslation = {
  comingSoon: {
    description: string;
    goToDashboard: string;
    hint: string;
    statusLabel: string;
  };
  devPatterns: {
    description: string;
    form: {
      description: string;
      fields: {
        category: string;
        content: string;
        contentPlaceholder: string;
        email: string;
        emailPlaceholder: string;
      };
      reset: string;
      savedMessage: string;
      simulateServerError: string;
      submit: string;
      title: string;
    };
    notifications: {
      description: string;
      errorMessage: string;
      showError: string;
      showSuccess: string;
      successMessage: string;
      title: string;
    };
    states: {
      calloutBody: string;
      calloutTitle: string;
      description: string;
      emptyLabel: string;
      errorLabel: string;
      loadingLabel: string;
      title: string;
    };
    table: {
      columns: {
        category: string;
        code: string;
        content: string;
        status: string;
        updatedAt: string;
      };
      description: string;
      filters: {
        allCategories: string;
        allStatuses: string;
        category: string;
        search: string;
        status: string;
      };
      showEmptyDataset: string;
      title: string;
    };
    title: string;
  };
  dictionaries: {
    questionCategory: {
      COMMUNICATION: string;
      CUSTOMER_SERVICE: string;
      FOOD_SAFETY: string;
      OCCUPATIONAL_SAFETY: string;
    };
    questionPurpose: Record<QuestionPurposeDto, string>;
    questionSource: Record<QuestionSourceDto, string>;
    questionStatus: {
      ACTIVE: string;
      ARCHIVED: string;
      DRAFT: string;
    };
    questionType: Record<QuestionTypeDto, string>;
    scoringRule: Record<ScoringRuleDto, ScoringRuleTranslation>;
    translationStatus: Record<TranslationStatusDto, string>;
    versionStatus: Record<VersionStatusDto, string>;
  };
  dictionaryManagement: {
    categories: {
      actions: {
        activate: string;
        deactivate: string;
        edit: string;
        menu: string;
        moveDown: string;
        moveUp: string;
      };
      activated: string;
      add: string;
      columns: {
        actions: string;
        name: string;
        order: string;
        prefix: string;
        questions: string;
        status: string;
      };
      conflict: string;
      created: string;
      deactivated: string;
      empty: {
        description: string;
        title: string;
      };
      form: {
        cancel: string;
        createTitle: string;
        editTitle: string;
        name: string;
        prefix: string;
        prefixHint: string;
        prefixLocked_few?: string;
        prefixLocked_many?: string;
        prefixLocked_one: string;
        prefixLocked_other?: string;
        save: string;
      };
      orderHint: string;
      prefixNotice: string;
      reorderFailed: string;
      saved: string;
      status: Record<DictionaryStatusFilterEnum, string>;
      statusDialog: {
        cancel: string;
        confirm: string;
        title: string;
        used_few?: string;
        used_many?: string;
        used_one: string;
        used_other?: string;
      };
      statusFailed: string;
      tableLabel: string;
    };
    description: string;
    procedureNames: {
      columns: {
        name: string;
      };
      empty: {
        description: string;
        title: string;
      };
      notice: string;
      search: string;
      tableLabel: string;
    };
    questionCount_few?: string;
    questionCount_many?: string;
    questionCount_one: string;
    questionCount_other?: string;
    sections: Record<DictionarySectionEnum, string>;
    sectionsLabel: string;
    tags: {
      actions: {
        menu: string;
        merge: string;
        mergeUnavailable: string;
      };
      add: string;
      columns: {
        actions: string;
        label: string;
        questions: string;
        status: string;
      };
      created: string;
      empty: {
        description: string;
        title: string;
      };
      form: {
        cancel: string;
        label: string;
        save: string;
        similar: string;
        title: string;
      };
      merge: {
        cancel: string;
        confirm: string;
        noOptions: string;
        preview_few?: string;
        preview_many?: string;
        preview_one: string;
        preview_other?: string;
        source: string;
        target: string;
        targetPlaceholder: string;
        title: string;
      };
      merged: string;
      mergeFailed: string;
      notice: string;
      search: string;
      status: Record<DictionaryStatusFilterEnum, string>;
      statusFilter: {
        all: string;
        label: string;
        options: Record<DictionaryStatusFilterEnum, string>;
      };
      tableLabel: string;
    };
    title: string;
  };
  questionBank: {
    actions: {
      duplicate: string;
      edit: string;
      history: string;
      menu: string;
      preview: string;
      retire: string;
      retireNoActiveVersion: string;
      unsupportedType: string;
    };
    addQuestion: string;
    bulk: {
      back: string;
      cancel: string;
      change: {
        addTags: string;
        clearReview: string;
        markForReview: string;
        markForReviewWithReason: string;
        removeTags: string;
        retire: string;
        setCategory: string;
      };
      clear: string;
      done_few?: string;
      done_many?: string;
      done_one: string;
      done_other?: string;
      errors: {
        applyFailed: string;
        changedSincePreview: string;
      };
      next: string;
      operations: Record<BulkOperationDto, string>;
      params: {
        category: string;
        categoryPlaceholder: string;
        noTags: string;
        reason: string;
        reasonPlaceholder: string;
        tags: string;
      };
      preview: {
        affected_few?: string;
        affected_many?: string;
        affected_one: string;
        affected_other?: string;
        large: {
          description: string;
          label: string;
          title: string;
        };
        more: string;
        nothingToChange: string;
        sample: string;
        skipped_few?: string;
        skipped_many?: string;
        skipped_one: string;
        skipped_other?: string;
      };
      selectAllMatching: string;
      selected_few?: string;
      selected_many?: string;
      selected_one: string;
      selected_other?: string;
      selectedAllMatching_few?: string;
      selectedAllMatching_many?: string;
      selectedAllMatching_one: string;
      selectedAllMatching_other?: string;
      selectPage: string;
      selectRow: string;
    };
    columns: {
      actions: string;
      category: string;
      key: string;
      languages: string;
      positions: string;
      status: string;
      summary: string;
      type: string;
      updatedAt: string;
      version: string;
    };
    description: string;
    empty: {
      description: string;
      title: string;
    };
    filters: {
      activeSummary: string;
      all: string;
      author: string;
      category: string;
      changedFrom: string;
      changedTo: string;
      clearAll: string;
      hide: string;
      noTags: string;
      positionCode: string;
      purpose: string;
      search: string;
      show: string;
      showWithCount: string;
      source: string;
      status: string;
      tags: string;
      translationStatus: string;
      type: string;
    };
    hasMedia: string;
    languageStatus: string;
    noSummary: string;
    retireDialog: {
      cancel: string;
      confirm: string;
      description: string;
      done: string;
      failed: string;
      title: string;
    };
    review: string;
    search: {
      label: string;
      language: string;
    };
    tableLabel: string;
    title: string;
  };
  questionFocus: {
    backToList: string;
    description: string;
    empty: {
      clearFilters: string;
      description: string;
      noMatchDescription: string;
      noMatchTitle: string;
      title: string;
    };
    navigation: {
      counter: string;
      edit: string;
      next: string;
      previous: string;
    };
    notFound: {
      description: string;
      title: string;
    };
    sort: {
      label: string;
      options: Record<QuestionSortKeyEnum, Record<SortDirection, string>>;
    };
    title: string;
  };
  questionForm: {
    actions: {
      fixTypo: string;
      fixTypoHint: string;
      newVersion: string;
      newVersionHint: string;
      saveDraft: string;
      saveDraftHint: string;
      status: {
        clean: string;
        cleanDescription: string;
        cleanDraftDescription: string;
        dirty: string;
        dirtyDescription: string;
        dirtyDraftDescription: string;
        locked: string;
        lockedDescription: string;
      };
    };
    answers: {
      add: string;
      answerLabel: string;
      answerPlaceholder: string;
      descriptionMultiple: string;
      descriptionSingle: string;
      descriptionSurvey: string;
      markCorrect: string;
      moveDown: string;
      moveUp: string;
      remove: string;
      removeDisabled: string;
      title: string;
    };
    backToBank: string;
    backToFocus: string;
    classification: {
      addTag: string;
      businessKey: string;
      businessKeyAuto: string;
      businessKeyAutoNoCategory: string;
      businessKeyManual: string;
      businessKeyManualHelper: string;
      categoriesUnavailable: string;
      category: string;
      categoryPlaceholder: string;
      description: string;
      noTags: string;
      positionCodes: string;
      positionCodesPlaceholder: string;
      source: string;
      sourceName: string;
      sourceNamePlaceholder: string;
      sourcePlaceholder: string;
      tagCreateError: string;
      tags: string;
      tagsPlaceholder: string;
      tagsUnavailable: string;
      title: string;
    };
    content: {
      body: string;
      bodyPlaceholder: string;
      description: string;
      explanation: string;
      explanationHelper: string;
      title: string;
      type: string;
      typeLocked: string;
    };
    create: {
      description: string;
      duplicateDescription: string;
      title: string;
    };
    edit: {
      activateVersion: string;
      history: string;
      noEditableVersion: {
        description: string;
        title: string;
      };
      notFound: {
        description: string;
        title: string;
      };
      title: string;
      unsupportedType: {
        description: string;
        title: string;
      };
      versionLabel: string;
    };
    errors: {
      activateFailed: string;
      conflict: string;
      forbidden: string;
      keyTaken: string;
      notFound: string;
    };
    expectedAnswers: {
      add: string;
      addDisabled: string;
      answerLabel: string;
      answerPlaceholder: string;
      description: string;
      remove: string;
      removeDisabled: string;
      title: string;
    };
    formPreview: {
      description: string;
      hide: string;
      show: string;
      title: string;
    };
    media: {
      actions: {
        remove: string;
      };
      answerLabel: string;
      deleteDialog: {
        cancel: string;
        confirm: string;
        description: string;
        title: string;
      };
      description: string;
      disabled: {
        unsaved: string;
        unsavedAnswer: string;
      };
      dropzone: {
        answerLabel: string;
        formats: string;
        label: string;
        limits: string;
      };
      empty: string;
      errors: {
        FILE_TOO_LARGE: string;
        fileTooLargeWithoutActual: string;
        fileTooLargeWithoutLimit: string;
        forbidden: string;
        IMAGE_TOO_LARGE: string;
        notADraft: string;
        outOfLimits: string;
        removeFailed: string;
        unavailable: string;
        unknown: string;
        UNREADABLE: string;
        UNSUPPORTED_TYPE: string;
        unsupportedHeic: string;
        unsupportedQuickTime: string;
        VIDEO_CODEC_UNSUPPORTED: string;
        VIDEO_NOT_FASTSTART: string;
        VIDEO_RESOLUTION_TOO_HIGH: string;
        VIDEO_TOO_LONG: string;
      };
      kind: {
        IMAGE: string;
        VIDEO: string;
      };
      notifications: {
        removed: string;
        uploaded: string;
      };
      readOnly: {
        description: string;
        title: string;
      };
      title: string;
      units: {
        dimensions: string;
        megabytes: string;
        minutes: string;
        minutesSeconds: string;
        seconds: string;
      };
      uploading: string;
    };
    newVersionDialog: {
      cancel: string;
      confirm: string;
      description: string;
      title: string;
    };
    notifications: {
      activated: string;
      classificationSaved: string;
      created: string;
      typoFixed: string;
      versionCreated: string;
    };
    page: {
      title: string;
      views: Record<QuestionPageViewEnum, string>;
      viewsLabel: string;
    };
    scoring: {
      description: string;
      expectedAnswerRule: string;
      maxPoints: string;
      scoringRule: string;
      singleChoiceRule: string;
      title: string;
    };
    serverErrors: {
      answerBody: string;
      answers: string;
      answersCorrect: string;
      body: string;
      businessKey: string;
      categoryId: string;
      expectedAnswers: string;
      maxPoints: string;
      positionCodes: string;
      scoringRule: string;
      source: string;
      sourceName: string;
      tags: string;
    };
    translations: {
      answers: string;
      description: string;
      missing: string;
      sourceLanguage: string;
      title: string;
    };
  };
  questionHistory: {
    classification: {
      description: string;
      empty: string;
      title: string;
    };
    compare: {
      answers: string;
      body: string;
      expectedAnswers: string;
      explanation: string;
      from: string;
      maxPoints: string;
      needTwo: string;
      noChanges: string;
      scoringRule: string;
      to: string;
    };
    created: string;
    description: string;
    eventMeta: string;
    events: Record<HistoryEventKindDto, string>;
    fields: Record<HistoryField, string>;
    notFound: {
      description: string;
      title: string;
    };
    otherField: string;
    panel: {
      compare: string;
      description: string;
      modeLabel: string;
      preview: string;
      title: string;
    };
    preview: {
      answers: string;
      body: string;
      correct: string;
      expectedAnswers: string;
      explanation: string;
      maxPoints: string;
      scoringRule: string;
    };
    readOnly: string;
    retired: string;
    title: string;
    values: {
      added: string;
      correct: string;
      empty: string;
      incorrect: string;
      item: string;
      no: string;
      removed: string;
      yes: string;
    };
    versionLabel: string;
    versions: {
      description: string;
      title: string;
    };
  };
};

type ScoringRuleTranslation = {
  description: string;
  label: string;
};

export const viewsTranslation: ViewsTranslation = {
  comingSoon: {
    description: 'This module is being built. It will appear here in one of the next releases.',
    goToDashboard: 'Go to dashboard',
    hint: 'Other modules are available in the menu on the left.',
    statusLabel: 'Coming soon',
  },
  devPatterns: {
    description:
      'A screen for the team. It shows the shared components on local sample data, without a server connection.',
    form: {
      description:
        'Validation runs in the browser first. Errors returned by the server are shown next to the matching fields.',
      fields: {
        category: 'Category',
        content: 'Question content',
        contentPlaceholder: 'For example: How should chilled goods be stored?',
        email: 'Author email',
        emailPlaceholder: 'name@company.com',
      },
      reset: 'Clear form',
      savedMessage: 'Question saved.',
      simulateServerError: 'Simulate a rejection from the server',
      submit: 'Save question',
      title: 'Form',
    },
    notifications: {
      description: 'Short confirmations disappear on their own. Errors stay until closed.',
      errorMessage: 'Changes could not be saved. Try again.',
      showError: 'Show error',
      showSuccess: 'Show confirmation',
      successMessage: 'Changes saved.',
      title: 'Notifications',
    },
    states: {
      calloutBody: 'Use this block for information that helps, but does not block the work.',
      calloutTitle: 'Info notice',
      description:
        'Every list has three states besides the data itself. Each has its own component.',
      emptyLabel: 'Empty',
      errorLabel: 'Error',
      loadingLabel: 'Loading',
      title: 'Screen states',
    },
    table: {
      columns: {
        category: 'Category',
        code: 'Code',
        content: 'Content',
        status: 'Status',
        updatedAt: 'Updated',
      },
      description:
        'Paging, sorting and filtering are passed to the data source as one query, and kept in the address so the view can be shared.',
      filters: {
        allCategories: 'All categories',
        allStatuses: 'All statuses',
        category: 'Category',
        search: 'Search questions',
        status: 'Status',
      },
      showEmptyDataset: 'Show an empty list',
      title: 'Table',
    },
    title: 'UI patterns',
  },
  dictionaries: {
    questionCategory: {
      COMMUNICATION: 'Communication',
      CUSTOMER_SERVICE: 'Customer service',
      FOOD_SAFETY: 'Food safety',
      OCCUPATIONAL_SAFETY: 'Occupational safety',
    },
    questionPurpose: {
      [QuestionPurposeDto.Survey]: 'Survey',
      [QuestionPurposeDto.Test]: 'Test',
    },
    questionSource: {
      [QuestionSourceDto.Handbook]: 'Handbook',
      [QuestionSourceDto.Operolka]: 'Operolka',
      [QuestionSourceDto.Other]: 'Other',
      [QuestionSourceDto.Procedure]: 'Procedure',
    },
    questionStatus: {
      ACTIVE: 'Active',
      ARCHIVED: 'Archived',
      DRAFT: 'Draft',
    },
    questionType: {
      [QuestionTypeDto.ExpectedAnswer]: 'Expected answer',
      [QuestionTypeDto.MultipleChoice]: 'Multiple choice',
      [QuestionTypeDto.OpenText]: 'Open question',
      [QuestionTypeDto.Ordering]: 'Put in order',
      [QuestionTypeDto.PassFail]: 'Pass or fail',
      [QuestionTypeDto.Practical]: 'Practical task',
      [QuestionTypeDto.SingleChoice]: 'Single choice',
    },
    scoringRule: {
      [ScoringRuleDto.AllOrNothing]: {
        description: 'Points only for every correct answer ticked and no wrong one.',
        label: 'All or nothing',
      },
      [ScoringRuleDto.Partial]: {
        description:
          'Points in proportion to the correct answers ticked. Wrong ticks cost nothing, so ticking everything scores full points.',
        label: 'Partial',
      },
      [ScoringRuleDto.PartialWithPenalty]: {
        description: 'Each wrong tick takes points away. The question never scores below zero.',
        label: 'Partial with penalty',
      },
    },
    translationStatus: {
      [TranslationStatusDto.Approved]: 'Approved',
      [TranslationStatusDto.Draft]: 'Draft',
      [TranslationStatusDto.Missing]: 'Missing',
    },
    versionStatus: {
      [VersionStatusDto.Active]: 'Active',
      [VersionStatusDto.Draft]: 'Draft',
      [VersionStatusDto.Retired]: 'Retired',
    },
  },
  dictionaryManagement: {
    categories: {
      actions: {
        activate: 'Turn on',
        deactivate: 'Turn off',
        edit: 'Edit',
        menu: 'Actions for category {{name}}',
        moveDown: 'Move category {{name}} down',
        moveUp: 'Move category {{name}} up',
      },
      activated: 'Category {{name}} is turned on.',
      add: 'Add category',
      columns: {
        actions: 'Actions',
        name: 'Name',
        order: 'Order',
        prefix: 'Prefix',
        questions: 'Questions',
        status: 'Status',
      },
      conflict:
        'A category with this name or prefix already exists. Change the name or the prefix.',
      created: 'Category added.',
      deactivated: 'Category {{name}} is turned off.',
      empty: {
        description: 'Add the first category so authors can choose it for a question.',
        title: 'No categories yet',
      },
      form: {
        cancel: 'Cancel',
        createTitle: 'New category',
        editTitle: 'Edit category',
        name: 'Name',
        prefix: 'Prefix',
        prefixHint: 'For example BHP. It cannot be changed once the category has a question.',
        prefixLocked_one:
          'The prefix cannot be changed because the category already has {{count}} question.',
        prefixLocked_other:
          'The prefix cannot be changed because the category already has {{count}} questions.',
        save: 'Save',
      },
      orderHint: 'Authors see categories in this order in the question form.',
      prefixNotice:
        'Question keys are built from the prefix, for example BHP-1. Once a category has questions, its prefix cannot be changed.',
      reorderFailed: 'The order could not be changed. Try again.',
      saved: 'Changes saved.',
      status: {
        [DictionaryStatusFilterEnum.ACTIVE]: 'Active',
        [DictionaryStatusFilterEnum.INACTIVE]: 'Turned off',
      },
      statusDialog: {
        cancel: 'Cancel',
        confirm: 'Turn off',
        title: 'Turn off category {{name}}?',
        used_one:
          '{{count}} question uses it and keeps it, but new questions cannot be assigned to it. You can turn it on again later.',
        used_other:
          '{{count}} questions use it and keep it, but new questions cannot be assigned to it. You can turn it on again later.',
      },
      statusFailed: 'The category status could not be changed. Try again.',
      tableLabel: 'Question categories',
    },
    description: 'Categories, tags and procedure names that authors use to describe questions.',
    procedureNames: {
      columns: {
        name: 'Procedure name',
      },
      empty: {
        description: 'A name appears here once an author enters it as the source of a question.',
        title: 'No procedure names yet',
      },
      notice:
        'Procedure names entered in questions, most used first. The question form suggests them while typing, so the same procedure always has the same name.',
      search: 'Search procedure names',
      tableLabel: 'Procedure names',
    },
    questionCount_one: '{{count}} question',
    questionCount_other: '{{count}} questions',
    sections: {
      [DictionarySectionEnum.CATEGORIES]: 'Categories',
      [DictionarySectionEnum.PROCEDURE_NAMES]: 'Procedure names',
      [DictionarySectionEnum.TAGS]: 'Tags',
    },
    sectionsLabel: 'Dictionary',
    tags: {
      actions: {
        menu: 'Actions for tag {{label}}',
        merge: 'Merge into another tag',
        mergeUnavailable: 'A turned off tag cannot be merged',
      },
      add: 'Add tag',
      columns: {
        actions: 'Actions',
        label: 'Tag',
        questions: 'Questions',
        status: 'Status',
      },
      created: 'Tag added.',
      empty: {
        description: 'Authors add tags while writing questions. You can also add one here.',
        title: 'No tags yet',
      },
      form: {
        cancel: 'Cancel',
        label: 'Tag name',
        save: 'Add',
        similar: 'Similar tags that already exist',
        title: 'New tag',
      },
      merge: {
        cancel: 'Cancel',
        confirm: 'Merge tags',
        noOptions: 'No matching tags',
        preview_one:
          '{{count}} question moves from tag “{{source}}” to “{{target}}”. Tag “{{source}}” will be turned off.',
        preview_other:
          '{{count}} questions move from tag “{{source}}” to “{{target}}”. Tag “{{source}}” will be turned off.',
        source: 'Tag to merge',
        target: 'Target tag',
        targetPlaceholder: 'Choose the tag that stays',
        title: 'Merge tag “{{label}}”',
      },
      merged: 'Tag “{{source}}” merged into “{{target}}”.',
      mergeFailed: 'The tags could not be merged. Try again.',
      notice:
        'Merge tags that mean the same thing, for example “bhp” and “b.h.p.”. Questions move to the tag you choose and the merged tag is turned off.',
      search: 'Search tags',
      status: {
        [DictionaryStatusFilterEnum.ACTIVE]: 'Active',
        [DictionaryStatusFilterEnum.INACTIVE]: 'Turned off',
      },
      statusFilter: {
        all: 'All statuses',
        label: 'Status',
        options: {
          [DictionaryStatusFilterEnum.ACTIVE]: 'Active',
          [DictionaryStatusFilterEnum.INACTIVE]: 'Turned off',
        },
      },
      tableLabel: 'Question tags',
    },
    title: 'Dictionaries',
  },
  questionBank: {
    actions: {
      duplicate: 'Duplicate',
      edit: 'Edit',
      history: 'Version history',
      menu: 'Actions for question {{key}}',
      preview: 'Preview as an employee',
      retire: 'Retire',
      retireNoActiveVersion: 'The question has no version in use.',
      unsupportedType: 'Questions of this type cannot be edited yet.',
    },
    addQuestion: 'Add question',
    bulk: {
      back: 'Back',
      cancel: 'Cancel',
      change: {
        addTags: 'Tags to add: {{tags}}. The questions keep their current version.',
        clearReview: 'The review mark will be removed.',
        markForReview: 'The questions will be marked for review.',
        markForReviewWithReason: 'The questions will be marked for review. Reason: {{reason}}',
        removeTags: 'Tags to remove: {{tags}}. The questions keep their current version.',
        retire:
          'The versions in use will be retired and the questions will stop appearing in tests. Retired versions stay in the history.',
        setCategory: 'New category: {{category}}. The questions keep their current version.',
      },
      clear: 'Clear selection',
      done_one: '{{count}} question changed.',
      done_other: '{{count}} questions changed.',
      errors: {
        applyFailed: 'The change could not be made. Try again.',
        changedSincePreview:
          'The questions changed since the preview. Check the new numbers and confirm again.',
      },
      next: 'Next',
      operations: {
        [BulkOperationDto.AddTags]: 'Add tag',
        [BulkOperationDto.ClearReview]: 'Remove review mark',
        [BulkOperationDto.MarkForReview]: 'Mark for review',
        [BulkOperationDto.RemoveTags]: 'Remove tag',
        [BulkOperationDto.Retire]: 'Retire',
        [BulkOperationDto.SetCategory]: 'Change category',
      },
      params: {
        category: 'Category',
        categoryPlaceholder: 'Choose a category',
        noTags: 'No matching tags',
        reason: 'Reason (optional)',
        reasonPlaceholder: 'What should the reviewer look at',
        tags: 'Tags',
      },
      preview: {
        affected_one: '{{count}} question will change',
        affected_other: '{{count}} questions will change',
        large: {
          description:
            'This changes {{count}} questions at once. Make sure the selection is the one you mean.',
          label: 'Type {{count}} to confirm',
          title: 'Large change',
        },
        more: 'and {{count}} more',
        nothingToChange: 'Nothing will change. The selected questions are already in this state.',
        sample: 'Example questions',
        skipped_one: '{{count}} question stays as it is.',
        skipped_other: '{{count}} questions stay as they are.',
      },
      selectAllMatching: 'Select all {{count}} matching the filters',
      selected_one: '{{count}} question selected',
      selected_other: '{{count}} questions selected',
      selectedAllMatching_one: '{{count}} question matching the filters selected',
      selectedAllMatching_other: 'All {{count}} questions matching the filters selected',
      selectPage: 'Select questions on this page',
      selectRow: 'Select question {{key}}',
    },
    columns: {
      actions: 'Actions',
      category: 'Category',
      key: 'Key',
      languages: 'Languages',
      positions: 'Positions',
      status: 'Status',
      summary: 'Question',
      type: 'Type',
      updatedAt: 'Changed',
      version: 'Version',
    },
    description: 'Every question in one place. Narrow the list with filters or search the text.',
    empty: {
      description: 'Add the first question and it will appear here.',
      title: 'The question bank is empty',
    },
    filters: {
      activeSummary: 'Narrowed by',
      all: 'All',
      author: 'Author',
      category: 'Category',
      changedFrom: 'Changed from',
      changedTo: 'Changed to',
      clearAll: 'Clear filters',
      hide: 'Hide filters',
      noTags: 'No matching tags',
      positionCode: 'Position',
      purpose: 'Purpose',
      search: 'Text',
      show: 'Filters',
      showWithCount: 'Filters ({{count}})',
      source: 'Source',
      status: 'Status',
      tags: 'Tags',
      translationStatus: 'Translation',
      type: 'Type',
    },
    hasMedia: 'Question with media',
    languageStatus: '{{language}}: {{status}}',
    noSummary: 'No text yet',
    retireDialog: {
      cancel: 'Cancel',
      confirm: 'Retire',
      description:
        'The question will stop appearing in tests. The retired version stays in its history.',
      done: 'Question {{key}} was retired.',
      failed: 'The question could not be retired. Try again.',
      title: 'Retire question {{key}}?',
    },
    review: 'Review',
    search: {
      label: 'Search question and answer text',
      language: 'Language',
    },
    tableLabel: 'Questions',
    title: 'Question bank',
  },
  questionFocus: {
    backToList: 'Back to the list',
    description:
      'One question at a time, as an employee sees it. Use the arrow keys to move and Esc to go back to the list.',
    empty: {
      clearFilters: 'Clear filters',
      description: 'Add a question and you can review it here.',
      noMatchDescription: 'Change or clear the filters to see more questions.',
      noMatchTitle: 'No question matches the filters',
      title: 'There are no questions to review',
    },
    navigation: {
      counter: '{{position}} of {{total}}',
      edit: 'Edit',
      next: 'Next',
      previous: 'Previous',
    },
    notFound: {
      description: 'The question may have been removed. Move to the next one.',
      title: 'This question is no longer available',
    },
    sort: {
      label: 'Order',
      options: {
        [QuestionSortKeyEnum.BUSINESS_KEY]: { asc: 'Key A to Z', desc: 'Key Z to A' },
        [QuestionSortKeyEnum.UPDATED_AT]: {
          asc: 'Changed earliest',
          desc: 'Changed most recently',
        },
        [QuestionSortKeyEnum.VERSION_NO]: { asc: 'Lowest version', desc: 'Highest version' },
      },
    },
    title: 'Question review',
  },
  questionForm: {
    actions: {
      fixTypo: 'Fix a typo',
      fixTypoHint: 'Saves the changes in the current version.',
      newVersion: 'New version',
      newVersionHint: 'Use it when the meaning changes. The current version is retired.',
      saveDraft: 'Save draft',
      saveDraftHint: 'Saves the changes in this draft.',
      status: {
        clean: 'No changes',
        cleanDescription: 'Edit the question above, then choose how to save it.',
        cleanDraftDescription: 'Edit the question above, then save the draft.',
        dirty: 'Unsaved changes',
        dirtyDescription:
          'A typo fix keeps the current version. A change in meaning needs a new version, and the current one is retired.',
        dirtyDraftDescription: 'Save the draft to keep your changes.',
        locked: 'This version is retired',
        lockedDescription: 'Your changes will be saved as a new version.',
      },
    },
    answers: {
      add: 'Add answer',
      answerLabel: 'Answer {{number}}',
      answerPlaceholder: 'Answer text',
      descriptionMultiple: 'Mark every correct answer.',
      descriptionSingle: 'Mark the one correct answer.',
      descriptionSurvey: 'Survey questions have no correct answer.',
      markCorrect: 'Mark answer {{number}} as correct',
      moveDown: 'Move answer {{number}} down',
      moveUp: 'Move answer {{number}} up',
      remove: 'Remove answer {{number}}',
      removeDisabled: 'A question needs at least two answers.',
      title: 'Answers',
    },
    backToBank: 'Back to question bank',
    backToFocus: 'Back to review',
    classification: {
      addTag: 'Add tag "{{label}}"',
      businessKey: 'Question key',
      businessKeyAuto: 'The key is issued automatically, for example {{example}}.',
      businessKeyAutoNoCategory: 'The key is issued automatically once a category is chosen.',
      businessKeyManual: 'Enter the key yourself',
      businessKeyManualHelper: 'Only for questions carried over from an existing bank.',
      categoriesUnavailable: 'Categories could not be loaded. Refresh the page.',
      category: 'Category',
      categoryPlaceholder: 'Choose a category',
      description: 'Classification can change later without creating a new version.',
      noTags: 'No matching tags',
      positionCodes: 'Job positions',
      positionCodesPlaceholder: 'Type a position code and press Enter',
      source: 'Source',
      sourceName: 'Source name',
      sourceNamePlaceholder: 'For example: Goods receiving procedure',
      sourcePlaceholder: 'Choose a source',
      tagCreateError: 'The tag could not be added. Try again.',
      tags: 'Tags',
      tagsPlaceholder: 'Type to search',
      tagsUnavailable: 'Tags could not be loaded. Refresh the page.',
      title: 'Classification',
    },
    content: {
      body: 'Question',
      bodyPlaceholder: 'For example: How long can opened milk be kept in the cold store?',
      description: 'Choose how the question is answered and write its text.',
      explanation: 'Explanation after the test',
      explanationHelper: 'Optional. Shown after the test when the test is set to show it.',
      title: 'Question',
      type: 'Question type',
      typeLocked: 'The type cannot change once the question exists.',
    },
    create: {
      description: 'Save a draft at any point and finish the question later.',
      duplicateDescription: 'Copy of question {{key}}. Save it as a new draft.',
      title: 'New question',
    },
    edit: {
      activateVersion: 'Activate version',
      history: 'Version history',
      noEditableVersion: {
        description:
          'Every version of this question is retired. Create a new version to change it.',
        title: 'No version to edit',
      },
      notFound: {
        description:
          'The link may be out of date. Go back to the question bank and open the question from there.',
        title: 'Question not found',
      },
      title: 'Edit question',
      unsupportedType: {
        description: 'Questions of type "{{type}}" cannot be edited here yet.',
        title: 'This question cannot be edited yet',
      },
      versionLabel: 'Version {{number}}',
    },
    errors: {
      activateFailed: 'The version could not be activated. Try again.',
      conflict: 'The question changed in the meantime. Refresh the page and try again.',
      forbidden: 'You do not have permission to save this question.',
      keyTaken: 'This key is already taken. Enter a different one.',
      notFound: 'The question no longer exists. Go back to the question bank.',
    },
    expectedAnswers: {
      add: 'Add expected answer',
      addDisabled: 'A question can have at most {{max}} expected answers.',
      answerLabel: 'Expected answer {{number}}',
      answerPlaceholder: 'For example: 4',
      description:
        'The employee types the answer and it is marked against this list. Letter case and extra spaces do not count; any other difference does, so "4" and "4,0" are different answers. If both are right, add both.',
      remove: 'Remove expected answer {{number}}',
      removeDisabled: 'A question needs at least one expected answer.',
      title: 'Expected answers',
    },
    formPreview: {
      description:
        'This is how an employee sees the question, including unsaved changes. Answers given here are not saved.',
      hide: 'Hide preview',
      show: 'Preview',
      title: 'Preview',
    },
    media: {
      actions: {
        remove: 'Remove {{name}}',
      },
      answerLabel: 'Media for answer {{number}}',
      deleteDialog: {
        cancel: 'Cancel',
        confirm: 'Remove',
        description: 'The media {{name}} will be removed from this version of the question.',
        title: 'Remove media?',
      },
      description: 'A photo or video the employee sees with the question.',
      disabled: {
        unsaved: 'You can add media after you save the question.',
        unsavedAnswer: 'You can add media after you save this answer.',
      },
      dropzone: {
        answerLabel: 'Drag media for this answer here or click to add it',
        formats: 'A JPEG, PNG or WebP photo, or an MP4 video',
        label: 'Drag a photo or video here or click to add it',
        limits: 'Photo up to 5 MB, video up to 20 MB and 90 s',
      },
      empty: 'This question has no media yet.',
      errors: {
        FILE_TOO_LARGE:
          'The file is {{actual}} and the limit is {{limit}}. Make the file smaller and add it again.',
        fileTooLargeWithoutActual:
          'The file is larger than {{limit}}. Make the file smaller and add it again.',
        fileTooLargeWithoutLimit:
          'The file is too large. A photo can be up to 5 MB and a video up to 20 MB.',
        forbidden: 'You do not have permission to change media for this question.',
        IMAGE_TOO_LARGE:
          'The longer side of the photo is {{actual}} px and the limit is {{limit}} px. Resize the photo and add it again.',
        notADraft:
          'Media can be changed only in a draft. Create a new version and add the media there.',
        outOfLimits:
          'The file does not meet the requirements. Photos: JPEG, PNG or WebP up to 5 MB. Videos: MP4 up to 20 MB and 90 seconds.',
        removeFailed: 'Could not remove the media. Try again.',
        unavailable: 'Media is not available right now. Try again in a moment.',
        unknown: 'Could not add the file. Try again.',
        UNREADABLE:
          'Could not read the file. It may be damaged or incomplete. Save it again and add it once more.',
        UNSUPPORTED_TYPE:
          'This file format is not supported. Add a JPEG, PNG or WebP photo, or an MP4 video.',
        unsupportedHeic:
          'HEIC photos from a phone are not supported. Save the photo as JPEG and add it again.',
        unsupportedQuickTime:
          'MOV videos are not supported. Save the video as MP4 and add it again.',
        VIDEO_CODEC_UNSUPPORTED:
          'Browsers cannot play this video. Save it as MP4 with H.264 video and AAC sound, then add it again.',
        VIDEO_NOT_FASTSTART:
          'The video has to download in full before it can play. Export it with the Fast start or Optimize for web option turned on, then add it again.',
        VIDEO_RESOLUTION_TOO_HIGH:
          'The video is {{actual}}p and the limit is {{limit}}p. Export it at a lower quality and add it again.',
        VIDEO_TOO_LONG:
          'The video runs {{actual}} and the limit is {{limit}}. Shorten the video and add it again.',
      },
      kind: {
        IMAGE: 'Photo',
        VIDEO: 'Video',
      },
      notifications: {
        removed: 'Media removed.',
        uploaded: 'Media added.',
      },
      readOnly: {
        description:
          'Media changes only in a draft, so employees see the same thing as in the test. To change it, create a new version.',
        title: 'Change media in a new version',
      },
      title: 'Media',
      units: {
        dimensions: '{{width}} × {{height}} px',
        megabytes: '{{value}} MB',
        minutes: '{{minutes}} min',
        minutesSeconds: '{{minutes}} min {{seconds}} s',
        seconds: '{{seconds}} s',
      },
      uploading: 'Adding media {{name}}',
    },
    newVersionDialog: {
      cancel: 'Cancel',
      confirm: 'Create new version',
      description:
        'The current version will be retired. If you are only fixing a typo, choose Fix a typo instead.',
      title: 'Create a new version?',
    },
    notifications: {
      activated: 'The version is now active.',
      classificationSaved: 'Classification saved.',
      created: 'Draft saved.',
      typoFixed: 'Correction saved.',
      versionCreated: 'New version created.',
    },
    page: {
      title: 'Question {{key}}',
      views: {
        [QuestionPageViewEnum.EDIT]: 'Edit',
        [QuestionPageViewEnum.HISTORY]: 'Version history',
      },
      viewsLabel: 'Question view',
    },
    scoring: {
      description: 'How many points the question is worth and how they are counted.',
      expectedAnswerRule:
        'The question scores full points when the answer matches any expected answer, and zero otherwise.',
      maxPoints: 'Points',
      scoringRule: 'Scoring rule',
      singleChoiceRule:
        'A single choice question scores full points for the correct answer and zero otherwise.',
      title: 'Scoring',
    },
    serverErrors: {
      answerBody: 'Enter the answer text.',
      answers: 'Check the answers. A question needs at least two answers with text.',
      answersCorrect: 'Mark at least one correct answer.',
      body: 'Enter the question text.',
      businessKey: 'Check the question key.',
      categoryId: 'Choose a category.',
      expectedAnswers: 'Check the expected answers. Each needs text and can appear only once.',
      maxPoints: 'Enter a number of points greater than zero.',
      positionCodes: 'Check the job positions.',
      scoringRule: 'Choose a scoring rule.',
      source: 'Choose a source.',
      sourceName: 'Check the source name.',
      tags: 'Check the tags.',
    },
    translations: {
      answers: 'Answers',
      description: 'Status of the question in each language.',
      missing: 'Not translated yet.',
      sourceLanguage: 'Source language. Edit its text in the Question section above.',
      title: 'Translations',
    },
  },
  questionHistory: {
    classification: {
      description:
        'Changes of category, source, tags and positions. They belong to the question, not to a version.',
      empty: 'The classification has not changed since the question was created.',
      title: 'Classification',
    },
    compare: {
      answers: 'Answers',
      body: 'Question',
      expectedAnswers: 'Expected answers',
      explanation: 'Explanation after the test',
      from: 'Earlier version',
      maxPoints: 'Points',
      needTwo: 'The question has only one version, so there is nothing to compare.',
      noChanges: 'These versions have the same text, answers and scoring.',
      scoringRule: 'Scoring rule',
      to: 'Later version',
    },
    created: 'Created {{date}} by {{author}}',
    description: 'Newest version first, each with its changes.',
    eventMeta: '{{date}}, {{author}}',
    events: {
      [HistoryEventKindDto.ClassificationChanged]: 'Classification changed',
      [HistoryEventKindDto.Corrected]: 'Corrected in place',
      [HistoryEventKindDto.Created]: 'Version created',
      [HistoryEventKindDto.MediaAdded]: 'Material added',
      [HistoryEventKindDto.MediaRemoved]: 'Material removed',
      [HistoryEventKindDto.ReviewChanged]: 'Review mark changed',
      [HistoryEventKindDto.StatusChanged]: 'Status changed',
    },
    fields: {
      answer: 'Answer',
      'answer.body': 'Answer text',
      'answer.correctOrder': 'Place in the correct order',
      'answer.displayOrder': 'Answer order',
      'answer.isCorrect': 'Correct answer',
      'answer.points': 'Points for the answer',
      answerKey: 'Examiner key',
      body: 'Question',
      category: 'Category',
      examinerCommentRequired: 'Examiner comment required',
      expectedAnswers: 'Expected answers',
      explanation: 'Explanation after the test',
      maxPoints: 'Points',
      media: 'Material',
      positionCodes: 'Job positions',
      scaleMax: 'Top of the scale',
      scoringRule: 'Scoring rule',
      source: 'Source',
      sourceName: 'Source name',
      status: 'Status',
      tags: 'Tags',
      topics: 'Topics',
      topicsToPick: 'Topics to pick',
    },
    notFound: {
      description:
        'The link may be out of date. Go back to the question bank and open the question from there.',
      title: 'Question not found',
    },
    otherField: 'Other change',
    panel: {
      compare: 'Compare',
      description: 'The text exactly as it was while the version was in force.',
      modeLabel: 'Version view',
      preview: 'Preview',
      title: 'Version {{number}}',
    },
    preview: {
      answers: 'Answers',
      body: 'Question',
      correct: 'Correct',
      expectedAnswers: 'Expected answers',
      explanation: 'Explanation after the test',
      maxPoints: 'Points',
      scoringRule: 'Scoring rule',
    },
    readOnly:
      'The history cannot be changed. To go back to older text, create a new version in the question form.',
    retired: 'Retired {{date}}',
    title: 'Question history',
    values: {
      added: 'Added',
      correct: 'correct',
      empty: 'none',
      incorrect: 'not correct',
      item: 'item',
      no: 'no',
      removed: 'Removed',
      yes: 'yes',
    },
    versionLabel: 'Version {{number}}',
    versions: {
      description: 'Choose a version to see its text.',
      title: 'Versions',
    },
  },
};
