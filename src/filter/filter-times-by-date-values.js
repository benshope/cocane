// @flow
import {differenceInCalendarDays} from 'date-fns';

import type {
  FilterLinearRange,
  FilterLinearUIProps
} from './filter-generic-linear';
import {
  FilterEditorLinearRange,
  VALUES_OPERATORS
} from './filter-generic-linear';
import {
  dateFormatter,
  validDateNumber,
  validDate,
  filterDateReducers
} from './filter-times-common';
import {updateFilter} from './filter-actions';

import type {FilterComponent} from './filter-types';

const TYPE = 'DATE_RANGE';

export type UIProps = {|
  ...FilterLinearUIProps,
  +filterType: typeof TYPE
|};
export type FilterType = {|
  ...FilterLinearRange,
  +filterType: typeof TYPE,
  +timezone?: string
|};

const FilterText = ({not, value, timezone, type}) => {
  if (!validDate(value[0]) || !validDate(value[1])) {
    return 'Invalid value';
  }
  const description = `${dateFormatter.format(
    value[0]
  )} to ${dateFormatter.format(value[1])} ${timezone || ''}`;
  return not ? `Not ${description.toLowerCase()}` : description;
};

const FilterEditor = p => {
  const {
    dispatch,
    extent,
    histogram,
    filter: {value}
  } = p;
  return FilterEditorLinearRange({
    extent,
    histogram,
    value: [...value],
    operator: VALUES_OPERATORS.BETWEEN,
    onChange: v => dispatch(updateFilter({...p.filter, value: v})),
    inputType: 'date'
  });
};

export const isTimeBetweenDays = (value: [number, number], point: number) =>
  differenceInCalendarDays(new Date(value[0]), new Date(point)) <= 0 &&
  differenceInCalendarDays(new Date(value[1]), new Date(point)) >= 0;

export default ({
  text: FilterText,
  editor: FilterEditor,
  filterValue: ({value}) => dataPoint => {
    const datePoint = validDateNumber(dataPoint);
    return typeof datePoint === 'number' && isTimeBetweenDays(value, datePoint);
  },
  createFilter: filter => {
    return {
      filterType: TYPE,
      value: [-Infinity, Infinity],
      ...(filter || {})
    };
  },
  reducers: filterDateReducers,
  filterType: TYPE
}: FilterComponent<FilterType, UIProps>);
