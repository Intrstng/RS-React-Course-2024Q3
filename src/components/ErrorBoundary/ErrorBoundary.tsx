import React, { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/types';
import S from './ErrorBoundary.module.css';
import errorImg from '../../assets/error.png';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={S.errorContainer}>
          <img src={errorImg} alt={'error'} className={S.errorImg} />
          <h1 className={S.error}>{this.state.errorMessage}</h1>
        </div>
      );
    }
    return this.props.children;
  }
}
