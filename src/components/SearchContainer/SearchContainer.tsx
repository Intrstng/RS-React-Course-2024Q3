import React, { ChangeEvent, Component, createRef, RefObject } from 'react';
import S from './SearchContainer.module.css';
import { Button } from '../Button';
import { SearchField } from '../SearchField/SearchField';
import { SearchContainerProps, SearchContainerState } from '../../types/types';

export class SearchContainer extends Component<SearchContainerProps, unknown> {
  inputRef: RefObject<HTMLInputElement>;
  key = 'searchValue' as const;

  state: SearchContainerState = {
    text: '',
  };

  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }

  private getFromLocalStorage(key: string): string {
    try {
      const serializedState = localStorage.getItem(key);
      if (!serializedState) {
        return '';
      }
      return JSON.parse(serializedState);
    } catch {
      throw new Error('Data from local storage is not loaded');
    }
  }

  private saveToLocalStorage = (key: string, value): void => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch {
      throw new Error('Data is not saved to local storage');
    }
  };

  onClickFetchVehiclesHandler = () => {
    const trimmedText = this.state.text.trim();
    this.setState({ text: trimmedText });
    this.saveToLocalStorage(this.key, trimmedText);
    this.props.fetchVehicles(trimmedText);
  };

  onChangeSetInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.currentTarget.value });
  };

  onClickSetError = () => {
    this.props.setError(
      "An error occurred when the user clicked the 'Throw error on click' button",
    );
  };

  async componentDidMount(): Promise<void> {
    const searchValueFromLocalStorage = this.getFromLocalStorage(this.key);
    this.setState({ text: searchValueFromLocalStorage });
    this.props.fetchVehicles(searchValueFromLocalStorage);
    if (this.inputRef.current !== null) {
      this.inputRef.current.focus();
    }
  }

  render() {
    if (this.props.error !== null) throw new Error(this.props.error);
    const { text } = this.state;

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
          onClickCallBack={this.onClickFetchVehiclesHandler}
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
