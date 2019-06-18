import {combineFilters} from './combine-filters';
import {VALUE_OPERATORS} from './filter-generic-linear';
import filterTimeByValues from './filter-times-by-date-values';
import filterTimeByValue from './filter-times-by-date-value';

import type {
  FilterType as FilterTypeTimeByValues,
  UIProps as UIPropsTimeByValues
} from './filter-times-by-date-values';
import type {
  FilterType as FilterTypeTimeByValue,
  UIProps as UIPropsTimeByValue
} from './filter-times-by-date-value';

export type UIProps = UIPropsTimeByValues | UIPropsTimeByValue;
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
