import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'

import { getAttributeScale } from 'utils/scales-utils'
import Animation, { AnimationPropType } from 'animation'

import {
  getTicksTotalFromSize,
  getTickValues,
  DIRECTION,
} from '../utils/axis-utils'

const { VERTICAL, HORIZONTAL } = DIRECTION

const propTypes = {
  direction: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  attr: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,

  style: PropTypes.object,

  tickValues: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
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

const defaultProps = {
  direction: VERTICAL,
}

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

class GridLines extends PureComponent {
  _getDefaultProps() {
    const {
      innerWidth,
      innerHeight,
      marginTop,
      marginLeft,
      direction,
    } = this.props
    return {
      left: marginLeft,
      top: marginTop,
      width: innerWidth,
      height: innerHeight,
      tickTotal: getTicksTotalFromSize(
        direction === VERTICAL ? innerWidth : innerHeight
      ),
    }
  }

  render() {
    const { animation, className } = this.props
    if (animation) {
      return (
        <Animation {...this.props} {...{ animatedProps }}>
          <GridLines {...this.props} animation={null} />
        </Animation>
      )
    }

    const props = {
      ...this._getDefaultProps(),
      ...this.props,
    }

    const {
      attr,
      direction,
      width,
      height,
      style,
      tickTotal,
      tickValues,
      top,
      left,
    } = props
    const isVertical = direction === VERTICAL
    const tickXAttr = isVertical ? 'y' : 'x'
    const tickYAttr = isVertical ? 'x' : 'y'
    const length = isVertical ? height : width

    const scale = getAttributeScale(props, attr)
    const values = getTickValues(scale, tickTotal, tickValues)

    return (
      <g
        transform={`translate(${left},${top})`}
        className={`rv-xy-plot__grid-lines ${className}`}
      >
        {values.map((v, i) => {
          const pos = scale(v)
          const pathProps = {
            [`${tickYAttr}1`]: pos,
            [`${tickYAttr}2`]: pos,
            [`${tickXAttr}1`]: 0,
            [`${tickXAttr}2`]: length,
          }
          return (
            <line
              {...pathProps}
              key={i}
              className="rv-xy-plot__grid-lines__line"
              style={style}
            />
          )
        })}
      </g>
    )
  }
}

GridLines.displayName = 'GridLines'
GridLines.defaultProps = defaultProps
GridLines.propTypes = propTypes
GridLines.requiresSVG = true

export default GridLines
