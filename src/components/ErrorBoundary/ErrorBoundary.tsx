import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  // fallBackUIComponent: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Catched error', errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <div className="m-auto">Something went wrong...</div>;
      // return fallBackUIComponent;
    }

    return children;
  }
}

export default ErrorBoundary;