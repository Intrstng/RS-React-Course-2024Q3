import React, { ChangeEvent, Component, createRef, RefObject } from 'react';
import S from './SearchContainer.module.css';
import { Button } from '../Button';
import { SearchField } from '../SearchField/SearchField';
import { SearchContainerProps, SearchContainerState } from '../../types/types';

export class SearchContainer extends Component<SearchContainerProps, unknown> {
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

  onClickFetchVehiclesHandler = () => {
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
