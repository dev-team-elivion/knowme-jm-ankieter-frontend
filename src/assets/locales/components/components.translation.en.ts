import { VersionStatusDto } from '@/api/generated';

export type ComponentsTranslation = {
  dataTable: {
    displayedRows: string;
    loadingLabel: string;
    rowsPerPage: string;
    sortAscending: string;
    sortDescending: string;
  };
  emptyState: {
    noData: {
      description: string;
      title: string;
    };
    noMatch: {
      clearFilters: string;
      description: string;
      title: string;
    };
  };
  errorState: {
    description: string;
    retry: string;
    title: string;
  };
  form: {
    requiredMark: string;
    serverRejected: string;
    unexpectedError: string;
  };
  loadingState: {
    label: string;
  };
  mediaPreview: {
    imageAlt: string;
    loadFailed: string;
    retry: string;
  };
  notifications: {
    close: string;
  };
  questionPresentation: {
    answerKey: string;
    answerMediaLabel: string;
    answerPlaceholder: string;
    answerPoints: string;
    answersLabel: string;
    correct: string;
    emptyAnswer: string;
    emptyBody: string;
    examiner: {
      answerKey: string;
      comment: string;
      commentRequired: string;
      fail: string;
      pass: string;
      result: string;
      scale: string;
      topics: string;
      topicsToPick_few?: string;
      topicsToPick_many?: string;
      topicsToPick_one: string;
      topicsToPick_other?: string;
    };
    expectedAnswers: string;
    hiddenMarker: Record<Exclude<VersionStatusDto, typeof VersionStatusDto.Active>, string>;
    missingTranslation: string;
    noVersion: string;
    openPlaceholder: string;
    ordering: {
      correctPosition: string;
      hint: string;
      moveDown: string;
      moveUp: string;
    };
    questionMediaLabel: string;
    showCorrect: string;
    solution: {
      explanation: string;
      maxPoints: string;
    };
  };
  searchField: {
    clear: string;
    placeholder: string;
  };
  uploadField: {
    tooLarge: string;
    wrongFormat: string;
  };
};

export const componentsTranslation: ComponentsTranslation = {
  dataTable: {
    displayedRows: '{{from}}–{{to}} of {{count}}',
    loadingLabel: 'Loading rows',
    rowsPerPage: 'Rows per page',
    sortAscending: 'sorted ascending',
    sortDescending: 'sorted descending',
  },
  emptyState: {
    noData: {
      description: 'Items you add will appear here.',
      title: 'Nothing here yet',
    },
    noMatch: {
      clearFilters: 'Clear filters',
      description: 'Change the search phrase or clear the filters to see more results.',
      title: 'No matching results',
    },
  },
  errorState: {
    description: 'The data could not be loaded. Check your connection and try again.',
    retry: 'Try again',
    title: 'Something went wrong',
  },
  form: {
    requiredMark: 'required',
    serverRejected: 'Some fields need attention. Correct them and save again.',
    unexpectedError: 'Changes could not be saved. Try again.',
  },
  loadingState: {
    label: 'Loading',
  },
  mediaPreview: {
    imageAlt: 'Media: {{name}}',
    loadFailed: 'Could not load the media.',
    retry: 'Load again',
  },
  notifications: {
    close: 'Close notification',
  },
  questionPresentation: {
    answerKey: 'Answer key',
    answerMediaLabel: 'Answer media',
    answerPlaceholder: 'Type your answer',
    answerPoints: 'Points: {{points}}',
    answersLabel: 'Answers',
    correct: 'Correct',
    emptyAnswer: 'Empty answer',
    emptyBody: 'The question text will appear here.',
    examiner: {
      answerKey: 'Key for the examiner',
      comment: 'Examiner comment',
      commentRequired: 'Examiner comment (required)',
      fail: 'Failed',
      pass: 'Passed',
      result: 'Result',
      scale: 'Score from 0 to {{max}}',
      topics: 'Topics',
      topicsToPick_one: 'The examiner picks {{count}} topic.',
      topicsToPick_other: 'The examiner picks {{count}} topics.',
    },
    expectedAnswers: 'Expected answer',
    hiddenMarker: {
      [VersionStatusDto.Draft]: 'Draft only, employees do not see it',
      [VersionStatusDto.Retired]: 'Retired, employees do not see it',
    },
    missingTranslation:
      'This question has no approved text in this language, so it will not appear in a test in this language.',
    noVersion: 'The question has no version to show yet.',
    openPlaceholder: 'Write your answer',
    ordering: {
      correctPosition: 'Correct place: {{position}}',
      hint: 'Drag the answers or use the arrows to put them in order.',
      moveDown: 'Move down: {{answer}}',
      moveUp: 'Move up: {{answer}}',
    },
    questionMediaLabel: 'Question media',
    showCorrect: 'Show correct answers',
    solution: {
      explanation: 'Explanation',
      maxPoints: 'Points for the question',
    },
  },
  searchField: {
    clear: 'Clear search',
    placeholder: 'Search',
  },
  uploadField: {
    tooLarge: 'The file is too large. The limit is {{maxFileSize}}.',
    wrongFormat: 'This file format is not supported.',
  },
};
