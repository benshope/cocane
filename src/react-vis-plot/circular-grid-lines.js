import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'

import { getAttributeScale } from 'utils/scales-utils'
import Animation, { AnimationPropType } from 'animation'

import { getTicksTotalFromSize, getTickValues } from '../utils/axis-utils'

const animatedProps = [
  'xRange',
  'yRange',
  'xDomain',
  'yDomain',
  'width',
  'height',
  'marginLeft',
  'marginTop',
  'marginRight',
  'marginBottom',
  'tickTotal',
]

class CircularGridLines extends PureComponent {
  _getDefaultProps() {
    const { innerWidth, innerHeight, marginTop, marginLeft } = this.props
    return {
      left: marginLeft,
      top: marginTop,
      width: innerWidth,
      height: innerHeight,
      style: {},
      tickTotal: getTicksTotalFromSize(Math.min(innerWidth, innerHeight)),
    }
  }

  render() {
    const { animation, centerX, centerY } = this.props
    if (animation) {
      return (
        <Animation {...this.props} animatedProps={animatedProps}>
          <CircularGridLines {...this.props} animation={null} />
        </Animation>
      )
    }

    const props = {
      ...this._getDefaultProps(),
      ...this.props,
    }

    const {
      tickTotal,
      tickValues,
      marginLeft,
      marginTop,
      rRange,
      style,
    } = props

    const xScale = getAttributeScale(props, 'x')
    const yScale = getAttributeScale(props, 'y')
    const values = getTickValues(xScale, tickTotal, tickValues)
    return (
      <g
        transform={`translate(${xScale(centerX) + marginLeft},${yScale(
          centerY
        ) + marginTop})`}
        className="rv-xy-plot__circular-grid-lines"
      >
        {values.reduce((res, value, index) => {
          const radius = xScale(value)
          if (rRange && (radius < rRange[0] || radius > rRange[1])) {
            return res
          }
          return res.concat([
            <circle
              {...{ cx: 0, cy: 0, r: radius }}
              key={index}
              className="rv-xy-plot__circular-grid-lines__line"
              style={style}
            />,
          ])
        }, [])}
      </g>
    )
  }
}

CircularGridLines.displayName = 'CircularGridLines'
CircularGridLines.propTypes = {
  centerX: PropTypes.number,
  centerY: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  rRange: PropTypes.arrayOf(PropTypes.number),

  style: PropTypes.object,

  tickValues: PropTypes.arrayOf(PropTypes.number),
  tickTotal: PropTypes.number,

  animation: AnimationPropType,
  // generally supplied by xyplot
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  innerWidth: PropTypes.number,
  innerHeight: PropTypes.number,
}
CircularGridLines.defaultProps = {
  centerX: 0,
  centerY: 0,
}
CircularGridLines.requiresSVG = true

export default CircularGridLines
