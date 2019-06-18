import { differenceInCalendarDays } from "date-fns";

import {
  dateFormatter,
  validDateNumber,
  validDate,
  filterDateReducers,
  readableTimeOperator
} from "./filter-times-common";

import type {
  FilterLinearSingle,
  FilterLinearUIProps
} from "./filter-generic-linear";
import {
  FilterEditorLinearSingle,
  VALUE_OPERATORS
} from "./filter-generic-linear";
import { updateFilter } from "./filter-actions";

import type { FilterComponent } from "./filter-types";

const TYPE = "DATE";

export type UIProps = {|
  ...FilterLinearUIProps,
  +filterType: typeof TYPE
|};
export type FilterType = {|
  ...FilterLinearSingle,
  +filterType: typeof TYPE,
  +timezone?: string
|};

const FilterText = ({ filterType, operator, not, value }) => {
  const validDateFromValue = validDate(value);
  if (!validDateFromValue) {
    return "Invalid value";
  }
  const description = `${dateFormatter.format(validDateFromValue)}`;
  const op = readableTimeOperator[operator];
  return not
    ? `Not ${op.toLowerCase()} ${description}`
    : `${op} ${description}`;
};

const FilterEditor = p => {
  const {
    extent,
    histogram,
    filter: { value, operator }
  } = p;
  return FilterEditorLinearSingle({
    extent,
    histogram,
    value,
    onChange: v =>
      p.dispatch(updateFilter(({ ...p.filter, operator, value: v }: any))),
    operator,
    inputType: "date"
  });
};

const filterTimeByDay: {
  [k: $Keys<typeof VALUE_OPERATORS>]: (a: number, b: number) => boolean
} = {
  LESS_THAN: (a, b) => differenceInCalendarDays(new Date(a), new Date(b)) > 0,
  LESS_THAN_OR_EQUAL_TO: (a, b) =>
    differenceInCalendarDays(new Date(a), new Date(b)) >= 0,
  EQUAL_TO: (a, b) => differenceInCalendarDays(new Date(a), new Date(b)) === 0,
  GREATER_THAN_OR_EQUAL_TO: (a, b) =>
    differenceInCalendarDays(new Date(a), new Date(b)) <= 0,
  GREATER_THAN: (a, b) => differenceInCalendarDays(new Date(a), new Date(b)) < 0
};

export default ({
  text: FilterText,
  editor: FilterEditor,
  filterValue: ({ value, operator }) => dataPoint => {
    const datePoint = validDateNumber(dataPoint);
    return (
      typeof datePoint === "number" &&
      filterTimeByDay[operator](value, datePoint)
    );
  },
  createFilter: filter => ({
    filterType: TYPE,
    value:
      (filter && filter.operator === VALUE_OPERATORS.GREATER_THAN) ||
      (filter && filter.operator === VALUE_OPERATORS.GREATER_THAN_OR_EQUAL_TO)
        ? -Infinity
        : Infinity,
    operator: VALUE_OPERATORS.GREATER_THAN,
    ...(filter || {})
  }),
  reducers: filterDateReducers,
  filterType: TYPE
}: FilterComponent<FilterType, UIProps>);
