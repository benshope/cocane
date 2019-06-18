// @flow
import {combineFilters} from './combine-filters';
import filterStringsExact from './filter-strings-by-list';
import filterStringsMatching from './filter-strings-by-matching';

import type {
  FilterType as FilterTypeStringsExact,
  UIProps as UIPropsStringsExact
} from './filter-strings-by-list';
import type {
  FilterType as FilterTypeStringsMatching,
  UIProps as UIPropsStringsMatching
} from './filter-strings-by-matching';
import type {FilterCommon} from './filter-types';

export type UIProps = UIPropsStringsExact | UIPropsStringsMatching;
export type FilterType = FilterCommon<
  FilterTypeStringsExact | FilterTypeStringsMatching
>;

export default combineFilters<FilterType, UIProps>([
  {label: 'Exact', filter: filterStringsExact},
  {label: 'Matching', filter: filterStringsMatching}
]);
