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
  notifications: {
    close: string;
  };
  searchField: {
    clear: string;
    placeholder: string;
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
  notifications: {
    close: 'Close notification',
  },
  searchField: {
    clear: 'Clear search',
    placeholder: 'Search',
  },
};
