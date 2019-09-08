import React from 'react'
import PropTypes from 'prop-types'
import * as d3Shape from 'd3-shape'

import Animation from 'animation'
import { DEFAULT_OPACITY } from 'theme'
import { ANIMATED_SERIES_PROPS } from 'utils/series-utils'
import { warning } from 'utils/react-utils'

import AbstractSeries from './abstract-series'

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--line'

class AreaSeries extends AbstractSeries {
  _renderArea(data, x, y0, y, curve, getNull) {
    let area = d3Shape.area()
    if (curve !== null) {
      if (typeof curve === 'string' && d3Shape[curve]) {
        area = area.curve(d3Shape[curve])
      } else if (typeof curve === 'function') {
        area = area.curve(curve)
      }
    }
    area = area.defined(getNull)
    area = area
      .x(x)
      .y0(y0)
      .y1(y)
    return area(data)
  }

  render() {
    const {
      animation,
      className,
      curve,
      data,
      marginLeft,
      marginTop,
      style,
    } = this.props

    if (this.props.nullAccessor) {
      warning('nullAccessor has been renamed to getNull', true)
    }

    if (!data) {
      return null
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <AreaSeries {...this.props} animation={null} />
        </Animation>
      )
    }

    const x = this._getAttributeFunctor('x')
    const y = this._getAttributeFunctor('y')
    const y0 = this._getAttr0Functor('y')
    const stroke =
      this._getAttributeValue('stroke') || this._getAttributeValue('color')
    const fill =
      this._getAttributeValue('fill') || this._getAttributeValue('color')
    const newOpacity = this._getAttributeValue('opacity')
    const opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY
    const getNull = this.props.nullAccessor || this.props.getNull
    const d = this._renderArea(data, x, y0, y, curve, getNull)

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
          stroke,
          fill,
          ...style,
        }}
      />
    )
  }
}

AreaSeries.displayName = 'AreaSeries'
AreaSeries.propTypes = {
  ...AbstractSeries.propTypes,
  getNull: PropTypes.func,
}
AreaSeries.defaultProps = {
  ...AbstractSeries.defaultProps,
  getNull: () => true,
}

export default AreaSeries
