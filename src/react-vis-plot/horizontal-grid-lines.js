import React from 'react'

import PropTypes from 'prop-types'

import { DIRECTION } from 'utils/axis-utils'
import GridLines from 'plot/grid-lines'

const { HORIZONTAL } = DIRECTION

const propTypes = {
  ...GridLines.propTypes,
  direction: PropTypes.oneOf([HORIZONTAL]),
}

const defaultProps = {
  direction: HORIZONTAL,
  attr: 'y',
}

function HorizontalGridLines(props) {
  return <GridLines {...props} />
}

HorizontalGridLines.displayName = 'HorizontalGridLines'
HorizontalGridLines.propTypes = propTypes
HorizontalGridLines.defaultProps = defaultProps
HorizontalGridLines.requiresSVG = true

export default HorizontalGridLines
