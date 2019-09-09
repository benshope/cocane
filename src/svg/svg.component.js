import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import AutoSizer from 'react-virtualized-auto-sizer'
import { scaleLinear, scaleBand } from 'd3-scale'
import { extent, histogram, max } from 'd3-array'

// TODO: min-height feels arbitrary - revisit
const AutosizeWrapperDiv = styled.div`
  position: relative;
  min-height: 10em;
  height: 100%;
  flex: 1;
`

const SVG = ({ children }) => {
  return (
    <AutosizeWrapperDiv>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <svg width={width} height={height}>
              {children({ width, height })}
            </svg>
          )
        }}
      </AutoSizer>
    </AutosizeWrapperDiv>
  )
}

export default SVG
