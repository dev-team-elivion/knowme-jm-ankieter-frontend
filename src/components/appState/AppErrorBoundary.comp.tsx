import { Component, ReactNode } from 'react';

import { AppErrorFallback } from '@/components/appState/AppErrorFallback.comp.tsx';

type Props = {
  children: ReactNode;
  resetKey?: string;
  variant: 'fullPage' | 'inline';
};

type State = {
  failedResetKey: null | string | undefined;
  hasError: boolean;
};

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { failedResetKey: null, hasError: false };

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  static getDerivedStateFromProps(props: Props, state: State): null | Partial<State> {
    if (!state.hasError) {
      return null;
    }
    if (state.failedResetKey === null) {
      return { failedResetKey: props.resetKey };
    }
    return props.resetKey === state.failedResetKey
      ? null
      : { failedResetKey: null, hasError: false };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <AppErrorFallback variant={this.props.variant} />;
    }
    return this.props.children;
  }
}
