import React from 'react'

import PropTypes from 'prop-types'

import Animation from 'animation'
import { ANIMATED_SERIES_PROPS } from 'utils/series-utils'

import AbstractSeries from './abstract-series'

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--rect'

class RectSeries extends AbstractSeries {
  static get propTypes() {
    return {
      ...AbstractSeries.propTypes,
      linePosAttr: PropTypes.string,
      valuePosAttr: PropTypes.string,
      lineSizeAttr: PropTypes.string,
      valueSizeAttr: PropTypes.string,
    }
  }

  render() {
    const {
      animation,
      className,
      data,
      linePosAttr,
      lineSizeAttr,
      marginLeft,
      marginTop,
      style,
      valuePosAttr,
      valueSizeAttr,
    } = this.props

    if (!data) {
      return null
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <RectSeries {...this.props} animation={null} />
        </Animation>
      )
    }

    const lineFunctor = this._getAttributeFunctor(linePosAttr)
    const line0Functor = this._getAttr0Functor(linePosAttr)
    const valueFunctor = this._getAttributeFunctor(valuePosAttr)
    const value0Functor = this._getAttr0Functor(valuePosAttr)
    const fillFunctor =
      this._getAttributeFunctor('fill') || this._getAttributeFunctor('color')
    const strokeFunctor =
      this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color')
    const opacityFunctor = this._getAttributeFunctor('opacity')

    return (
      <g
        className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}
      >
        {data.map((d, i) => {
          const attrs = {
            style: {
              opacity: opacityFunctor && opacityFunctor(d),
              stroke: strokeFunctor && strokeFunctor(d),
              fill: fillFunctor && fillFunctor(d),
              ...style,
            },
            [linePosAttr]: line0Functor(d),
            [lineSizeAttr]: Math.abs(lineFunctor(d) - line0Functor(d)),
            [valuePosAttr]: Math.min(value0Functor(d), valueFunctor(d)),
            [valueSizeAttr]: Math.abs(-value0Functor(d) + valueFunctor(d)),
            onClick: e => this._valueClickHandler(d, e),
            onContextMenu: e => this._valueRightClickHandler(d, e),
            onMouseOver: e => this._valueMouseOverHandler(d, e),
            onMouseOut: e => this._valueMouseOutHandler(d, e),
            key: i,
          }
          return <rect {...attrs} />
        })}
      </g>
    )
  }
}

RectSeries.displayName = 'RectSeries'

export default RectSeries
