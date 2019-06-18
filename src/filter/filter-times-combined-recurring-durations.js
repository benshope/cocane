import {combineFilters} from './combine-filters';
import filterTimeByHourOfDay from './filter-times-by-hour-of-day';
import filterTimeByDayOfWeek from './filter-times-by-day-of-week';
import filterTimeByMonthOfYear from './filter-times-by-month-of-year';

import type {
  FilterType as FilterTypeTimesByHourOfDay,
  UIProps as UIPropsTimesByHourOfDay
} from './filter-times-by-hour-of-day';
import type {
  FilterType as FilterTypeTimesByDayOfWeek,
  UIProps as UIPropsTimesByDayOfWeek
} from './filter-times-by-day-of-week';
import type {
  FilterType as FilterTypeTimesByMonthOfYear,
  UIProps as UIPropsTimesByMonthOfYear
} from './filter-times-by-month-of-year';

export type UIProps =
  | UIPropsTimesByHourOfDay
  | UIPropsTimesByDayOfWeek
  | UIPropsTimesByMonthOfYear;
export type FilterType =
  | FilterTypeTimesByHourOfDay
  | FilterTypeTimesByDayOfWeek
  | FilterTypeTimesByMonthOfYear;

export default combineFilters<FilterType, UIProps>([
  {
    label: 'Hour',
    filter: filterTimeByHourOfDay
  },
  {
    label: 'Weekday',
    filter: filterTimeByDayOfWeek
  },
  {
    label: 'Month',
    filter: filterTimeByMonthOfYear
  }
]);
