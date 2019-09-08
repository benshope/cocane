import React from 'react'

import PropTypes from 'prop-types'

import { ORIENTATION } from 'utils/axis-utils'

const { LEFT, RIGHT, TOP, BOTTOM } = ORIENTATION

const propTypes = {
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
  orientation: PropTypes.oneOf([LEFT, RIGHT, TOP, BOTTOM]).isRequired,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  style: {},
}

function AxisLine({ orientation, width, height, style }) {
  let lineProps
  if (orientation === LEFT) {
    lineProps = {
      x1: width,
      x2: width,
      y1: 0,
      y2: height,
    }
  } else if (orientation === RIGHT) {
    lineProps = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: height,
    }
  } else if (orientation === TOP) {
    lineProps = {
      x1: 0,
      x2: width,
      y1: height,
      y2: height,
    }
  } else {
    lineProps = {
      x1: 0,
      x2: width,
      y1: 0,
      y2: 0,
    }
  }
  return (
    <line {...lineProps} className="rv-xy-plot__axis__line" style={style} />
  )
}

AxisLine.defaultProps = defaultProps
AxisLine.displayName = 'AxisLine'
AxisLine.propTypes = propTypes

export default AxisLine
