import React from "react";
import memoize from "memoize-one";

import { sentenceJoin } from "../string-utils";
import MultiSelect from "../multi-select";
import {
  UPDATE_FILTER,
  GET_DATA_ARRAY,
  GET_DATA_QUERY_RESULTS,
  updateFilter
} from "./filter-actions";

import type { FilterComponent, Action, FilterData } from "./filter-types";

const TYPE = "LIST";

export type UIProps = {|
  +filterType: typeof TYPE,
  +data: FilterData<string[]>
|};
export type FilterType = {|
  +filterType: typeof TYPE,
  +value: string[]
|};

function FilterText({ not, value }) {
  if (!value || !value.length) {
    return `${not ? "Any" : "No"} value`;
  }
  const descriptionValues = sentenceJoin(value, " and ");
  const description =
    value.length > 3
      ? `${value.length} values: ${descriptionValues}`
      : descriptionValues;
  return not ? `Not ${description.toLowerCase()}` : description;
}

function FilterEditor(props) {
  const { filter, disableSelectAll, dispatch, data } = props;
  // TODO: make empty state better
  // TODO: make loading state better
  return data.status === "loaded" && data.data.length ? (
    <div>
      <MultiSelect
        key="select-filter-values"
        placeholder="Search values..."
        disableSelectAll={disableSelectAll}
        selected={(filter && filter.value) || []}
        options={data.data}
        onChange={values =>
          dispatch(
            updateFilter({
              ...filter,
              value: values
            })
          )
        }
        exclude={filter.not}
      />
    </div>
  ) : (
    "No values to filter"
  );
}

const memoizeAsStrings = memoize(data => data.map(x => x.toString()));

const getDataArrayReducer = (_, { payload: { data } }) => ({
  data: { status: "loaded", data: memoizeAsStrings(data) }
});

const getDataQueryResultsReducer = (_, { payload: { data } }) => ({
  data
});

const updateFilterReducer = (_, __) => ({
  data: { status: "loading" }
});

export default ({
  text: FilterText,
  editor: FilterEditor,
  filterValue: filter => {
    const valuesMap = (filter.value || []).reduce((acc, x) => {
      acc[x] = true;
      acc[x.toString()] = true;
      return acc;
    }, {});
    return value => (value ? Boolean(valuesMap[value.toString()]) : false);
  },
  createFilter: filter => ({
    filterType: TYPE,
    value: [],
    ...(filter || {})
  }),
  reducers: (state: Object, action: Action) => {
    const reducerForAction = {
      [UPDATE_FILTER]: updateFilterReducer,
      [GET_DATA_ARRAY]: getDataArrayReducer,
      [GET_DATA_QUERY_RESULTS]: getDataQueryResultsReducer
    }[action.type];
    return reducerForAction ? reducerForAction(state, action) : state;
  },
  filterType: TYPE
}: FilterComponent<FilterType, UIProps>);
