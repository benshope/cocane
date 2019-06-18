// @flow
import {
  formatTimeOfDay,
  safeTimeOfDay,
  validTimeNumber,
  defaultTimeProps,
  readableTimeOperator,
  filterTimeReducers
} from './filter-times-common';
import {updateFilter} from './filter-actions';
import {
  FilterEditorLinearSingle,
  filterNumberByNumber,
  VALUE_OPERATORS
} from './filter-generic-linear';
import type {Bin} from '../histogram';
import type {FilterLinearSingle} from './filter-generic-linear';
import type {FilterComponent, FilterData} from './filter-types';

const TYPE = 'TIME';

export type UIProps = {|
  +histogram: FilterData<$ReadOnlyArray<Bin>>,
  +filterType: typeof TYPE
|};
export type FilterType = {|
  ...FilterLinearSingle,
  +filterType: typeof TYPE,
  +timezone?: string
|};

const FilterText = ({filterType, operator, not, value, timezone}) => {
  const description = `${readableTimeOperator[operator]} ${formatTimeOfDay(
    safeTimeOfDay(value)
  )} ${timezone || ''}`;
  return not ? `Not ${description.toLowerCase()}` : description;
};

const FilterEditor = p => {
  const {
    histogram,
    filter: {value, operator}
  } = p;
  return FilterEditorLinearSingle({
    histogram,
    value,
    onChange: v => p.dispatch(updateFilter(({...p.filter, value: v}: any))),
    operator,
    ...defaultTimeProps,
    inputType: 'time'
  });
};

export default ({
  text: FilterText,
  editor: FilterEditor,
  filterValue: ({value, operator}) => dataPoint => {
    const timePoint = validTimeNumber(dataPoint);
    return (
      typeof timePoint === 'number' &&
      filterNumberByNumber[operator](safeTimeOfDay(value), timePoint)
    );
  },
  createFilter: filter => ({
    filterType: TYPE,
    value: 0,
    operator: VALUE_OPERATORS.GREATER_THAN,
    ...(filter || {})
  }),
  reducers: filterTimeReducers,
  filterType: TYPE
}: FilterComponent<FilterType, UIProps>);
