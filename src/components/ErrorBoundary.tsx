'use client';

import { Component, ReactNode } from 'react';
import { captureException } from '@sentry/nextjs';
import { InlineNotification, Button } from '@carbon/react';

interface ErrorBoundaryProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    captureException(error, {
      extra: { componentStack: info.componentStack },
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem 1rem' }}>
          <InlineNotification
            kind="error"
            title={this.props.title ?? 'Something went wrong'}
            subtitle={
              this.props.description ??
              'We ran into a problem while loading this section. Please try again or refresh the page.'
            }
            lowContrast
            actions={<Button size="sm" onClick={this.handleRetry}>Try again</Button>}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
