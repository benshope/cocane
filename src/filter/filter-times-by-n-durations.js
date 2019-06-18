// @flow
import React from 'react';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks';
import differerenceInCalendarMonths from 'date-fns/difference_in_calendar_months';
import differenceInCalendarQuarters from 'date-fns/difference_in_calendar_quarters';
import differenceInDays from 'date-fns/difference_in_days';
import differenceInWeeks from 'date-fns/difference_in_weeks';
import differerenceInMonths from 'date-fns/difference_in_months';
import differenceInQuarters from 'date-fns/difference_in_quarters';
import differenceInHours from 'date-fns/difference_in_hours';
import startOfHour from 'date-fns/start_of_hour';
import styled from 'styled-components';

import {FilterSelect, FilterInput} from './filter-styles';
import {validDate} from './filter-times-common';
import {updateFilter} from './filter-actions';

import type {FilterComponents, FilterCommon} from './filter-types';

const TYPES = {
  LAST_N: 'LAST_N',
  NEXT_N: 'NEXT_N'
  // OLDEST_N: 'OLDEST_N', // TODO this would need to be an aggregation
  // NEWEST_N: 'NEWEST_N'
};

const readableType = {
  LAST_N: 'last',
  NEXT_N: 'next'
};

const UNITS = {
  QUARTER: 'QUARTER',
  MONTH: 'MONTH',
  WEEK: 'WEEK',
  DAY: 'DAY',
  HOUR: 'HOUR'
};

type BaseFilterType = FilterCommon<{|
  +value: number,
  +operator: $Keys<typeof UNITS>,
  +full?: boolean
|}>;

type LastNType = {|...BaseFilterType, +filterType: typeof TYPES.LAST_N|};
type NextNType = {|...BaseFilterType, +filterType: typeof TYPES.NEXT_N|};

export type UIProps =
  | {|+filterType: typeof TYPES.LAST_N|}
  | {|+filterType: typeof TYPES.NEXT_N|};
export type FilterType = LastNType | NextNType;

const FilterText = ({filterType, not, operator = UNITS.MONTH, value, full}) => {
  const description = `In the ${readableType[filterType]} ${
    value > 1 ? value : ''
  } ${operator.toLowerCase()}${value > 1 ? 's' : ''} ${
    full ? `including this ${operator.toLowerCase()}` : ''
  }`;
  return not ? `Not ${description.toLowerCase()}` : description;
};

const FilterEditorWrapperDiv = styled.div`
  display: flex;
  line-height: 2rem;
`;

function FilterEditor({dispatch, filter, disableUnitsOptions}) {
  return (
    <FilterEditorWrapperDiv>
      {disableUnitsOptions ? (
        <span
          style={{
            fontWeight: '500',
            whiteSpace: 'nowrap',
            paddingRight: '0.5rem'
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
        defaultValue={1}
      />
      {disableUnitsOptions ? (
        <span
          style={{
            fontWeight: '500',
            whiteSpace: 'nowrap',
            paddingLeft: '0.5rem'
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
                full: e.currentTarget.value === 'true'
              })
            )
          }
        >
          {[true, false].map(x => (
            <option key={x.toString()} value={x}>
              {`${
                x ? 'including' : 'excluding'
              } this ${filter.operator.toLowerCase()}`}
            </option>
          ))}
        </FilterSelect>
      )}
    </FilterEditorWrapperDiv>
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

const filterValue = ({value, operator, filterType, full}) => {
  const now = new Date();
  return x => {
    const time = validDate(x);
    if (!time || time < now === (filterType === TYPES.NEXT_N)) {
      return false;
    }
    const nPast = filterOperatorComparator[operator][full ? 'full' : 'partial'](
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
    operator: UNITS.DAY,
    ...(filter || {})
  }),
  reducers: {},
  filterTypes: TYPES
}: FilterComponents<FilterType, UIProps>);
