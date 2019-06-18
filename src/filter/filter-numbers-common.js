import { format } from "d3-format";
import { extent } from "d3-array";
import memoize from "memoize-one";

import { validHistogram } from "./filter-generic-linear";
import {
  UPDATE_FILTER,
  GET_DATA_ARRAY,
  GET_DATA_QUERY_RESULTS
} from "./filter-actions";
import type { Action, NumbersCreator, ExtentCreator } from "./filter-types";

// TOOD: this formatting is an arbitrary decsion
export const numberFormatter = (x: number) =>
  (x < 1000 ? format(",") : x < 10000 ? format(".3s") : format(".2s"))(x);

export const memoizeParseFloat: NumbersCreator = memoize(data =>
  data.map(x => parseFloat(x))
);

export const memoizedExtent: ExtentCreator = memoize(data => {
  const [min, max] = extent(memoizeParseFloat(data));
  return typeof min === "number" && typeof max === "number"
    ? [min, max]
    : [-Infinity, Infinity];
});

const updateFilterReducer = (_, __) => ({
  extent: { status: "loading" },
  histogram: { status: "loading" }
});

// TODO remove during QL integration
const getDataArrayReducer = (_, { payload: { data } }) => {
  return {
    minMax: {
      status: "loaded",
      data: [
        {
          min: memoizedExtent(data)[0],
          max: memoizedExtent(data)[1]
        }
      ]
    },
    histogram: {
      status: "loaded",
      data: validHistogram(memoizeParseFloat(data))
    }
  };
};

const getDataQueryResultsReducer = (_, { payload: { minMax, histogram } }) => ({
  extent:
    minMax.status === "loaded"
      ? {
          // TODO set defaults when no data?
          status: "loaded",
          data: [minMax.data[0].min, minMax.data[0].max]
        }
      : minMax,
  histogram
});

export const filterNumberReducers = (state: Object, action: Action) => {
  const reducerForAction = {
    [UPDATE_FILTER]: updateFilterReducer,
    [GET_DATA_ARRAY]: getDataArrayReducer,
    [GET_DATA_QUERY_RESULTS]: getDataQueryResultsReducer
  }[action.type];
  return reducerForAction ? reducerForAction(state, action) : state;
};
