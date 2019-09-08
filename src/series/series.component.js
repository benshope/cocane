import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { extent, histogram, max } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import AutoSizer from 'react-virtualized-auto-sizer'

const Series = props => (
  <AutoSizer>
    {({ width, height }) => <svg>{children}</svg>
  </AutoSizer>
)

Series.propTypes = {
  xData: PropTypes.arrayOf(PropTypes.number),
  yData: PropTypes.arrayOf(PropTypes.number),
}

export default Series
