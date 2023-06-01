import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallBackUIComponent: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children, fallBackUIComponent } = this.props;

    if (hasError) {
      return fallBackUIComponent;
    }

    return children;
  }
}
