import React, { Component } from 'react';

function ErrorPage() {
  return <div>Error</div>;
}

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? <ErrorPage /> : this.props.children;
  }  // ‌:ml-citation{ref="4,8" data="citationList"}
}
export default ErrorBoundary;