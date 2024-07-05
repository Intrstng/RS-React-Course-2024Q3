import React, { Component } from 'react';
import { ViewContainerProps } from '../../types/types';
import S from './ViewContainer.module.css';

export class ViewContainer extends Component<ViewContainerProps> {
  render() {
    return (
      <section className={S.viewContainer}>
        <p>Hello!</p>
      </section>
    );
  }
}
