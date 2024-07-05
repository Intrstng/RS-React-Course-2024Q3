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

  private saveToLocalStorage = (key: string, value): void => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch {
      throw new Error('Data is not saved to local storage');
    }
  };

  onClickFetchVehiclesHandler = () => {
    this.saveToLocalStorage(this.key, this.state.text);
    // this.props.setIsLoading()
    // this.props.setVehicles()
    // this.setState({error: err.message})
    // this.setState({error: null})
    console.log('llll');
  };

  onChangeSetInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.currentTarget.value });
  };

  onClickSetError = () =>
    this.setState({
      error:
        "An error occurred when the user clicked the 'Throw error on click' button",
    });

  async componentDidMount(): Promise<void> {
    const searchValueFromLocalStorage = this.getFromLocalStorage(this.key);
    this.setState({ text: searchValueFromLocalStorage });

    if (this.inputRef.current !== null) {
      this.inputRef.current.focus();
    }
  }

  render() {
    if (this.state.error !== null) throw new Error(this.state.error);
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
