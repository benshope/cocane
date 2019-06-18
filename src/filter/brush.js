// @flow
import React from 'react';
import {scaleLinear} from 'd3-scale';
import {select} from 'd3-selection';
import {brushX, brushSelection} from 'd3-brush';
import isEqual from 'lodash/fp/isEqual';
import styled from 'styled-components';

import type {NativeInputProps} from './inputs';

type BrushProps = NativeInputProps & {
  value?: number[],
  defaultValue?: number[],
  min: number,
  max: number,
  step?: number,
  height: number,
  width: number,
  onChange: (value: number[]) => void
};

const BrushSVG = styled.svg`
  .selection {
    cursor: grab;
  }
`;

export default class Brush extends React.Component<BrushProps, {}> {
  brushRef: ?Object;
  brush: Object;
  // The brush is either in a state where it is transmitting
  // via `onChange` or receiving via `props` because infinite loops
  // occur if you try to do both at the same time
  blockOnChange: boolean = false;
  blockProps: boolean = false;

  componentDidMount() {
    this.setBrushToProps();
  }

  componentDidUpdate(lastProps: BrushProps) {
    if (!this.blockProps && !isEqual(lastProps, this.props)) {
      this.setBrushToProps();
    }
  }

  setBrushToProps = () => {
    if (this.brushRef) {
      this.blockOnChange = true;
      const {width, height, min, max, value, defaultValue} = this.props;
      this.brush = brushX()
        .extent([[0, 0], [width, height]])
        .on('start brush', () => this.brushed({}))
        .on('end', () => this.brushed({isEnd: true}));
      select(this.brushRef).call(this.brush);
      const widthScale = scaleLinear()
        .domain([min, max])
        .range([0, width]);
      select(this.brushRef).call(
        this.brush.move,
        (value || defaultValue || []).map(widthScale)
      );
    }
  };

  brushed = ({isEnd}: {isEnd?: boolean}) => {
    if (this.brushRef) {
      this.blockProps = true;
      const {width, min, max, step, onChange} = this.props;
      const newValue = brushSelection(this.brushRef);
      if (newValue && !this.blockOnChange) {
        // TODO: give the option to 'nice' values
        // based on the extend of the range
        const screenToValue = scaleLinear()
          .domain([0, width])
          .range([min, max]);
        const onChangeValue = newValue.map(screenToValue);
        const roundByStep = x => Math.round(x / (step || 1)) * (step || 1);
        onChange(
          !step
            ? onChangeValue
            : [
                onChangeValue[0] === min ? min : roundByStep(onChangeValue[0]),
                onChangeValue[1] === max ? max : roundByStep(onChangeValue[1])
              ]
        );
      }
      if (isEnd) {
        this.blockOnChange = false;
        this.blockProps = false;
      }
    }
  };

  render() {
    const {width, height} = this.props;
    return (
      <BrushSVG width={width} height={height}>
        <g
          ref={ref => {
            this.brushRef = ref;
          }}
        />
      </BrushSVG>
    );
  }
}
