export type GeneralErrorTranslation = {
  backendUnavailable: {
    retry: string;
  } & StatusScreenTranslation;
  crash: {
    goToDashboard: string;
    reload: string;
  } & StatusScreenTranslation;
  notFound: {
    goBack: string;
    goToDashboard: string;
  } & StatusScreenTranslation;
  sessionExpired: {
    signIn: string;
  } & StatusScreenTranslation;
};

type StatusScreenTranslation = {
  description: string;
  statusLabel: string;
  title: string;
};

export const generalErrorTranslation: GeneralErrorTranslation = {
  backendUnavailable: {
    description:
      'The application cannot reach the server right now. Wait a moment and try again. If it keeps happening, let your administrator know.',
    retry: 'Try again',
    statusLabel: 'No connection',
    title: 'We could not connect',
  },
  crash: {
    description:
      'This screen stopped working. Your saved data is safe. Reload the page or go back to the dashboard.',
    goToDashboard: 'Go to dashboard',
    reload: 'Reload page',
    statusLabel: 'Unexpected error',
    title: 'Something went wrong',
  },
  notFound: {
    description: 'The address may be mistyped, or the page was moved. Use the menu to find it.',
    goBack: 'Go back',
    goToDashboard: 'Go to dashboard',
    statusLabel: 'Error 404',
    title: 'Page not found',
  },
  sessionExpired: {
    description:
      'The sign-in page will open in a moment. After signing in you will return to the same place. If nothing happens, use the button below.',
    signIn: 'Sign in',
    statusLabel: 'Session',
    title: 'Redirecting to sign in',
  },
};
