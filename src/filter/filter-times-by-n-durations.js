import React from "react";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import differenceInCalendarWeeks from "date-fns/difference_in_calendar_weeks";
import differerenceInCalendarMonths from "date-fns/difference_in_calendar_months";
import differenceInCalendarQuarters from "date-fns/difference_in_calendar_quarters";
import differenceInDays from "date-fns/difference_in_days";
import differenceInWeeks from "date-fns/difference_in_weeks";
import differerenceInMonths from "date-fns/difference_in_months";
import differenceInQuarters from "date-fns/difference_in_quarters";
import differenceInHours from "date-fns/difference_in_hours";
import startOfHour from "date-fns/start_of_hour";
import styled from "styled-components";

import { Button } from "../button";
import { theme } from "../theme";
import { FilterSelect, FilterInput } from "./filter-styles";
import { validDate } from "./filter-times-common";
import { updateFilter } from "./filter-actions";

import type { FilterComponents, FilterCommon } from "./filter-types";

// // TODO: FilterType is a WIP.  There are like several useful modes for a unit filter:
// // - x-units + the partial current unit (the last six full hours + the past half hour)
// // - x-units (the last six full hours)
// // - entire current unit (the past thirty minutes + the future thirty minutes)
// // - x-units on a rolling basis to the current time (the past six hours of time, rolling, up to this second)
// // I think this payload might be the best way to express this:
// type FilterType =
//   | $ReadOnly<{|
//       filterType: 'UNITS_COMPLETE' | 'UNITS_ROLLING' | 'UNITS_PLUS_PARTIAL',
//       anchor: 'PRESENT' | 'START_OF_DATA' | 'END_OF_DATA',
//       value: number,
//       unit: $Keys<typeof UNITS>
//     |}>
//   | $ReadOnly<{|filterType: 'CURRENT_UNIT', unit: $Keys<typeof UNITS>|}>;

const TYPES = {
  LAST_N: "LAST_N",
  NEXT_N: "NEXT_N"
  // OLDEST_N: 'OLDEST_N',
  // NEWEST_N: 'NEWEST_N'
};

const readableType = {
  LAST_N: "last",
  NEXT_N: "next"
};

const UNITS = {
  QUARTER: "QUARTER",
  MONTH: "MONTH",
  WEEK: "WEEK",
  DAY: "DAY",
  HOUR: "HOUR"
};

const QUICK_PICKS = Object.keys(UNITS).reduce((acc, unit) => {
  if (unit === UNITS.DAY) {
    acc[unit] = [
      {
        name: "Yesterday",
        payload: { filterType: TYPES.LAST_N, full: true, value: 1 }
      },
      { name: "Today", payload: { full: true, value: 0 } },
      {
        name: "Tomorrow",
        payload: { filterType: TYPES.NEXT_N, full: true, value: 1 }
      }
    ];
  } else {
    acc[unit] = [
      {
        name: `Last ${unit.toLowerCase()}`,
        payload: { filterType: TYPES.LAST_N, full: true, value: 1 }
      },
      {
        name: `This ${unit.toLowerCase()}`,
        payload: { full: true, value: 0 }
      },
      {
        name: `Next ${unit.toLowerCase()}`,
        payload: { filterType: TYPES.NEXT_N, full: true, value: 1 }
      }
    ];
  }
  return acc;
}, {});

type BaseFilterType = FilterCommon<
  $ReadOnly<{|
    value: number,
    operator: $Keys<typeof UNITS>,
    full?: boolean
  |}>
>;

type LastNType = {| ...BaseFilterType, +filterType: typeof TYPES.LAST_N |};
type NextNType = {| ...BaseFilterType, +filterType: typeof TYPES.NEXT_N |};

export type UIProps =
  | {| +filterType: typeof TYPES.LAST_N |}
  | {| +filterType: typeof TYPES.NEXT_N |};

export type FilterType = LastNType | NextNType;

const pickForFilter = filter => {
  if (!filter.full) {
    return null;
  }
  const potentialPicks = QUICK_PICKS[filter.operator];
  return potentialPicks.find(
    (pick: { name: string, payload: $Shape<FilterType> }) =>
      (!pick.payload.filterType ||
        pick.payload.filterType === filter.filterType) &&
      filter.value === pick.payload.value
  );
};

const FilterText = filter => {
  const { filterType, not, operator = UNITS.MONTH, value, full } = filter;
  const pick = pickForFilter(filter);
  const description = pick
    ? pick.name
    : `In the ${readableType[filterType]} ${
        value > 1 ? value : ""
      } ${operator.toLowerCase()}${value > 1 ? "s" : ""} ${
        full ? "" : `including this ${operator.toLowerCase()}`
      }`;
  return not ? `Not ${description.toLowerCase()}` : description;
};

const RowDiv = styled.div`
  display: flex;
  line-height: 2rem;
`;

const QuickPickButton = styled(Button)`
  flex: 1;
  margin-bottom: 0.5rem;
  :not(:last-child) {
    margin-right: 0.5rem;
  }
  :disabled {
    background: ${theme(["colors", "primary500"])};
    cursor: auto;
    color: white;
  }
`;

function FilterEditor({ dispatch, filter, disableUnitsOptions }) {
  const currentPick = pickForFilter(filter);
  return (
    <div>
      <RowDiv>
        {QUICK_PICKS[filter.operator].map(pick => (
          <QuickPickButton
            onClick={() =>
              dispatch(
                updateFilter({
                  ...filter,
                  ...pick.payload
                })
              )
            }
            disabled={currentPick === pick}
          >
            {pick.name}
          </QuickPickButton>
        ))}
      </RowDiv>
      <RowDiv>
        {disableUnitsOptions ? (
          <span
            style={{
              fontWeight: "500",
              whiteSpace: "nowrap",
              paddingRight: "0.5rem"
            }}
          >
            {`In the ${readableType[filter.filterType]} `}
          </span>
        ) : (
          <FilterSelect
            value={filter.filterType}
            onChange={e =>
              dispatch(
                updateFilter({
                  ...filter,
                  filterType: e.target.value
                })
              )
            }
          >
            {Object.keys(TYPES).map(x => (
              <option key={x} value={x}>
                {readableType[x]}
              </option>
            ))}
          </FilterSelect>
        )}
        <FilterInput
          type="number"
          min={filter.full ? 0 : 1}
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
        {disableUnitsOptions ? (
          <span
            style={{
              fontWeight: "500",
              whiteSpace: "nowrap"
            }}
          >
            {`${filter.operator.toLowerCase()}s`}
          </span>
        ) : (
          <FilterSelect
            value={filter.operator}
            onChange={e =>
              dispatch(
                updateFilter({
                  ...filter,
                  operator: e.target.value
                })
              )
            }
          >
            {Object.keys(UNITS).map(unit => (
              <option key={unit} value={unit}>
                {`${unit.toLowerCase()}s`}
              </option>
            ))}
          </FilterSelect>
        )}
        {disableUnitsOptions ? null : (
          <FilterSelect
            value={Boolean(filter.full)}
            onChange={e =>
              dispatch(
                updateFilter({
                  ...filter,
                  value:
                    e.currentTarget.value !== "true" && filter.value === 0
                      ? 1
                      : filter.value,
                  full: e.currentTarget.value === "true"
                })
              )
            }
          >
            {[true, false].map(x => (
              <option key={x.toString()} value={x}>
                {x ? "complete" : "to now"}
              </option>
            ))}
          </FilterSelect>
        )}
      </RowDiv>
    </div>
  );
}

const filterOperatorComparator = {
  QUARTER: {
    full: differenceInCalendarQuarters,
    partial: (now, point) => differenceInQuarters(now, point)
  },
  MONTH: {
    full: differerenceInCalendarMonths,
    partial: (now, point) => differerenceInMonths(now, point)
  },
  WEEK: {
    full: differenceInCalendarWeeks,
    partial: (now, point) => differenceInWeeks(now, point)
  },
  DAY: {
    full: differenceInCalendarDays,
    partial: (now, point) => differenceInDays(now, point)
  },
  HOUR: {
    full: (now, point) => differenceInHours(startOfHour(now), point),
    partial: differenceInHours
  }
};

const filterValue = ({ value, operator, filterType, full }) => {
  const now = new Date();
  return x => {
    const time = validDate(x);
    if (!time || time < now === (filterType === TYPES.NEXT_N)) {
      return false;
    }
    const nPast = filterOperatorComparator[operator][full ? "full" : "partial"](
      now,
      time
    );
    if (full && nPast === 0) {
      return false;
    }
    const nUnits = full ? value : value - 1;
    return filterType === TYPES.NEXT_N ? -nPast <= nUnits : nPast <= nUnits;
  };
};

export default ({
  text: FilterText,
  editor: FilterEditor,
  filterValue,
  createFilter: filter => ({
    filterType: TYPES.LAST_N,
    value: 1,
    full: true,
    operator: UNITS.DAY,
    ...(filter || {})
  }),
  reducers: {},
  filterTypes: TYPES
}: FilterComponents<FilterType, UIProps>);
