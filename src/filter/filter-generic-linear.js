import React from "react";
import { extent as d3Extent, histogram as d3Histogram } from "d3-array";
import { scaleLinear } from "d3-scale";
import memoize from "memoize-one";

import {
  sensibleStep,
  LockedInputs,
  HighlightedRangeInputs,
  combinedInputs
} from "../inputs";
import BrushableHistogram from "./filter-brush-histogram";

import type { Bin } from "../histogram";
import type { FilterData } from "./filter-types";

export const VALUE_OPERATORS = {
  LESS_THAN: "LESS_THAN",
  LESS_THAN_OR_EQUAL_TO: "LESS_THAN_OR_EQUAL_TO",
  EQUAL_TO: "EQUAL_TO",
  GREATER_THAN_OR_EQUAL_TO: "GREATER_THAN_OR_EQUAL_TO",
  GREATER_THAN: "GREATER_THAN"
};

export const VALUES_OPERATORS = {
  BETWEEN: "BETWEEN"
};

export type FilterLinearRange = {|
  +value: [number, number]
|};

export type FilterLinearUIProps = {|
  +histogram?: FilterData<$ReadOnlyArray<Bin>>,
  +extent?: FilterData<[number, number]>
|};

export type FilterLinearSingle = {|
  +value: number,
  +operator: $Keys<typeof VALUE_OPERATORS>
|};

export const highlightIndex = ({
  operator,
  not
}: {
  operator: string,
  not?: boolean
}) => (i: number) =>
  (operator === VALUES_OPERATORS.BETWEEN
    ? !(i % 2)
    : operator === VALUE_OPERATORS.EQUAL_TO
    ? true
    : Boolean(i % 2) ===
      {
        [VALUE_OPERATORS.LESS_THAN]: true,
        [VALUE_OPERATORS.LESS_THAN_OR_EQUAL_TO]: true,
        [VALUE_OPERATORS.EQUAL_TO]: false,
        [VALUE_OPERATORS.GREATER_THAN_OR_EQUAL_TO]: false,
        [VALUE_OPERATORS.GREATER_THAN]: false
      }[operator]) === Boolean(not);

export type FilterLinearProps = {|
  +not?: boolean,
  +inputType: "date" | "time" | "number",
  +step?: number,
  ...FilterLinearUIProps
|};

export function FilterEditorLinearRange({
  value,
  operator,
  not,
  onChange,
  inputType,
  histogram,
  step,
  extent
}: {|
  ...FilterLinearProps,
  +operator: $Keys<typeof VALUE_OPERATORS> | $Keys<typeof VALUES_OPERATORS>,
  +value: number[],
  +onChange: (value: number[]) => void
|}) {
  // TODO(bshope): improve error and loading states
  if (extent && extent.status === "loaded") {
    const [min, max] = extent.data;
    return (
      <LockedInputs
        value={value}
        onChange={onChange}
        render={({ keyPrefix, onChange: childOnChange }) => {
          const childProps = {
            value: value.map(v =>
              v === -Infinity ? min : v === Infinity ? max : v
            ),
            min,
            max,
            highlightIndex: highlightIndex({ operator, not }),
            onChange: childOnChange
          };
          return (
            <React.Fragment>
              {histogram ? (
                <BrushableHistogram
                  key={`${keyPrefix}-histogram`}
                  histogram={histogram}
                  {...childProps}
                />
              ) : null}
              <HighlightedRangeInputs
                key={`${keyPrefix}-range-inputs`}
                operator={operator}
                {...childProps}
              />
              {combinedInputs(inputType)({
                key: `${keyPrefix}-combo-inputs`,
                step: step || sensibleStep(extent.data),
                ...childProps
              })}
            </React.Fragment>
          );
        }}
      />
    );
  }
  return null;
}

export function FilterEditorLinearSingle({
  onChange,
  value,
  ...props
}: {|
  ...FilterLinearProps,
  +operator: $Keys<typeof VALUE_OPERATORS> | $Keys<typeof VALUES_OPERATORS>,
  +value: number,
  +onChange: (value: number) => void
|}) {
  return (
    <FilterEditorLinearRange
      {...props}
      onChange={v => onChange(v[0])}
      value={[value]}
    />
  );
}

export const filterNumberByNumber: {
  [k: string]: (a: number, b: number) => boolean
} = {
  LESS_THAN: (a, b) => a > b,
  LESS_THAN_OR_EQUAL_TO: (a, b) => a >= b,
  EQUAL_TO: (a, b) => a === b,
  GREATER_THAN_OR_EQUAL_TO: (a, b) => a <= b,
  GREATER_THAN: (a, b) => a < b
};

export const isNumberBetweenNumbers = (
  value: [number, number],
  point: number
) => value[0] <= point && point <= value[1];

export const validHistogram = memoize((values: $ReadOnlyArray<number>) => {
  const MIN_BAR_WIDTH = 8;
  const x = scaleLinear()
    .domain(d3Extent(values))
    .range([0, 300])
    .nice();
  return d3Histogram()
    .domain(x.domain())
    .thresholds(x.ticks(Math.min(values.length, 300 / MIN_BAR_WIDTH)))(values);
});
