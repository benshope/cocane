// @flow
import React from 'react';
import uniq from 'lodash/fp/uniq';
import styled from 'styled-components';
import {AutoSizer, List} from 'react-virtualized';
import SearchOutlined from '@uber/icons/search-outlined';
import memoize from 'memoize-one';

import Checkbox from './checkbox';
import {findFuzzyMatchingStrings, HighlightedText} from './string-utils';
import {InputLabel} from './inputs-styles';
import {theme} from './theme';

import type {Node} from 'react';

const SearchIconSpan = styled.span`
  font-family: ${theme(['primaryFontFamily'])};
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
`;

const AllLabel = styled.label`
  font-family: ${theme(['primaryFontFamily'])};
  display: flex;
  border: none;
  align-items: center;
  font-size: 1em;
  border-radius: ${theme(['borders', 'radius200'])};
  cursor: pointer;
  color: ${theme(['colors', 'mono900'])};
  padding: none;
  margin: none;
`;

const CheckboxLabel = styled(AllLabel)`
  line-height: 32px;
`;

const CompletionDiv = styled.div`
  text-decoration: ${p => (p.strikethrough ? 'line-through' : 'none')};
  color: ${theme(['colors', 'mono900'])};
  :hover {
    color: ${theme(['colors', 'mono1000'])};
  }
  label {
    cursor: pointer;
    border: none;
  }
`;

const BelowSearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  label {
    margin: 0;
  }
`;

const FilterInputLabel = styled(InputLabel)`
  margin-bottom: 0.5rem;
`;

const NoResultsDiv = styled.div`
  font-family: ${theme(['primaryFontFamily'])};
  margin-top: 0.5rem;
  color: ${theme(['colors', 'mono700'])};
`;

const MIN_FOR_SEARCHABLE = 10;
const MIN_FOR_GROUP_ACTIONS = 2;
const ROW_HEIGHT = 32;
const MAX_ROWS_VISIBLE = 10;

type Props = {
  exclude?: boolean,
  disableSelectAll?: boolean,
  selected: Array<string>,
  options: Array<string>,
  onChange: (values: Array<string>) => void,
  placeholder?: string,
  children?: Node
};

const CheckboxSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 0.5rem;
`;

export default class MultiSelect extends React.Component<
  Props,
  {searchValue: string}
> {
  state = {
    searchValue: ''
  };

  onFilterFields = (e: SyntheticKeyboardEvent<HTMLInputElement>) =>
    this.setState({searchValue: e.currentTarget.value});

  onSelect = (options: Array<string>) => {
    this.props.onChange(uniq(options));
  };

  onSelectNone = () => {
    this.props.onChange([]);
  };

  sortedOptions = memoize(
    (options: Array<string>) =>
      (uniq(options.sort((x, y) => x.localeCompare(y))): any)
  );

  optionsMap = memoize((options: Array<string>) =>
    options.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {})
  );

  render() {
    // TODO(bshope): add keynav + submit
    const {
      exclude,
      options,
      disableSelectAll,
      placeholder,
      selected,
      onChange
    } = this.props;
    const sortedOptions = this.sortedOptions(options);
    const optionsMap = this.optionsMap(sortedOptions);
    const selectedKeys = {};
    // WARNING mutation happens here
    selected.forEach(key => {
      selectedKeys[key] = true;
      if (!optionsMap[key]) {
        sortedOptions.push(key);
      }
    });
    const filteredOptions = findFuzzyMatchingStrings(
      this.state.searchValue,
      sortedOptions,
      [x => x],
      1000
    );
    return (
      Boolean(options.length) &&
      [
        sortedOptions.length > MIN_FOR_SEARCHABLE ? (
          <FilterInputLabel key="filter-input-label">
            <SearchIconSpan>
              <SearchOutlined />
            </SearchIconSpan>
            <input
              placeholder={placeholder || 'Search...'}
              onChange={this.onFilterFields}
            />
          </FilterInputLabel>
        ) : null,
        !disableSelectAll ? (
          <BelowSearchDiv key="options-below-search">
            {(filteredOptions.length > MIN_FOR_GROUP_ACTIONS && (
              <AllLabel
                title={
                  selected.length >= sortedOptions.length
                    ? 'Clear Selection'
                    : 'Select All'
                }
              >
                <Checkbox
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < filteredOptions.length
                  }
                  onChange={() =>
                    selected.length >= filteredOptions.length
                      ? this.onSelectNone()
                      : this.onSelect([...filteredOptions])
                  }
                />
              </AllLabel>
            )) ||
              null}
            {this.props.children}
          </BelowSearchDiv>
        ) : null,
        <AutoSizer disableHeight key="list-autosizer">
          {({width}) => (
            <List
              key="list"
              style={{outline: 'none'}}
              height={
                Math.min(filteredOptions.length || 1, MAX_ROWS_VISIBLE) *
                ROW_HEIGHT
              }
              overscanRowCount={10}
              noRowsRenderer={() => (
                <NoResultsDiv>No matching values</NoResultsDiv>
              )}
              rowCount={filteredOptions.length}
              rowHeight={ROW_HEIGHT}
              rowRenderer={({index, style, key}) => {
                const value = filteredOptions[index];
                return (
                  <div style={style} key={key}>
                    <CompletionDiv
                      strikethrough={exclude && selectedKeys[value]}
                      key="completion-div"
                    >
                      <CheckboxLabel>
                        <Checkbox
                          key="checkbox"
                          id={value}
                          checked={Boolean(selectedKeys[value])}
                          onChange={e =>
                            onChange(
                              e.currentTarget.checked
                                ? [...selected, value]
                                : selected.filter(v => v !== value)
                            )
                          }
                        />
                        <CheckboxSpan title={value}>
                          {value ? (
                            this.state.searchValue ? (
                              <HighlightedText
                                text={value}
                                highlight={this.state.searchValue}
                              />
                            ) : (
                              value
                            )
                          ) : (
                            'NO VALUE'
                          )}
                        </CheckboxSpan>
                      </CheckboxLabel>
                    </CompletionDiv>
                  </div>
                );
              }}
              width={width}
            />
          )}
        </AutoSizer>
      ].filter(Boolean)
    );
  }
}
