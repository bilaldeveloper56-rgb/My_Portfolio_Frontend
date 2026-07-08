import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[REACT ERROR BOUNDARY]:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
          padding: '2rem'
        }}>
          <div style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2.5rem var(--spacing-lg)',
            boxShadow: 'var(--shadow-lg)',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              color: 'var(--color-danger)', 
              marginBottom: '1rem', 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-3xl)' 
            }}>
              Something went wrong
            </h2>
            <p style={{ 
              color: 'var(--color-text-secondary)', 
              marginBottom: '2rem', 
              fontSize: 'var(--text-sm)' 
            }}>
              The application encountered an unexpected runtime error. We apologize for the inconvenience.
            </p>
            
            <button 
              className="btn btn-primary" 
              onClick={this.handleRetry}
              style={{ padding: '0.8rem 2rem' }}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
