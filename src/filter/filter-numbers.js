// @flow
import {combineFilters} from './combine-filters';
import filterNumbersByValue from './filter-numbers-by-value';
import filterNumbersByValues from './filter-numbers-by-values';
import filterNumbersByTopN from './filter-numbers-by-n-values';

import type {
  FilterType as FilterTypeNumbersByValue,
  UIProps as UIPropsNumbersByValue
} from './filter-numbers-by-value';
import type {
  FilterType as FilterTypeNumbersByValues,
  UIProps as UIPropsNumbersByValues
} from './filter-numbers-by-values';
import type {
  FilterType as FilterTypeNumbersByTopN,
  UIProps as UIPropsNumbersByTopN
} from './filter-numbers-by-n-values';
import type {FilterCommon} from './filter-types';

export type UIProps =
  | UIPropsNumbersByValue
  | UIPropsNumbersByValues
  | UIPropsNumbersByTopN;
export type FilterType = FilterCommon<
  FilterTypeNumbersByValue | FilterTypeNumbersByValues | FilterTypeNumbersByTopN
>;

export default combineFilters<FilterType, UIProps>(
  [
    {label: 'Slider', filter: filterNumbersByValue},
    {label: 'Range', filter: filterNumbersByValues},
    {label: 'Relative', filter: filterNumbersByTopN}
  ],
  true
);
