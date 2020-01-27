import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import AutoSizer from 'react-virtualized-auto-sizer'
import { scaleLinear, scaleBand } from 'd3-scale'
import { extent, histogram, max } from 'd3-array'

import { component as SVG } from '../svg'
import { primary } from '../theme'

const ThemedRect = styled.rect`
  transition: fill 0.1s ease;
  fill: ${primary(50)};
`

const Bars = ({ data, xKey, yKeys }) => {
  console.log(data, xKey, yKeys)

  return (
    <SVG>
      {({ width, height }) => {
        const x = scaleBand()
          .range([0, width])
          .round(true)
          .padding(0.1)
          .domain(data.map(d => (xKey ? d[xKey] : d)))
        const y = scaleLinear()
          .range([height, 0])
          .domain([0, max(data, d => d[yKeys[0]])])
        return data.map((d, i) => {
          return (
            <ThemedRect
              key={`bar-${i}`}
              x={x(d[xKey])}
              y={y(d[yKeys[0]])}
              width={x.bandwidth()}
              height={height - y(d[yKeys[0]])}
            />
          )
        })
      }}
    </SVG>
  )
}
Bars.propTypes = {
  xKey: PropTypes.oneOfType([PropTypes.string]),
  yKeys: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ),
}

export default Bars
