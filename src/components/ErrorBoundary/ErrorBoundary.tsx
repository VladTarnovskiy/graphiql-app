import { ReactNode, Component } from 'react';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallBackUIComponent: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
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
