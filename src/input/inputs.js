// @flow
import React, {type Node} from 'react';
import padCharsStart from 'lodash/fp/padCharsStart';
import {bisectLeft, pairs} from 'd3-array';
import {timeFormat} from 'd3-time-format';
import styled from 'styled-components';

import {theme, ux2019LightTheme as lightTheme} from './theme';
import {
  Input,
  RangeInput,
  RangeInputsWrapperDiv,
  HighlightsDiv,
  RangeWithHighlightsDiv
} from './inputs-styles';

type LockedValue = number | number[];

type InputType = 'range' | 'number' | 'date' | 'time' | 'datetime-local';

type LockedInputsState = {value?: LockedValue};

type StateReducer = (
  nextValue: LockedInputsState,
  currentValue: LockedInputsState
) => LockedInputsState;

type LockedInputsProps = $ReadOnly<{
  value?: LockedValue,
  defaultValue?: LockedValue,
  onChange: Function,
  stateReducer: StateReducer,
  render: ({
    keyPrefix: string,
    onChange: Function,
    value?: LockedValue
  }) => Node
}>;

type LockedInputsDefaultProps = {
  stateReducer: (state: LockedInputsState) => LockedInputsState
};

type HighlightProps = {
  start: number,
  end: number,
  isHighlighted: boolean
};

type HighlightsProps = {
  min: number,
  max: number,
  value: number[],
  highlightIndex?: (i: number) => boolean,
  overrides?: {
    highlight?: any,
    highlights?: any
  }
};

// single highlight - not a styled component for performance reasons
const HighlightComponent = ({start, end, isHighlighted}: HighlightProps) =>
  isHighlighted ? (
    <div
      style={{
        left: `${start * 100}%`,
        position: 'absolute',
        background: lightTheme.colors.primary500,
        width: `${(end - start) * 100}%`,
        height: `100%`
      }}
    />
  ) : null;

// renders highlights for a range slider
export const Highlights = ({
  min,
  max,
  value,
  highlightIndex = () => false,
  overrides
}: HighlightsProps) => {
  const range = Math.abs(min - max);
  const HighlightsWrapper =
    (overrides && overrides.highlights) || HighlightsDiv;
  const Highlight = (overrides && overrides.highlight) || HighlightComponent;
  return (
    <HighlightsWrapper>
      {pairs(
        [min, ...(value || []).sort((a, b) => a - b), max].map(
          v => (v - min) / range
        )
      ).map(([start, end], i) => {
        return (
          <Highlight
            key={i}
            isHighlighted={highlightIndex(i)}
            start={start}
            end={end}
          />
        );
      })}
    </HighlightsWrapper>
  );
};

// locks the value of several inputs together
export class LockedInputs extends React.Component<
  LockedInputsProps,
  LockedInputsState
> {
  state = {value: this.props.value || this.props.defaultValue};
  static defaultProps: LockedInputsDefaultProps = {stateReducer: x => x};

  // TODO: there might be a simpler way to do this
  static getDerivedStateFromProps(
    props: LockedInputsProps,
    state: LockedInputsState
  ) {
    if (
      typeof props.value === 'object' &&
      (typeof props.value !== typeof state.value ||
        (typeof props.value === 'object' &&
          typeof state.value === 'object' &&
          props.value.length !== state.value.length))
    ) {
      return {value: props.value};
    }
    return null;
  }

  state = {
    value: this.props.defaultValue || this.props.value || [0]
  };

  onChange = (newValue: LockedValue) => {
    const nextState = {value: newValue};
    this.setState(this.props.stateReducer(nextState, this.state));
    this.props.onChange(newValue);
  };

  render(): Node {
    /* eslint-disable no-unused-vars */
    const {
      render,
      value,
      onChange,
      defaultValue,
      ...passThroughProps
    } = this.props;
    return render({
      keyPrefix: 'locked-child',
      value: this.state.value,
      onChange: this.onChange
    });
  }
}

// calculates the largest 'step' attribute value that
// is a factor of several numbers e.g. [0.2, 0.234] => 0.001
export function maxStep(numbers: $ReadOnlyArray<number>) {
  const largestFactorOfTen = (n: number) => {
    const exponentFormat = n.toExponential();
    const exponent = parseInt(exponentFormat.split('e')[1], 10);
    if (exponentFormat.indexOf('.') > -1) {
      const numDecimals = exponentFormat.split('.')[1].split('e')[0].length;
      return 10 ** (exponent - numDecimals);
    }
    return 10 ** exponent;
  };
  return (
    numbers.reduce(
      (lastSmallest, n) =>
        !lastSmallest || largestFactorOfTen(n) < lastSmallest
          ? largestFactorOfTen(n)
          : lastSmallest
    ) || 1
  );
}

const nearestPowerOfTen = (v: number) =>
  Math.pow(10, Math.floor(Math.log10(Math.abs(v)))) *
  Math.pow(-1, v < 0 ? 1 : 0);

export function sensibleStep(extent: [number, number]) {
  return nearestPowerOfTen(extent[1] - extent[0]) / 100;
}

export type NativeInputProps = {
  id?: string,
  alt?: string,
  autocomplete?: string,
  autofocus?: boolean,
  disabled?: boolean,
  onMouseMove?: (e: SyntheticMouseEvent<HTMLDivElement>) => void,
  hoveredIndex?: number,
  labels?: NodeList<HTMLLabelElement>,
  name?: string,
  placeholder?: string,
  readOnly?: boolean,
  required?: boolean,
  tabIndex?: number
};

export type NumberInputsProps = NativeInputProps & {
  key?: string,
  min: number,
  max: number,
  value: number[],
  highlightIndex?: (i: number) => boolean,
  onChange: (value: number[]) => void,
  overrides?: any,
  step?: number,
  defaultValue?: number[]
};

const identityConverters = {
  toString: String,
  toNumber: d => {
    if (typeof d === 'boolean') {
      return d ? 1 : 0;
    }
    if (typeof d === 'undefined' || typeof d === 'object') {
      return 0;
    }
    return parseFloat(d);
  }
};

type Converters = {
  toString: (x: number, forMinOrMax?: boolean) => string,
  toNumber: (x: mixed) => number
};

type Convert = {
  [type: InputType]: Converters
};

type SemiControlledInputProps = {value: string, onChange: Function};
// this enables a controlled input
// such as datetime-local with typing incomplete
// values into the field enabled
export class SemiControlledInput extends React.Component<
  SemiControlledInputProps,
  {value: string}
> {
  state = {value: this.props.value};

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      this.props.onChange(e);
    }
    this.setState({value: e.currentTarget.value});
  };

  render() {
    return (
      <Input
        {...this.props}
        onChange={this.onChange}
        value={this.state.value && this.props.value}
      />
    );
  }
}

export const convert: Convert = {
  date: {
    toString: n => {
      const dateFromString = new Date(n);
      const safeDate = !isNaN(dateFromString.getTime())
        ? dateFromString
        : new Date();
      return timeFormat('%Y-%m-%d')(safeDate);
    },
    toNumber: d => {
      if (typeof d === 'string' && d.length === 10 && d.indexOf('-') === 4) {
        const dateFromString = new Date((`${d}T00:00:00`: any)).getTime();
        if (!isNaN(dateFromString)) {
          return dateFromString;
        }
      }
      return new Date((d: any)).getTime();
    }
  },
  time: {
    toString: (n, forMinOrMax) => {
      if (!forMinOrMax && n === 60 * 24) {
        return '00:00';
      }
      const hours = Math.floor(n / 60);
      const minutes = n - hours * 60;
      const twoDigits = x => padCharsStart('0')(2)(x.toString());
      return `${twoDigits(hours)}:${twoDigits(minutes)}`;
    },
    toNumber: d => {
      if (typeof d === 'number') {
        return d;
      }
      if (typeof d === 'boolean') {
        return d ? 1 : 0;
      }
      if (typeof d === 'undefined' || typeof d === 'object') {
        return 0;
      }
      if (typeof d === 'string') {
        const parts = d.split(':');
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      }
      return parseFloat(d);
    }
  },
  'datetime-local': {
    toString: x => timeFormat('%Y-%m-%dT%H:%M:%S')(x),
    toNumber: x => new Date((x: any)).getTime()
  },
  range: identityConverters,
  number: identityConverters
};

// computes the closest handle to a person mousing over
// combined range sliders so its bar can be clickable
export const closestHandleIndex = (
  mousePoint: number,
  handlePoints: number[]
) => {
  const handleMidpoints = pairs(handlePoints, (a, b) => (a + b) / 2);
  return bisectLeft(handleMidpoints, mousePoint);
};

// the props for a single input
function individualProps({
  onMouseMove,
  highlights,
  hoveredIndex,
  onChange,
  data,
  overrides,
  isHovered,
  min,
  max,
  type,
  value,
  ...inputProps
}) {
  return (v, i) => ({
    ...inputProps,
    id: `${inputProps.id || 'slider'}-${i}`,
    key: `${inputProps.id || 'slider'}-${i}`,
    value: convert[type].toString(v),
    step: type === 'time' ? 60 : type === 'date' ? undefined : inputProps.step,
    min: type === 'range' ? convert[type].toString(min || 0, true) : undefined,
    max: type === 'range' ? convert[type].toString(max || 1, true) : undefined,
    className: `input ${isHovered ? 'hovered' : ''}`,
    type,
    onChange: (e: SyntheticInputEvent<HTMLInputElement>) => {
      if (e.currentTarget.value) {
        const newValue = [...value];
        newValue[i] = convert[type].toNumber(e.currentTarget.value);
        onChange(newValue);
      }
    }
  });
}

const InputsWrapperDiv = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  input {
    border: 1px solid ${theme(['colors', 'mono700'])};
    :hover {
      background: ${theme(['colors', 'primary50'])};
      border-color: ${theme(['colors', 'primary600'])};
    }
    :active,
    :focus {
      background: white;
      border-color: ${theme(['colors', 'primary600'])};
    }
    width: 8rem;
    &[type='datetime-local'] {
      min-width: 16em;
      margin-bottom: 0.25rem;
    }
    overflow: hidden;
    ::-webkit-clear-button {
      display: none;
    }
  }
`;

/* eslint-disable react/display-name */
// several text field inputs rendered in a flex row
export const combinedInputs = (type: InputType) => {
  return (props: NumberInputsProps) => {
    return (
      <InputsWrapperDiv key={`inputs-${props.key || 'wrapper'}`}>
        {(props.value || props.defaultValue || []).map((value, i) => (
          <SemiControlledInput
            {...individualProps({...props, isHovered: undefined, type})(
              value,
              i
            )}
          />
        ))}
      </InputsWrapperDiv>
    );
  };
};
/* eslint-enable react/display-name */

// range inputs stacked on top of each other
// with the background clickable for the input with it's handle
// closest to the user's mouse position
export class RawCombinedRangeInputs extends React.Component<
  NumberInputsProps,
  {hoveredIndex: number}
> {
  state = {hoveredIndex: 0};

  onMouseMove = (e: SyntheticMouseEvent<HTMLDivElement>) => {
    const {min = 0, max = 1, value} = this.props;
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const offsetWidth = boundingRect.right - boundingRect.left;
    const mousePosition = (e.clientX - boundingRect.left) / offsetWidth;
    const mouseValue = mousePosition * (max - min) + min;
    const hoveredIndex = closestHandleIndex(mouseValue, value);
    if (hoveredIndex !== this.state.hoveredIndex) {
      this.setState({hoveredIndex});
    }
  };

  render() {
    const Range =
      (this.props.overrides && this.props.overrides.input) || RangeInput;
    return (
      <RangeInputsWrapperDiv onMouseMove={this.onMouseMove}>
        {this.props.value.map((value, i) => (
          <Range
            {...individualProps({
              ...this.props,
              isHovered: i === this.state.hoveredIndex,
              type: 'range'
            })(value, i)}
          />
        ))}
      </RangeInputsWrapperDiv>
    );
  }
}

export const HighlightedRangeInputs = (props: NumberInputsProps) => {
  return (
    <RangeWithHighlightsDiv key="highlighted-range-inputs">
      <Highlights
        min={props.min || 0}
        max={props.max || 1}
        value={props.value}
        highlightIndex={props.highlightIndex || (i => Boolean(i % 2))}
        overrides={props.overrides}
      />
      <RawCombinedRangeInputs {...props} />
    </RangeWithHighlightsDiv>
  );
};

// locks the orders of range slider handles
export const lockOrder = (
  currentValues: number[],
  nextValues: number[]
): number[] =>
  pairs(nextValues).some(([x, y]) => x > y) ? currentValues : nextValues;

// reducer that locks the orders of range slider handles
export const lockValuesOrderReducer: StateReducer = (
  nextState,
  currentState
) => ({
  ...nextState,
  value:
    !currentState.value ||
    !nextState.value ||
    typeof currentState.value === 'number' ||
    typeof nextState.value === 'number'
      ? nextState.value
      : lockOrder(currentState.value, nextState.value)
});

// just a range slider with an arbitrary number of handles
// based on the number of defaultValues or values passed into it
export const Slider = (props: {...NumberInputsProps, onChange: Function}) => (
  <LockedInputs
    onChange={props.onChange}
    stateReducer={lockValuesOrderReducer}
    render={({keyPrefix, onChange, value}) => (
      <HighlightedRangeInputs
        key={keyPrefix}
        min={props.min || 0}
        max={props.max || 1}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
      />
    )}
  />
);
