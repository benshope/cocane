import React from 'react'

import PropTypes from 'prop-types'

import { ORIENTATION } from 'utils/axis-utils'

import Axis from './axis'

const { LEFT, RIGHT } = ORIENTATION

const propTypes = {
  ...Axis.propTypes,
  orientation: PropTypes.oneOf([LEFT, RIGHT]),
}

const defaultProps = {
  orientation: LEFT,
  attr: 'y',
  attrAxis: 'x',
}

function YAxis(props) {
  return <Axis {...props} />
}

YAxis.displayName = 'YAxis'
YAxis.propTypes = propTypes
YAxis.defaultProps = defaultProps
YAxis.requiresSVG = true

export default YAxis
