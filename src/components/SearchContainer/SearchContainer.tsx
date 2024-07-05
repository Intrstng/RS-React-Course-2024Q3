import React, { ChangeEvent, Component, createRef, RefObject } from 'react';
import S from './SearchContainer.module.css';
import { Button } from '../Button';

export class SearchContainer extends Component {
  private inputRef: RefObject<HTMLInputElement> = createRef();

  onClickGetVehiclesHandler = () => {};

  async componentDidMount(): Promise<void> {
    this.inputRef.current?.focus();
  }

  render() {
    return (
      <section className={S.searchContainer}>
        <SearchField ref={this.inputRef} />
        <Button
          className={S.searchButton}
          onClickCallBack={this.onClickGetVehiclesHandler}
        >
          Search
        </Button>
        <Button
          className={S.errorButton}
          onClickCallBack={this.onClickGetVehiclesHandler}
        >
          Throw error
        </Button>
      </section>
    );
  }
}

export class SearchField extends Component {
  onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

  render() {
    return <input type={'text'} onChange={this.onChangeHandler} />;
  }
}
