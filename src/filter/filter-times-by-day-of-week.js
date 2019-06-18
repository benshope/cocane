// @flow
import capitalize from 'lodash/fp/capitalize';

import {sentenceJoin} from '../string-utils';
import {FilterOrdinalFactory} from './filter-generic-ordinal';
import {validDate} from './filter-times-common';
import {updateFilter} from './filter-actions';

import type {FilterComponent} from './filter-types';

const TYPE = 'DAY_OF_WEEK';

const VALUES = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY'
];

const FilterText = ({value, not}) => {
  if (!value || !value.length) {
    return `${not ? 'Any' : 'No'} day of the week`;
  }
  const description = sentenceJoin(
    value.map(i => capitalize(VALUES[i])),
    ' or '
  );
  return not ? `Not on ${description}` : `On ${description}`;
};

export type UIProps = {|+filterType: typeof TYPE|};
export type FilterType = {|
  +filterType: typeof TYPE,
  +value: number[],
  +full?: boolean
|};

export default ({
  text: FilterText,
  editor: ({filter, dispatch}) =>
    FilterOrdinalFactory(VALUES)({
      filter,
      onChange: f => dispatch(updateFilter({...filter, value: f.value}))
    }),
  filterValue: ({value, not}) => {
    const valueMap = value.reduce((acc, v) => ({...acc, [v]: true}), {});
    return dataPoint => {
      const datePoint = validDate(dataPoint);
      return datePoint ? valueMap[datePoint.getDay()] : false;
    };
  },
  createFilter: filter => ({
    filterType: TYPE,
    value: [],
    not: true,
    ...(filter || {})
  }),
  filterType: TYPE
}: FilterComponent<FilterType, UIProps>);
