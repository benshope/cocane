import React from 'react'

import PropTypes from 'prop-types'

import GridLines from 'plot/grid-lines'
import { DIRECTION } from 'utils/axis-utils'

const { VERTICAL } = DIRECTION

const propTypes = {
  ...GridLines.propTypes,
  direction: PropTypes.oneOf([VERTICAL]),
}

const defaultProps = {
  direction: VERTICAL,
  attr: 'x',
}

function VerticalGridLines(props) {
  return <GridLines {...props} />
}

VerticalGridLines.displayName = 'VerticalGridLines'
VerticalGridLines.propTypes = propTypes
VerticalGridLines.defaultProps = defaultProps
VerticalGridLines.requiresSVG = true

export default VerticalGridLines
