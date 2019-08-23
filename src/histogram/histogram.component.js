import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { extent, histogram, max } from "d3-array";
import { scaleLinear } from "d3-scale";
import { AutoSizer } from "react-virtualized";

const ThemedRect = styled.rect`
  transition: fill 0.1s ease;
  fill: var(--primary600, hsl(200, 40%, 40%));
`;

const Bars = ({ width, height, x, y, bins, overrides }) => {
  const SVGComponent = (overrides && overrides.svg) || styled.svg``;

  return (
    <SVGComponent width={width} height={height}>
      {bins.map((d, i) => {
        const xValue =
          i + 1 === bins.length ? bins[bins.length - (i + 1)].x1 : d.x0;
        const xWidth = Math.max(0, x(d.x1) - x(d.x0) - 1);
        return (
          <ThemedRect
            key={`bar-${i}`}
            x={x(isNaN(xValue) || xValue === Infinity ? 0 : xValue)}
            y={y(d.length)}
            width={isNaN(xWidth) || xWidth === Infinity ? 0 : xWidth}
            height={y(0) - y(d.length)}
          />
        );
      })}
    </SVGComponent>
  );
};

// TODO shouldnt be histogram by default (this will need several types)
// TODO handle too many bars
// TODO lots of d3 computation in the component here
// possibly break this out into an epic?
const Histogram = props => {
  const { width = 100, height = 100, value = [] } = props;
  if (width <= 0 || height <= 0) {
    return null;
  }
  if (!value.length) {
    // TODO: make a more interesting/abstracted empty state
    return <div>No data</div>;
  }
  const x = scaleLinear()
    .domain(extent(value))
    .range([0, width])
    .nice();

  const bins = ((domain, thresholds, values) =>
    histogram()
      .domain(domain)
      .thresholds(thresholds)(values))(x.domain(), x.ticks(), value);

  const y = scaleLinear()
    .domain([0, max(bins, d => d.length)])
    .nice()
    .range([height, 0]);

  return <Bars {...{ ...props, ...{ x, y, bins } }} />;
};

const AutosizedHistogramDiv = styled.div`
  position: relative;
  min-height: 10em;
  height: 100%;
  flex: 1;
`;

const AutosizedHistogram = props => (
  <AutosizedHistogramDiv>
    <AutoSizer>
      {({ width, height }) => <Histogram {...{ ...props, width, height }} />}
    </AutoSizer>
  </AutosizedHistogramDiv>
);

Histogram.propTypes = { value: PropTypes.arrayOf(PropTypes.number) };

export default AutosizedHistogram;
