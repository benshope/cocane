import React from 'react'

import Animation from 'animation'
import { ANIMATED_SERIES_PROPS } from 'utils/series-utils'

import AbstractSeries from './abstract-series'

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--polygon'
const DEFAULT_COLOR = '#12939A'

const generatePath = (data, xFunctor, yFunctor) =>
  `${data.reduce(
    (res, row, i) => `${res} ${i ? 'L' : 'M'}${xFunctor(row)} ${yFunctor(row)}`,
    ''
  )} Z`

class PolygonSeries extends AbstractSeries {
  static get propTypes() {
    return {
      ...AbstractSeries.propTypes,
    }
  }

  render() {
    const {
      animation,
      color,
      className,
      data,
      marginLeft,
      marginTop,
      style,
    } = this.props

    if (!data) {
      return null
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <PolygonSeries {...this.props} animation={null} />
        </Animation>
      )
    }
    const xFunctor = this._getAttributeFunctor('x')
    const yFunctor = this._getAttributeFunctor('y')

    return (
      <path
        {...{
          className: `${predefinedClassName} ${className}`,
          onMouseOver: e => this._seriesMouseOverHandler(data, e),
          onMouseOut: e => this._seriesMouseOutHandler(data, e),
          onClick: this._seriesClickHandler,
          onContextMenu: this._seriesRightClickHandler,
          fill: color || DEFAULT_COLOR,
          style,
          d: generatePath(data, xFunctor, yFunctor),
          transform: `translate(${marginLeft},${marginTop})`,
        }}
      />
    )
  }
}

PolygonSeries.displayName = 'PolygonSeries'

export default PolygonSeries
