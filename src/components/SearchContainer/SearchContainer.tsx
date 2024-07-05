import React, { ChangeEvent, Component, createRef, RefObject } from 'react';
import S from './SearchContainer.module.css';
import { Button } from '../Button';
import { SearchField } from '../SearchField/SearchField';

export class SearchContainer extends Component {
  inputRef: RefObject<HTMLInputElement>;

  state: SearchContainerState = {
    text: this.getFromLocalStorage('searchValue'),
    error: null,
  };
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }

  private getFromLocalStorage(key: string): string {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return '';
      }
      return JSON.parse(serializedState);
    } catch {
      throw new Error('Data from local storage is not loaded');
    }
  }

  onClickGetVehiclesHandler = () => {};

  onChangeSetInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.currentTarget.value });
  };

  onClickSetError = () =>
    this.setState({
      error:
        "An error occurred when the user clicked the 'Throw error on click' button",
    });

  async componentDidMount(): Promise<void> {
    if (this.inputRef.current !== null) {
      this.inputRef.current.focus();
    }
  }

  render() {
    if (this.state.error !== null) throw new Error(this.state.error);
    const { text } = this.state.text;

    return (
      <section className={S.searchContainer}>
        <SearchField
          ref={this.inputRef}
          placeholder={'search'}
          value={text}
          onChangeHandler={this.onChangeSetInputValueHandler}
        />

        <Button
          className={S.searchButton}
          onClickCallBack={this.onClickGetVehiclesHandler}
        >
          Search
        </Button>
        <Button
          className={S.errorButton}
          onClickCallBack={this.onClickSetError}
        >
          Throw error on click
        </Button>
      </section>
    );
  }
}

export type SearchContainerState = {
  text: string;
  error: string | null;
};
