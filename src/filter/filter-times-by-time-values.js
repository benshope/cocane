// @flow
import {
  formatTimeOfDay,
  safeTimeOfDay,
  validTimeNumber,
  filterTimeReducers,
  defaultTimeProps
} from './filter-times-common';
import {updateFilter} from './filter-actions';
import {
  FilterEditorLinearRange,
  isNumberBetweenNumbers,
  VALUES_OPERATORS
} from './filter-generic-linear';

import type {Bin} from '../histogram';
import type {FilterLinearRange} from './filter-generic-linear';
import type {FilterComponent, FilterData} from './filter-types';

const TYPE = 'TIME_RANGE';

export type UIProps = {|
  +histogram: FilterData<$ReadOnlyArray<Bin>>,
  +filterType: typeof TYPE
|};
export type FilterType = {|
  ...FilterLinearRange,
  +filterType: typeof TYPE,
  +timezone?: string
|};

const FilterText = ({not, value, timezone, type}) => {
  const description = `Between ${formatTimeOfDay(
    safeTimeOfDay(value[0])
  )} and ${formatTimeOfDay(safeTimeOfDay(value[1]))} ${timezone || ''}`;
  return not ? `Not ${description.toLowerCase()}` : description;
};

const FilterEditor = p => {
  const {
    histogram,
    filter: {value}
  } = p;
  return FilterEditorLinearRange({
    histogram,
    value: [...value],
    onChange: v => p.dispatch(updateFilter(({...p.filter, value: v}: any))),
    operator: VALUES_OPERATORS.BETWEEN,
    ...defaultTimeProps,
    inputType: 'time'
  });
};

export default ({
  text: FilterText,
  editor: FilterEditor,
  filterValue: ({value}) => dataPoint => {
    const timePoint = validTimeNumber(dataPoint);
    const safeValue = value.map(safeTimeOfDay);
    const safeValueFirstTwo = [safeValue[0], safeValue[1]];
    return (
      typeof timePoint === 'number' &&
      isNumberBetweenNumbers(safeValueFirstTwo, timePoint)
    );
  },
  createFilter: filter => ({
    filterType: TYPE,
    value: [0, 60 * 24],
    ...(filter || {})
  }),
  reducers: filterTimeReducers,
  filterType: TYPE
}: FilterComponent<FilterType, UIProps>);
