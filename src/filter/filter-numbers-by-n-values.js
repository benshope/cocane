import React from "react";
import groupBy from "lodash/fp/groupBy";
import flatten from "lodash/fp/flatten";
import capitalize from "lodash/fp/capitalize";

import { FilterSelect, FilterInput } from "./filter-styles";
import { updateFilter } from "./filter-actions";

import type { FilterComponents } from "./filter-types";

const TYPES = {
  TOP_N: "TOP_N",
  BOTTOM_N: "BOTTOM_N"
};

const readableTypes = {
  TOP_N: "top",
  BOTTOM_N: "bottom"
};

const OPERATORS = {
  NONE: "NONE",
  SUM: "SUM",
  COUNT: "COUNT"
};

const readableOperators = {
  NONE: "by value",
  SUM: "by sum",
  COUNT: "by count"
};

type BaseFilterType = {|
  +operator: $Keys<typeof OPERATORS>,
  +value: number
|};
type TopNType = {| ...BaseFilterType, +filterType: typeof TYPES.TOP_N |};
type BottomNType = {| ...BaseFilterType, +filterType: typeof TYPES.BOTTOM_N |};
export type FilterType = TopNType | BottomNType;
export type UIProps =
  | {| +filterType: typeof TYPES.TOP_N |}
  | {| +filterType: typeof TYPES.BOTTOM_N |};

const FilterText = ({ filterType, operator, bottom, not, value }) => {
  const description = `The ${readableTypes[filterType]} ${value} grouped ${
    readableOperators[operator]
  }`;
  return not ? `Not ${description.toLowerCase()}` : description;
};

function FilterEditor({ dispatch, filter }) {
  return (
    <div style={{ display: "flex", lineHeight: "2em" }}>
      <FilterSelect
        value={filter.filterType}
        onChange={e => {
          dispatch(
            updateFilter({
              ...filter,
              filterType: e.currentTarget.value
            })
          );
        }}
      >
        {Object.keys(TYPES).map(x => (
          <option key={x} value={x}>
            {capitalize(readableTypes[x])}
          </option>
        ))}
      </FilterSelect>
      <FilterInput
        type="number"
        min="1"
        step="1"
        onChange={e =>
          dispatch(
            updateFilter({
              ...filter,
              value: parseInt(e.currentTarget.value, 10)
            })
          )
        }
        value={filter.value}
      />
      <FilterSelect
        value={filter.operator}
        onChange={e =>
          dispatch(
            updateFilter({
              ...filter,
              operator: e.currentTarget.value
            })
          )
        }
      >
        {Object.keys(OPERATORS).map(x => (
          <option key={x} value={x}>
            {readableOperators[x]}
          </option>
        ))}
      </FilterSelect>
    </div>
  );
}

type SortForOperator = {
  [key: $Keys<typeof OPERATORS>]: (
    field: string,
    a: $ReadOnlyArray<{ [field: string]: number }>,
    b: $ReadOnlyArray<{ [field: string]: number }>
  ) => number
};

const sortForOperator: SortForOperator = {
  NONE: (field, a, b) => b[0][field] - a[0][field],
  SUM: (field, a, b) => b.length * b[0][field] - a.length * a[0][field],
  COUNT: (field, a, b) => b.length - a.length
};

const filterFn = filter => field => values => {
  const sortedGroups = Object.values(
    groupBy(f => f[filter.field], values)
  ).sort((a: any, b: any) =>
    sortForOperator[filter.operator](filter.field, a, b)
  );
  const sliceArgs = filter.not
    ? [filter.value, values.length - 1]
    : [0, filter.value];
  return flatten(
    (filter.filterType === TYPES.BOTTOM_N
      ? sortedGroups.reverse()
      : sortedGroups
    ).slice(...sliceArgs)
  );
};

export default ({
  text: FilterText,
  editor: FilterEditor,
  filterAll: (filterFn: any),
  createFilter: filter => ({
    filterType: TYPES.TOP_N,
    value: 1,
    operator: OPERATORS.NONE,
    ...(filter || {})
  }),
  reducers: {},
  filterTypes: TYPES
}: FilterComponents<FilterType, UIProps>);
