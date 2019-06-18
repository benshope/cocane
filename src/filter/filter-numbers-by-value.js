// @flow
import React from 'react';

import type {
  FilterLinearSingle,
  FilterLinearUIProps
} from './filter-generic-linear';
import {
  FilterEditorLinearSingle,
  filterNumberByNumber,
  VALUE_OPERATORS
} from './filter-generic-linear';
import {numberFormatter, filterNumberReducers} from './filter-numbers-common';

import {WideButtonGroup} from './filter-styles';
import {updateFilter} from './filter-actions';

import type {FilterComponent} from './filter-types';

const TYPE = 'NUMBER';

const readableOperator = {
  LESS_THAN: 'Less than',
  LESS_THAN_OR_EQUAL_TO: 'Less than or equal to',
  EQUAL_TO: 'Equal to',
  GREATER_THAN_OR_EQUAL_TO: 'Greater than or equal to',
  GREATER_THAN: 'Greater than'
};

const symbolForOperator = {
  LESS_THAN: '<',
  LESS_THAN_OR_EQUAL_TO: '<=',
  EQUAL_TO: '=',
  GREATER_THAN_OR_EQUAL_TO: '>=',
  GREATER_THAN: '>'
};

const FilterText = ({operator, not, value}) => {
  const description = `${readableOperator[operator]} ${numberFormatter(value)}`;
  return not ? `Not ${description.toLowerCase()}` : description;
};

export type UIProps = {|
  ...FilterLinearUIProps,
  +filterType: typeof TYPE,
  +disableNumberOperators?: boolean // TODO this is temporary - for a db flag
|};

export type FilterType = {|
  ...FilterLinearSingle,
  +filterType: typeof TYPE
|};

const FilterEditor = props => {
  const {extent, histogram} = props;
  const {operator = VALUE_OPERATORS.GREATER_THAN, value} = props.filter;
  return (
    <div>
      {!props.disableNumberOperators && (
        <WideButtonGroup>
          {Object.keys(VALUE_OPERATORS).map(op => (
            <button
              title={readableOperator[op]}
              disabled={operator === op}
              onClick={() => {
                return props.dispatch(
                  updateFilter({
                    ...props.filter,
                    operator: op
                  })
                );
              }}
              key={op}
            >
              {symbolForOperator[op]}
            </button>
          ))}
        </WideButtonGroup>
      )}
      {FilterEditorLinearSingle({
        extent,
        histogram,
        value,
        onChange: v =>
          props.dispatch(updateFilter({...props.filter, operator, value: v})),
        operator,
        inputType: 'number'
      })}
    </div>
  );
};

export default ({
  text: FilterText,
  editor: FilterEditor,
  filterValue: ({not, value, operator}) => dataPoint =>
    filterNumberByNumber[operator](parseFloat(value), parseFloat(dataPoint)),
  createFilter: filter => ({
    filterType: TYPE,
    operator: VALUE_OPERATORS.GREATER_THAN,
    value:
      (filter && filter.operator === VALUE_OPERATORS.GREATER_THAN) ||
      (filter && filter.operator === VALUE_OPERATORS.GREATER_THAN_OR_EQUAL_TO)
        ? -Infinity
        : Infinity,
    ...(filter || {})
  }),
  reducers: filterNumberReducers,
  filterType: TYPE
}: FilterComponent<FilterType, UIProps>);
