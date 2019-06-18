import React from "react";

import { FilterSelect, FilterInput } from "./filter-styles";
import { updateFilter } from "./filter-actions";

import type { FilterComponents } from "./filter-types";

const TYPES = {
  INCLUDES: "INCLUDES",
  STARTS_WITH: "STARTS_WITH",
  ENDS_WITH: "ENDS_WITH"
};

const readableTypes = {
  INCLUDES: "Containing",
  STARTS_WITH: "Starting with",
  ENDS_WITH: "Ending with"
};

const presentTenseTypes = {
  INCLUDES: "Contains",
  STARTS_WITH: "Starts with",
  ENDS_WITH: "Ends with"
};

type BaseFilterType = {|
  +value: string,
  +isCaseSensitive?: boolean
|};

type IncludesType = {| ...BaseFilterType, +filterType: typeof TYPES.INCLUDES |};
type StartsWithType = {|
  ...BaseFilterType,
  filterType: typeof TYPES.STARTS_WITH
|};
type EndsWithType = {|
  ...BaseFilterType,
  +filterType: typeof TYPES.ENDS_WITH
|};

export type UIProps =
  | {| +filterType: typeof TYPES.INCLUDES |}
  | {| +filterType: typeof TYPES.STARTS_WITH |}
  | {| +filterType: typeof TYPES.ENDS_WITH |};
export type FilterType = IncludesType | StartsWithType | EndsWithType;

function FilterText({ filterType, value, not, isCaseSensitive }) {
  const description = `${readableTypes[filterType]} "${value}"${
    isCaseSensitive ? " (case-sensitive)" : ""
  }`;
  return not ? `Not ${description.toLowerCase()}` : description;
}

function FilterEditor({ filter, disableMatchingOperators, data, dispatch }) {
  // TODO add highlighted list of values
  return (
    <div
      key="filter-strings-matching"
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {!disableMatchingOperators && (
        <FilterSelect
          name="match-type"
          value={filter.filterType}
          onChange={e =>
            dispatch(
              updateFilter({ ...filter, filterType: e.currentTarget.value })
            )
          }
        >
          {Object.keys(TYPES).map(x => (
            <option key={x} value={x}>
              {presentTenseTypes[x]}
            </option>
          ))}
        </FilterSelect>
      )}
      <FilterInput
        type="string"
        defaultValue={filter && filter.value}
        placeholder={`String to match`}
        onChange={e =>
          dispatch(updateFilter({ ...filter, value: e.currentTarget.value }))
        }
      />
      {!disableMatchingOperators && (
        <FilterSelect
          name="case-sensitive"
          value={Boolean(filter.isCaseSensitive)}
          onChange={e =>
            dispatch(
              updateFilter({
                ...filter,
                isCaseSensitive: e.currentTarget.value === "true"
              })
            )
          }
        >
          {[true, false].map(x => (
            <option key={x.toString()} value={x}>
              {x ? "case sensitive" : "case insensitive"}
            </option>
          ))}
        </FilterSelect>
      )}
    </div>
  );
}

const filterFunctionByType = {
  INCLUDES: (x, y) => x.includes(y),
  STARTS_WITH: (x, y) => x.startsWith(y),
  ENDS_WITH: (x, y) => x.endsWith(y)
};

const filterFn = filter => {
  const filterFunction = filterFunctionByType[filter.filterType];
  const filterValue = filter.isCaseSensitive
    ? filter.value
    : filter.value.toLowerCase();
  return value =>
    typeof value === "string" &&
    filterFunction(
      filter.isCaseSensitive ? value : value.toLowerCase(),
      filterValue
    );
};

export default ({
  text: FilterText,
  editor: FilterEditor,
  filterValue: filterFn,
  createFilter: filter => ({
    filterType: TYPES.INCLUDES,
    value: "",
    not: true,
    ...(filter || {})
  }),
  reducers: {},
  filterTypes: TYPES
}: FilterComponents<FilterType, UIProps>);
