// @flow
import {combineFilters} from './combine-filters';
import filterTimeByTimeValueOrValues from './filter-times-combined-time-value-or-values';
import filterTimeByDateValueOrValues from './filter-times-combined-date-value-or-values';
import filterTimeByRecurringDurations from './filter-times-combined-recurring-durations';
import filterTimeByNDurations from './filter-times-by-n-durations';

import type {
  FilterType as FilterTimeByTimeValueOrValues,
  UIProps as UIPropsTimeByTimeValueOrValues
} from './filter-times-combined-time-value-or-values';
import type {
  FilterType as FilterTimeByDateValueOrValues,
  UIProps as UIPropsTimeByDateValueOrValues
} from './filter-times-combined-date-value-or-values';
import type {
  FilterType as FilterTypeTimesByNDurations,
  UIProps as UIPropsTimesByNDurations
} from './filter-times-by-n-durations';
import type {
  FilterType as FilterTypeTimesByRecurringDurations,
  UIProps as UIPropsTimesByRecurringDurations
} from './filter-times-combined-recurring-durations';
import type {FilterCommon} from './filter-types';

export type FilterType = FilterCommon<
  | FilterTimeByTimeValueOrValues
  | FilterTimeByDateValueOrValues
  | FilterTypeTimesByNDurations
  | FilterTypeTimesByRecurringDurations
>;
export type UIProps =
  | UIPropsTimeByTimeValueOrValues
  | UIPropsTimeByDateValueOrValues
  | UIPropsTimesByNDurations
  | UIPropsTimesByRecurringDurations;
export default combineFilters<FilterType, UIProps>([
  {
    label: 'Date',
    filter: filterTimeByDateValueOrValues
  },
  {
    label: 'Time',
    filter: filterTimeByTimeValueOrValues
  },
  {
    label: 'Unit',
    filter: filterTimeByNDurations
  },
  {
    label: 'Each',
    filter: filterTimeByRecurringDurations
  }
]);
