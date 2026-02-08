import React from 'react';
import './ErrorBoundary.css';

class CartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      errorId: `cart-error-${Date.now()}`
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Cart Error:', error, errorInfo);
    this.setState({ error });
    
    // Log cart-specific errors
    if (process.env.NODE_ENV === 'production') {
      console.log('Cart error would be reported:', {
        error: error.message,
        componentStack: errorInfo.componentStack,
        errorId: this.state.errorId,
        timestamp: new Date().toISOString()
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorId: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary cart-error">
          <div className="error-content compact">
            <div className="error-icon">🛒</div>
            <h3>Cart Error</h3>
            <p>There was an issue with your cart. Please try again.</p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="error-details compact">
                <summary>Error Details</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
              </details>
            )}
            
            <div className="error-actions">
              <button onClick={this.handleRetry} className="btn btn-primary">
                Retry
              </button>
            </div>
            
            {process.env.NODE_ENV === 'production' && (
              <p className="error-reference">
                Error ID: <code>{this.state.errorId}</code>
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CartErrorBoundary;
