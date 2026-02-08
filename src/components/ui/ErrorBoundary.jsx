import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console and store it
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    }
  }

  logErrorToService = (error, errorInfo) => {
    // Placeholder for error reporting service integration
    // Examples: Sentry, LogRocket, Bugsnag, etc.
    try {
      // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
      console.log('Error would be sent to error reporting service:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        errorId: this.state.errorId
      });
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
    }
  };

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    });
  };

  handleReload = () => {
    // Clear any cached state and reload
    window.location.reload();
  };

  handleGoHome = () => {
    // Navigate to home page
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>We're sorry, but something unexpected happened.</p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="error-details">
                <summary>Error Details (Development Only)</summary>
                <div className="error-info">
                  <div className="error-section">
                    <h4>Error Message:</h4>
                    <pre>{this.state.error && this.state.error.toString()}</pre>
                  </div>
                  <div className="error-section">
                    <h4>Component Stack:</h4>
                    <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                  </div>
                  <div className="error-section">
                    <h4>Error Stack:</h4>
                    <pre>{this.state.error && this.state.error.stack}</pre>
                  </div>
                  <div className="error-section">
                    <h4>Error ID:</h4>
                    <code>{this.state.errorId}</code>
                  </div>
                </div>
              </details>
            )}
            
            <div className="error-actions">
              <button 
                onClick={this.handleReset}
                className="btn btn-primary"
              >
                Try Again
              </button>
              <button 
                onClick={this.handleGoHome}
                className="btn btn-secondary"
              >
                Go Home
              </button>
              <button 
                onClick={this.handleReload}
                className="btn btn-outline"
              >
                Reload Page
              </button>
            </div>
            
            {process.env.NODE_ENV === 'production' && (
              <div className="error-support">
                <p className="error-reference">
                  Error Reference: <code>{this.state.errorId}</code>
                </p>
                <p className="error-help">
                  If this problem persists, please contact support.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
