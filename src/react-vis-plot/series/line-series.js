import React from 'react'
import PropTypes from 'prop-types'
import * as d3Shape from 'd3-shape'

import Animation from 'animation'
import { DEFAULT_OPACITY } from 'theme'
import { ANIMATED_SERIES_PROPS } from 'utils/series-utils'
import { warning } from 'utils/react-utils'

import AbstractSeries from './abstract-series'

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--line'

const STROKE_STYLES = {
  dashed: '6, 2',
  solid: null,
}

class LineSeries extends AbstractSeries {
  _renderLine(data, x, y, curve, getNull) {
    let line = d3Shape.line()
    if (curve !== null) {
      if (typeof curve === 'string' && d3Shape[curve]) {
        line = line.curve(d3Shape[curve])
      } else if (typeof curve === 'function') {
        line = line.curve(curve)
      }
    }
    line = line.defined(getNull)
    line = line.x(x).y(y)
    return line(data)
  }

  render() {
    const { animation, className, data } = this.props

    if (this.props.nullAccessor) {
      warning('nullAccessor has been renamed to getNull', true)
    }

    if (!data) {
      return null
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <LineSeries {...this.props} animation={null} />
        </Animation>
      )
    }

    const {
      curve,
      marginLeft,
      marginTop,
      strokeDasharray,
      strokeStyle,
      strokeWidth,
      style,
    } = this.props

    const x = this._getAttributeFunctor('x')
    const y = this._getAttributeFunctor('y')
    const stroke =
      this._getAttributeValue('stroke') || this._getAttributeValue('color')
    const newOpacity = this._getAttributeValue('opacity')
    const opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY
    const getNull = this.props.nullAccessor || this.props.getNull
    const d = this._renderLine(data, x, y, curve, getNull)

    return (
      <path
        d={d}
        className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}
        onMouseOver={this._seriesMouseOverHandler}
        onMouseOut={this._seriesMouseOutHandler}
        onClick={this._seriesClickHandler}
        onContextMenu={this._seriesRightClickHandler}
        style={{
          opacity,
          strokeDasharray: STROKE_STYLES[strokeStyle] || strokeDasharray,
          strokeWidth,
          stroke,
          ...style,
        }}
      />
    )
  }
}

LineSeries.displayName = 'LineSeries'
LineSeries.propTypes = {
  ...AbstractSeries.propTypes,
  strokeStyle: PropTypes.oneOf(Object.keys(STROKE_STYLES)),
  curve: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  getNull: PropTypes.func,
}
LineSeries.defaultProps = {
  ...AbstractSeries.defaultProps,
  strokeStyle: 'solid',
  style: {},
  opacity: 1,
  curve: null,
  className: '',
  getNull: () => true,
}

export default LineSeries
