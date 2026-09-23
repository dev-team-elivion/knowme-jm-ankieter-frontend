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
    questionStatus: {
      ACTIVE: string;
      ARCHIVED: string;
      DRAFT: string;
    };
  };
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
    questionStatus: {
      ACTIVE: 'Active',
      ARCHIVED: 'Archived',
      DRAFT: 'Draft',
    },
  },
};
