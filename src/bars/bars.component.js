import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import AutoSizer from 'react-virtualized-auto-sizer'
import { scaleLinear, scaleBand } from 'd3-scale'
import { extent, histogram, max } from 'd3-array'

const ThemedRect = styled.rect`
  transition: fill 0.1s ease;
  fill: var(--primary600, hsl(200, 40%, 40%));
`

const AutosizeWrapperDiv = styled.div`
  position: relative;
  min-height: 10em;
  height: 100%;
  flex: 1;
`

const Bars = ({ data, xKey, yKeys }) => {
  return (
    <AutosizeWrapperDiv>
      <AutoSizer>
        {({ width, height }) => {
          const x = scaleBand()
            .range([0, width])
            .round(true)
            .padding(0.1)
            .domain(data.map(d => (xKey ? d[xKey] : d)))
          const y = scaleLinear()
            .range([height, 0])
            .domain([0, max(data, d => d[yKeys[0]])])
          return (
            <svg width={width} height={height}>
              {data.map((d, i) => {
                return (
                  <ThemedRect
                    key={`bar-${i}`}
                    x={x(d[xKey])}
                    y={y(d[yKeys[0]])}
                    width={x.bandwidth()}
                    height={height - y(d[yKeys[0]])}
                  />
                )
              })}
            </svg>
          )
        }}
      </AutoSizer>
    </AutosizeWrapperDiv>
  )
}

Bars.propTypes = {
  xKey: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
  yKeys: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ),
}

export default Bars
