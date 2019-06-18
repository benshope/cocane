// @flow
import {updateFilter} from './filter-actions';
import type {
  FilterLinearRange,
  FilterLinearUIProps
} from './filter-generic-linear';
import {
  FilterEditorLinearRange,
  isNumberBetweenNumbers,
  VALUES_OPERATORS
} from './filter-generic-linear';
import {numberFormatter, filterNumberReducers} from './filter-numbers-common';

import type {FilterComponent} from './filter-types';

const TYPE = 'NUMBER_RANGE';

export type UIProps = {|
  ...FilterLinearUIProps,
  +filterType: typeof TYPE
|};
export type FilterType = {|
  ...FilterLinearRange,
  +filterType: typeof TYPE
|};

const FilterText = ({operator, not, value}) => {
  const description = `Between ${
    value[0] === -Infinity ? value[0] : numberFormatter(value[0])
  } and ${value[1] === Infinity ? value[1] : numberFormatter(value[1])}`;
  return not ? `Not ${description.toLowerCase()}` : description;
};

const FilterEditor = props => {
  const {
    dispatch,
    extent,
    histogram,
    filter: {value}
  } = props;
  return FilterEditorLinearRange({
    extent,
    histogram,
    value: [...value],
    operator: VALUES_OPERATORS.BETWEEN,
    onChange: v => dispatch(updateFilter({...props.filter, value: v})),
    inputType: 'number'
  });
};

export default ({
  text: FilterText,
  editor: FilterEditor,
  filterValue: ({value, operator}) => dataPoint =>
    isNumberBetweenNumbers(
      [parseFloat(value[0]), parseFloat(value[1])],
      parseFloat(dataPoint)
    ),
  createFilter: filter => ({
    filterType: TYPE,
    value: [-Infinity, Infinity],
    ...(filter || {})
  }),
  reducers: filterNumberReducers,
  filterType: TYPE
}: FilterComponent<FilterType, UIProps>);
