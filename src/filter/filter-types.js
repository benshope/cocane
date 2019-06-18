// @flow
import type {Node} from 'react';
import type {Bin} from '../histogram';
export type DataPoint = string | number | boolean | null | void;
export type DataArray = $ReadOnlyArray<DataPoint>;

export type Action = {type: string, payload: Object};

type FilterDataLoading = {|
  +status: 'loading'
|};

export type FilterDataLoaded<T> = {|
  +data: T,
  +status: 'loaded'
|};

type FilterDataError = {|
  +error: Error,
  +status: 'error'
|};

export type FilterCommon<T> = {|
  ...T,
  +id?: string,
  +field?: string,
  +not?: boolean
|};

export type FilterData<T> =
  | FilterDataLoading
  | FilterDataLoaded<T>
  | FilterDataError;

export type EditorProps<Filter, UIProps> = {|
  ...UIProps,
  +filter: FilterCommon<Filter>,
  +dispatch: (action: Action) => void,
  +enabledTypes: {[filterType: string]: string},
  // TEMPORARY PROPS FOR DASHBUILDER LIMITS
  +disableNot?: boolean,
  +disableSelectAll?: boolean,
  +disableNumberOperators?: boolean,
  +disableMatchingOperators?: boolean,
  +disableUnitsOptions?: boolean
|};

type BaseFilterComponent<Filter, UIProps> = {|
  +editor: (props: EditorProps<Filter, UIProps>) => Node,
  +text: (filter: Filter) => Node,
  +filterValue?: (filter: Filter) => (value: DataPoint) => boolean,
  +filterAll?: (filter: {...Filter, field: string}) => (
    values: DataArray
  ) => DataArray,
  +createFilter: (filter?: $Shape<FilterCommon<Filter>>) => Filter
|};

export type FilterComponent<FilterType, UIProps> = {|
  ...BaseFilterComponent<FilterCommon<FilterType>, UIProps>,
  +reducers?: (state: Object, action: Action) => Object,
  +filterType: string
|};

export type FilterComponents<FilterType, UIProps> = {|
  ...BaseFilterComponent<FilterCommon<FilterType>, UIProps>,
  +reducers: {[filterType: string]: (state: Object, action: Object) => Object},
  +filterTypes: {[filterType: string]: string}
|};

export type NumbersCreator = (data: DataArray) => $ReadOnlyArray<number>;
export type ExtentCreator = (data: DataArray) => [number, number];
export type HistogramCreator = (data: DataArray) => $ReadOnlyArray<Bin>;
