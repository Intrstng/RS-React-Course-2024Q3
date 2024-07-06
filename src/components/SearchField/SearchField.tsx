import React, { ChangeEvent, Component, forwardRef, Ref } from 'react';
import S from './SearchField.module.css';

type SearchFieldProps = {
  placeholder: string;
  value: string;
  forwardedRef: Ref<HTMLInputElement>;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

class SearchField extends Component<SearchFieldProps, unknown> {
  render() {
    const { placeholder, value, onChangeHandler, forwardedRef } = this.props;
    return (
      <input
        ref={forwardedRef}
        type="text"
        placeholder={placeholder}
        value={value}
        className={S.searchInput}
        onChange={onChangeHandler}
      />
    );
  }
}

const ForwardedSearchField = forwardRef<
  HTMLInputElement,
  Omit<SearchFieldProps, 'forwardedRef'>
>((props, ref) => <SearchField {...props} forwardedRef={ref} />);

ForwardedSearchField.displayName = 'SearchField';

export { ForwardedSearchField as SearchField };
