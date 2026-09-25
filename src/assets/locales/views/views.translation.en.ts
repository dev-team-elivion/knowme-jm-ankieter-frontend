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
    questionSource: {
      HANDBOOK: string;
      OPEROLKA: string;
      OTHER: string;
      PROCEDURE: string;
    };
    questionStatus: {
      ACTIVE: string;
      ARCHIVED: string;
      DRAFT: string;
    };
    questionType: {
      MULTIPLE_CHOICE: string;
      OPEN_TEXT: string;
      ORDERING: string;
      PASS_FAIL: string;
      PRACTICAL: string;
      SINGLE_CHOICE: string;
    };
    scoringRule: {
      ALL_OR_NOTHING: ScoringRuleTranslation;
      PARTIAL: ScoringRuleTranslation;
      PARTIAL_WITH_PENALTY: ScoringRuleTranslation;
    };
    translationStatus: {
      APPROVED: string;
      DRAFT: string;
      MISSING: string;
    };
    versionStatus: {
      ACTIVE: string;
      DRAFT: string;
      RETIRED: string;
    };
  };
  questionForm: {
    actions: {
      fixTypo: string;
      fixTypoHint: string;
      newVersion: string;
      newVersionHint: string;
      saveDraft: string;
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
      title: string;
    };
    edit: {
      activateVersion: string;
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
    scoring: {
      description: string;
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
    questionSource: {
      HANDBOOK: 'Handbook',
      OPEROLKA: 'Operolka',
      OTHER: 'Other',
      PROCEDURE: 'Procedure',
    },
    questionStatus: {
      ACTIVE: 'Active',
      ARCHIVED: 'Archived',
      DRAFT: 'Draft',
    },
    questionType: {
      MULTIPLE_CHOICE: 'Multiple choice',
      OPEN_TEXT: 'Open question',
      ORDERING: 'Put in order',
      PASS_FAIL: 'Pass or fail',
      PRACTICAL: 'Practical task',
      SINGLE_CHOICE: 'Single choice',
    },
    scoringRule: {
      ALL_OR_NOTHING: {
        description: 'Points only for every correct answer ticked and no wrong one.',
        label: 'All or nothing',
      },
      PARTIAL: {
        description:
          'Points in proportion to the correct answers ticked. Wrong ticks cost nothing, so ticking everything scores full points.',
        label: 'Partial',
      },
      PARTIAL_WITH_PENALTY: {
        description: 'Each wrong tick takes points away. The question never scores below zero.',
        label: 'Partial with penalty',
      },
    },
    translationStatus: {
      APPROVED: 'Approved',
      DRAFT: 'Draft',
      MISSING: 'Missing',
    },
    versionStatus: {
      ACTIVE: 'Active',
      DRAFT: 'Draft',
      RETIRED: 'Retired',
    },
  },
  questionForm: {
    actions: {
      fixTypo: 'Fix a typo',
      fixTypoHint: 'Changes the current version. Translations keep their status.',
      newVersion: 'New version',
      newVersionHint:
        'Use it when the meaning changes. The current version is retired and every translation has to be prepared again.',
      saveDraft: 'Save draft',
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
      title: 'New question',
    },
    edit: {
      activateVersion: 'Activate version',
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
    newVersionDialog: {
      cancel: 'Cancel',
      confirm: 'Create new version',
      description:
        'The current version will be retired. Translations of the new version lose their status and have to be prepared again. If you are only fixing a typo, choose Fix a typo instead.',
      title: 'Create a new version?',
    },
    notifications: {
      activated: 'The version is now active.',
      classificationSaved: 'Classification saved.',
      created: 'Draft saved.',
      typoFixed: 'Correction saved.',
      versionCreated: 'New version created.',
    },
    scoring: {
      description: 'How many points the question is worth and how they are counted.',
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
      maxPoints: 'Enter a number of points greater than zero.',
      positionCodes: 'Check the job positions.',
      scoringRule: 'Choose a scoring rule.',
      source: 'Choose a source.',
      sourceName: 'Check the source name.',
      tags: 'Check the tags.',
    },
    translations: {
      answers: 'Answers',
      description:
        'Status of the question in each language. Questions are written in Polish for now.',
      missing: 'Not translated yet.',
      sourceLanguage: 'Source language. Edit its text in the Question section above.',
      title: 'Translations',
    },
  },
};
