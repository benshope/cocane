// @flow
import React from 'react';
import {default as lodashDebounce} from 'lodash/fp/debounce';

import {ErrorBoundary} from '../error';
import Checkbox from '../checkbox';
import {combineFilters} from './combine-filters';
import filterNumbers from './filter-numbers';
import filterStrings from './filter-strings';
import filterTimes from './filter-times';
import {updateFilter, UPDATE_FILTER} from './filter-actions';

import type {
  FilterType as NumbersFilter,
  UIProps as UIPropsNumbersFilter
} from './filter-numbers';
import type {
  FilterType as StringsFilter,
  UIProps as UIPropsStringsFilter
} from './filter-strings';
import type {
  FilterType as TimesFilter,
  UIProps as UIPropsTimesFilter
} from './filter-times';
import type {EditorProps, DataPoint, FilterCommon} from './filter-types';

export type UIProps =
  | UIPropsNumbersFilter
  | UIPropsStringsFilter
  | UIPropsTimesFilter;
export type FilterType = FilterCommon<
  TimesFilter | NumbersFilter | StringsFilter
>;
export type {FilterData} from './filter-types';
export type {FilterDataMap} from './filter-editor-wrapper';

const combinedFilters = combineFilters<FilterType, UIProps>([
  {filter: filterTimes},
  {filter: filterNumbers},
  {filter: filterStrings}
]);
const combinedFiltersWithButtons = combineFilters<FilterType, UIProps>([
  {
    label: 'Time',
    filter: filterTimes
  },
  {
    label: 'Number',
    filter: filterNumbers
  },
  {
    label: 'String',
    filter: filterStrings
  }
]);

const FilterEditorFactory = Editor => {
  const FilterEditor = (props: EditorProps<FilterType, UIProps>) => {
    return (
      <ErrorBoundary>
        <Editor {...props} />
        {!props.disableNot && (
          <div style={{margin: '0.25rem 0', marginTop: '1rem'}}>
            <label>
              <Checkbox
                checked={Boolean(props.filter && props.filter.not)}
                onChange={e => {
                  props.dispatch(
                    updateFilter(
                      ({...props.filter, not: e.currentTarget.checked}: any)
                    )
                  );
                }}
              />
              {` Exclude`}
            </label>
          </div>
        )}
      </ErrorBoundary>
    );
  };
  return FilterEditor;
};

const FilterEditor: any = FilterEditorFactory(combinedFilters.editor);
const FilterEditorWithButtons = FilterEditorFactory(
  combinedFiltersWithButtons.editor
);

export const filterWithTypeButtons = {
  ...combinedFiltersWithButtons,
  editor: FilterEditorWithButtons
};

export function filterData(
  data: $ReadOnlyArray<{[field: string]: DataPoint}>,
  filters: $ReadOnlyArray<{...FilterType, not?: boolean, field: string}>
): $ReadOnlyArray<{[field: string]: DataPoint}> {
  if (!filters || !filters.length) {
    return data;
  }
  if (!data || !data.length) {
    return [];
  }
  // TODO add try/catches
  // TODO precompute filters
  const filteredByPoint: $ReadOnlyArray<{
    [field: string]: DataPoint
  }> = (data: any).filter(point => {
    return (filters || []).every(filter => {
      const filterValueFn = (combinedFilters.filterValue: any)(filter);
      return (
        !filterValueFn ||
        Boolean(filter.not) !== Boolean(filterValueFn(point[filter.field]))
      );
    });
  });
  const allFiltersApplied = (filters || []).reduce(
    (d: $ReadOnlyArray<{[field: string]: DataPoint}>, filter) => {
      const filterAllFn = (combinedFilters.filterAll: any)(filter);
      return filterAllFn ? filterAllFn(filter.field)(d) : d;
    },
    filteredByPoint
  );
  return allFiltersApplied;
}

// TODO debounced value to update from props
class DebouncedFilterEditor extends React.Component<
  {|...EditorProps<FilterType, UIProps>, +debounce?: number|},
  FilterCommon<FilterType>
> {
  state = this.props.filter;

  static getDerivedStateFromProps(
    props: EditorProps<FilterType, UIProps>,
    state: FilterType
  ) {
    if (props.filter.filterType !== state.filterType) {
      return {filter: props.filter};
    }
    return null;
  }

  debouncedDispatch = (lodashDebounce: any)(this.props.debounce || 0)(
    action => {
      this.props.dispatch(action);
    }
  );

  dispatch = (action: {type: string, payload: Object}) => {
    if (action.type === UPDATE_FILTER) {
      this.setState((action.payload: any));
      if (
        this.state.filterType &&
        this.state.filterType === action.payload.filterType
      ) {
        this.debouncedDispatch(action);
      } else {
        this.props.dispatch(action);
      }
    } else {
      this.props.dispatch(action);
    }
  };

  render() {
    /* eslint-disable no-unused-vars */
    const {debounce, ...props} = this.props;
    /* eslint-enable no-unused-vars */
    return (
      <FilterEditor {...props} filter={this.state} dispatch={this.dispatch} />
    );
  }
}

const DebouncedFunctionFilterEditor = (p: {|
  ...EditorProps<FilterType, UIProps>,
  +debounce?: number
|}) => <DebouncedFilterEditor {...(p: any)} />;

export default {
  ...combinedFilters,
  editor: DebouncedFunctionFilterEditor
};
