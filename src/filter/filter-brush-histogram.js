// @flow

import {AutoSizer} from 'react-virtualized';
import styled from 'styled-components';
import React from 'react';
import {max} from 'd3-array';
import {scaleLinear} from 'd3-scale';

import Brush from '../brush';
import {Bars} from '../histogram';
import {HighlightsDiv, RangeInput} from '../inputs-styles';
import {Highlights, RawCombinedRangeInputs} from '../inputs';
import {theme} from '../theme';
import type {Bin} from '../histogram';
import type {FilterData, FilterDataLoaded} from './filter-types';

type Props = $ReadOnly<{|
  value: number[],
  min: number,
  max: number,
  highlightIndex: (i: number) => boolean,
  onChange: (value: number[]) => void,
  histogram: FilterData<$ReadOnlyArray<Bin>>
|}>;

type PropsLoaded = {|
  ...Props,
  +histogram: FilterDataLoaded<$ReadOnlyArray<Bin>>
|};

const DEFAULT_HEIGHT = 80;

const OverBarsRangeInput = styled(RangeInput)`
  width: 100%;
  height: ${DEFAULT_HEIGHT}px;
  ::-webkit-slider-thumb {
    width: 1px;
    height: 100%;
    border-radius: 0;
    border: none;
  }
`;

const BehindSliderSVG = styled.svg`
  pointer-events: none;
  position: absolute;
`;

const OverHistogramBrushDiv = styled.div`
  position: relative;
  height: ${DEFAULT_HEIGHT}px;
  .selection {
    rx: 2;
    ry: 2;
    fill: rgba(0, 0, 0, 0);
    stroke: ${theme(['colors', 'mono400'])};
  }
`;

const OverHistogramBrushOrRange = (props: PropsLoaded) => {
  return (
    <OverHistogramBrushDiv key="over-histogram-slider">
      {Array.isArray(props.value) && props.value.length > 1 ? (
        <AutoSizer style={{width: '100%'}} disableHeight>
          {({width}) => (
            <Brush height={DEFAULT_HEIGHT} width={width} {...props} />
          )}
        </AutoSizer>
      ) : (
        <RawCombinedRangeInputs
          {...props}
          overrides={{input: OverBarsRangeInput}}
        />
      )}
    </OverHistogramBrushDiv>
  );
};

// TODO(bshope): use React.memo instead
class FilterHistogram extends React.PureComponent<PropsLoaded> {
  render() {
    return (
      <AutoSizer style={{width: '100%'}} disableHeight>
        {({width}) => {
          const x = scaleLinear()
            .domain([this.props.min, this.props.max])
            .range([0, width])
            .nice();
          const y = scaleLinear()
            .domain([0, max(this.props.histogram.data, d => d.length)])
            .nice()
            .range([DEFAULT_HEIGHT, 0]);
          return (
            <Bars
              {...{
                width,
                height: DEFAULT_HEIGHT,
                x,
                y,
                bins: this.props.histogram.data,
                overrides: {svg: BehindSliderSVG}
              }}
            />
          );
        }}
      </AutoSizer>
    );
  }
}

const HistogramAndSliderDiv = styled.div`
  position: relative;
  margin: 0 0.5rem;
`;

const OverBarsHighlightsDiv = styled(HighlightsDiv)`
  background: none;
  position: absolute;
  display: flex;
  transform: none;
  height: 100%;
  width: 100%;
  border-radius: 0;
`;

// single highlight - not a styled component for performance reasons
const OverBarsHighlightDiv = ({start, end, isHighlighted}) =>
  isHighlighted ? null : (
    <div
      style={{
        left: `${start * 100}%`,
        position: 'absolute',
        opacity: 0.75,
        background: `white`,
        width: `${(end - start) * 100}%`,
        height: `100%`
      }}
    />
  );

const OverHistogramHighlights = (props: PropsLoaded) => (
  <Highlights
    key="over-histogram-highlights"
    {...props}
    overrides={{
      highlight: OverBarsHighlightDiv,
      highlights: OverBarsHighlightsDiv
    }}
  />
);

const BrushableHistogram = (props: Props) => {
  // TODO add loading state here?
  if (props.histogram.status === 'loaded') {
    return (
      <HistogramAndSliderDiv key="histogram-and-brush">
        <FilterHistogram {...(props: any)} key="histogram" />
        <OverHistogramHighlights {...(props: any)} key="highlights" />
        <OverHistogramBrushOrRange {...(props: any)} key="brush-or-range" />
      </HistogramAndSliderDiv>
    );
  }
  return null;
};

export default BrushableHistogram;
