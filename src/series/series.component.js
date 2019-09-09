import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import AutoSizer from 'react-virtualized-auto-sizer'
import { scaleLinear, scaleBand } from 'd3-scale'
import { extent, histogram, max } from 'd3-array'

import { component as SVG } from '../svg'

const Series = ({}) => {
  const margin = {
    TOP: 10,
    BOTTOM: 20,
    LEFT: 10,
    RIGHT: 10,
  }
  return (
    <SVG>
      {({ width, height }) => {
        return <React.Fragment></React.Fragment>
      }}
    </SVG>
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
