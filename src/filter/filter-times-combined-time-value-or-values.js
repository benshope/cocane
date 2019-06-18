// @flow
import {combineFilters} from './combine-filters';
import {VALUE_OPERATORS} from './filter-generic-linear';
import filterTimeByValues from './filter-times-by-time-values';
import filterTimeByValue from './filter-times-by-time-value';

import type {
  FilterType as FilterTypeTimeByValues,
  UIProps as UIPropsTimeByValues
} from './filter-times-by-time-values';
import type {
  FilterType as FilterTypeTimeByValue,
  UIProps as UIPropsTimeByValue
} from './filter-times-by-time-value';

export type UIProps = UIPropsTimeByValue | UIPropsTimeByValues;
export type FilterType = FilterTypeTimeByValue | FilterTypeTimeByValues;

export default combineFilters<FilterType, UIProps>(
  [
    {
      label: 'Range',
      filter: filterTimeByValues
    },
    {
      label: 'Before',
      filter: filterTimeByValue,
      operator: VALUE_OPERATORS.LESS_THAN
    },
    {
      label: 'After',
      filter: filterTimeByValue,
      operator: VALUE_OPERATORS.GREATER_THAN
    }
  ],
  true
);
