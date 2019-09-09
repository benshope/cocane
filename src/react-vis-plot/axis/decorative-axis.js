import React from 'react'
import { format } from 'd3-format'
import PropTypes from 'prop-types'

import AbstractSeries from 'plot/series/abstract-series'
import DecorativeAxisTicks from './decorative-axis-ticks'
import Animation from 'animation'

const predefinedClassName = 'rv-xy-manipulable-axis rv-xy-plot__axis'

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
  'tickSize',
  'tickTotal',
  'tickSizeInner',
  'tickSizeOuter',
]

class DecorativeAxis extends AbstractSeries {
  render() {
    const {
      animation,
      className,
      marginLeft,
      marginTop,
      axisStart,
      axisEnd,
      axisDomain,
      numberOfTicks,
      tickValue,
      tickSize,
      style,
    } = this.props

    if (animation) {
      return (
        <Animation {...this.props} {...{ animatedProps }}>
          <DecorativeAxis {...this.props} animation={null} />
        </Animation>
      )
    }

    const x = this._getAttributeFunctor('x')
    const y = this._getAttributeFunctor('y')

    return (
      <g
        className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}
      >
        <line
          {...{
            x1: x({ x: axisStart.x }),
            x2: x({ x: axisEnd.x }),
            y1: y({ y: axisStart.y }),
            y2: y({ y: axisEnd.y }),
            ...style.line,
          }}
          className="rv-xy-plot__axis__line"
        />
        <g className="rv-xy-manipulable-axis__ticks">
          {DecorativeAxisTicks({
            axisDomain,
            axisEnd: { x: x(axisEnd), y: y(axisEnd) },
            axisStart: { x: x(axisStart), y: y(axisStart) },
            numberOfTicks,
            tickValue,
            tickSize,
            style,
          })}
        </g>
      </g>
    )
  }
}

const DEFAULT_FORMAT = format('.2r')

DecorativeAxis.defaultProps = {
  className: '',
  numberOfTicks: 10,
  tickValue: d => DEFAULT_FORMAT(d),
  tickSize: 5,
  style: {
    line: {
      strokeWidth: 1,
    },
    ticks: {
      strokeWidth: 2,
    },
    text: {},
  },
}
DecorativeAxis.propTypes = {
  ...AbstractSeries.propTypes,
  axisDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  axisEnd: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  axisStart: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  className: PropTypes.string,
  numberOfTicks: PropTypes.number,
  tickValue: PropTypes.func,
  tickSize: PropTypes.number,
  style: PropTypes.shape({
    line: PropTypes.object,
    ticks: PropTypes.object,
    text: PropTypes.object,
  }),
}
DecorativeAxis.displayName = 'DecorativeAxis'
export default DecorativeAxis
