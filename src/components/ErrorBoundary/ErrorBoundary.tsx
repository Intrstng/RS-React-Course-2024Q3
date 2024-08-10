'use client'

import React, { Component, ErrorInfo } from 'react';
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '../../shared/types/types';
import S from '../../styles/ErrorBoundary.module.css';
import errorImg from '../../assets/error-page.jpg';
import { Button } from '../Button';

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
    this.onClickRemoveError = this.onClickRemoveError.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
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

  onClickRemoveError() {
    this.setState({
      hasError: false,
      errorMessage: null,
    });
  }

  handleRefresh() {
    this.onClickRemoveError();
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={S.errorContainer}>
          <img src={errorImg.src} alt={'error'} className={S.errorImg} />
          <h2 className={S.error}>{this.state.errorMessage}</h2>
          <Button
            className={S.refreshButton}
            onClickCallBack={this.handleRefresh}
          >
            Refresh page
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
