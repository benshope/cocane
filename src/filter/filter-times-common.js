import memoize from "memoize-one";
import { extent } from "d3-array";
import window from "global/window";

import { validHistogram } from "./filter-generic-linear";
import {
  UPDATE_FILTER,
  GET_DATA_ARRAY,
  GET_DATA_QUERY_RESULTS
} from "./filter-actions";

import type {
  DataPoint,
  ExtentCreator,
  NumbersCreator,
  Action,
  HistogramCreator
} from "./filter-types";

// eslint-disable-next-line no-undef
const WindowIntl: any = window.Intl || Intl;

export const dateFormatter = new WindowIntl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  day: "numeric"
});

export const timeFormatter = new WindowIntl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric"
});

export const readableTimeOperator = {
  LESS_THAN: "Before",
  LESS_THAN_OR_EQUAL_TO: "Before or on",
  EQUAL_TO: "On",
  GREATER_THAN: "After",
  GREATER_THAN_OR_EQUAL_TO: "After or on"
};

export const defaultTimeProps = {
  extent: { status: "loaded", data: [0, 24 * 60] },
  step: 1
};

// TODO remove after QL is passing back reliable data
export function validDate(dataPoint: DataPoint): ?Date {
  if (
    typeof dataPoint === "string" &&
    dataPoint.length === 10 &&
    dataPoint.indexOf("-") === 4
  ) {
    return new Date(`${dataPoint}T00:00:00`);
  }
  if (
    !dataPoint ||
    typeof dataPoint === "undefined" ||
    typeof dataPoint === "boolean" ||
    isNaN(new Date(dataPoint).getTime())
  ) {
    return undefined;
  }
  return new Date(dataPoint);
}

export function validDateNumber(dataPoint: DataPoint): ?number {
  const pointAsDate = validDate(dataPoint);
  return pointAsDate && pointAsDate.getTime();
}

export function validTimeNumber(dataPoint: DataPoint): ?number {
  const pointAsDate = validDate(dataPoint);
  return pointAsDate && pointAsDate.getHours() * 60 + pointAsDate.getMinutes();
}

const validNumbers = validNum => (data: $ReadOnlyArray<DataPoint>) =>
  data.reduce((acc, point) => {
    const validPoint = validNum(point);
    if (typeof validPoint === "number") {
      acc.push(validPoint);
    }
    return acc;
  }, []);

export const validDateNumbers: NumbersCreator = memoize(
  validNumbers(validDateNumber)
);
export const validTimeNumbers: NumbersCreator = memoize(
  validNumbers(validTimeNumber)
);

export const validDateExtent: ExtentCreator = memoize(data => {
  const computedExtent = extent(validDateNumbers(data));
  return (((typeof computedExtent[0] === "number" &&
  typeof computedExtent[1] === "number"
    ? computedExtent
    : [-Infinity, Infinity]): any): [number, number]);
});

export const validDateHistogram: HistogramCreator = data =>
  validHistogram(validDateNumbers(data));
export const validTimeHistogram: HistogramCreator = data =>
  validHistogram(validTimeNumbers(data));

export const safeTimeOfDay = (value: any): number => {
  const asInt = parseInt(value, 10);
  return !isNaN(asInt) ? asInt : 0;
};

// TODO add unit tests
export const formatTimeOfDay = (minutes: number) => {
  const currentDate = new Date();
  const hours = Math.floor(minutes / 60.0);
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes - hours * 60);
  return timeFormatter.format(currentDate);
};

const filterReducersFactory = reducers => (state: Object, action: Action) => {
  return reducers[action.type] ? reducers[action.type](state, action) : state;
};

const updateFilterReducer = calculators => (_, __) => ({
  ...(calculators.extent
    ? {
        extent: {
          status: "loading"
        }
      }
    : {}),
  histogram: { status: "loading" }
});

const getDataArrayReducer = calculators => (_, { payload: { data } }) => {
  return {
    ...(calculators.extent
      ? {
          minMax: {
            status: "loaded",
            data: [
              {
                min: calculators.extent(data)[0],
                max: calculators.extent(data)[1]
              }
            ]
          }
        }
      : {}),
    histogram: { status: "loaded", data: calculators.histogram(data) }
  };
};

const getDataQueryResultsReducer = calculators => (
  _,
  { payload: { minMax, histogram } }
) => ({
  ...(calculators.extent
    ? {
        extent:
          minMax.status === "loaded"
            ? {
                // TODO set defaults when no data?
                status: "loaded",
                data: [minMax.data[0].min, minMax.data[0].max]
              }
            : minMax
      }
    : {}),
  histogram
});

const filterReducers = calculators =>
  filterReducersFactory({
    [UPDATE_FILTER]: updateFilterReducer(calculators),
    [GET_DATA_ARRAY]: getDataArrayReducer(calculators),
    [GET_DATA_QUERY_RESULTS]: getDataQueryResultsReducer(calculators)
  });

export const filterDateReducers = filterReducers({
  extent: validDateExtent,
  histogram: validDateHistogram
});
export const filterTimeReducers = filterReducers({
  histogram: validTimeHistogram
});
