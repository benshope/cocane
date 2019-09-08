import React from 'react'

import Animation from 'animation'
import { ANIMATED_SERIES_PROPS } from 'utils/series-utils'

import AbstractSeries from './abstract-series'

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--heatmap'

class HeatmapSeries extends AbstractSeries {
  static getParentConfig(attr) {
    const isDomainAdjustmentNeeded = attr === 'x' || attr === 'y'
    return { isDomainAdjustmentNeeded }
  }

  render() {
    const {
      animation,
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
          <HeatmapSeries {...this.props} animation={null} />
        </Animation>
      )
    }
    const { rectStyle } = { rectStyle: {}, ...style }
    const x = this._getAttributeFunctor('x')
    const y = this._getAttributeFunctor('y')
    const opacity = this._getAttributeFunctor('opacity')
    const fill =
      this._getAttributeFunctor('fill') || this._getAttributeFunctor('color')
    const stroke =
      this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color')
    const xDistance = this._getScaleDistance('x')
    const yDistance = this._getScaleDistance('y')
    return (
      <g
        className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}
      >
        {data.map((d, i) => {
          const attrs = {
            style: {
              stroke: stroke && stroke(d),
              fill: fill && fill(d),
              opacity: opacity && opacity(d),
              ...style,
            },
            ...rectStyle,
            x: x(d) - xDistance / 2,
            y: y(d) - yDistance / 2,
            width: xDistance,
            height: yDistance,
            key: i,
            onClick: e => this._valueClickHandler(d, e),
            onContextMenu: e => this._valueRightClickHandler(d, e),
            onMouseOver: e => this._valueMouseOverHandler(d, e),
            onMouseOut: e => this._valueMouseOutHandler(d, e),
          }
          return <rect {...attrs} />
        })}
      </g>
    )
  }
}

HeatmapSeries.propTypes = {
  ...AbstractSeries.propTypes,
}

HeatmapSeries.displayName = 'HeatmapSeries'

export default HeatmapSeries
