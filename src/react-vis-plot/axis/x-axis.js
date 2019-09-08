import React from 'react'

import PropTypes from 'prop-types'

import { ORIENTATION } from 'utils/axis-utils'

import Axis from './axis'

const { TOP, BOTTOM } = ORIENTATION

const propTypes = {
  ...Axis.propTypes,
  orientation: PropTypes.oneOf([TOP, BOTTOM]),
}

const defaultProps = {
  orientation: BOTTOM,
  attr: 'x',
  attrAxis: 'y',
}

function XAxis(props) {
  return <Axis {...props} />
}

XAxis.displayName = 'XAxis'
XAxis.propTypes = propTypes
XAxis.defaultProps = defaultProps
XAxis.requiresSVG = true

export default XAxis
