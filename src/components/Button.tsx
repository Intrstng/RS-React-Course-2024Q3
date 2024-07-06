import React, { Component } from 'react';
import { ButtonProps } from '../types/types';

export class Button extends Component<ButtonProps, unknown> {
  onClickHandler = () => this.props.onClickCallBack();
  render() {
    return (
      <button
        className={this.props.className}
        disabled={this.props.disabled}
        onClick={this.onClickHandler}
      >
        {this.props.children}
      </button>
    );
  }
}
