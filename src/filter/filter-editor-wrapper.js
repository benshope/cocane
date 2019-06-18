// @flow
// TODO(bshope): this file is a wrapper for accepting
// filter ui props in the easiest shape for QL
// to pass them down
import React from 'react';

import {default as filter} from './filter';
import {getDataArray, getDataQueryResults} from './filter-actions';

import type {Bin} from '../histogram';
import type {FilterType} from './filter';
import type {DataArray, FilterData} from './filter-types';

const FilterEditor: any = filter.editor;

type CommonEditorProps = {|
  +filter: FilterType,
  +debounce?: number,
  +enabledTypes?: Object,
  +onChange: Function
|};

type DataAsArrayProps = $ReadOnly<{|
  ...CommonEditorProps,
  data: DataArray
|}>;

export type FilterDataMap = $ReadOnly<{|
  minMax?: FilterData<
    [
      $ReadOnly<{
        min: number,
        max: number
      }>
    ]
  >,
  histogram?: FilterData<$ReadOnlyArray<Bin>>,
  data?: FilterData<$ReadOnlyArray<string>>
|}>;

type DataAsQueryResultsProps = $ReadOnly<{|
  ...CommonEditorProps,
  ...FilterDataMap
|}>;

export function FilterEditorTakingDataAsQueryResults(
  props: DataAsQueryResultsProps
) {
  return (
    <FilterEditor
      {...(filter.reducers[props.filter.filterType]
        ? filter.reducers[props.filter.filterType](
            props,
            getDataQueryResults(props)
          )
        : {})}
      filterType={props.filter.filterType}
      filter={props.filter}
      enabledTypes={props.enabledTypes}
      debounce={props.debounce}
      dispatch={({payload}) => props.onChange(payload)}
    />
  );
}

export function FilterEditorTakingDataAsArray(props: DataAsArrayProps) {
  const {debounce, enabledTypes, onChange} = props;
  return (
    <FilterEditorTakingDataAsQueryResults
      {...(filter.reducers[props.filter.filterType]
        ? filter.reducers[props.filter.filterType](props, getDataArray(props))
        : {})}
      {...{filter: props.filter, debounce, enabledTypes, onChange}}
    />
  );
}
