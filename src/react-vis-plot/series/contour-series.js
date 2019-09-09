import React from 'react'
import PropTypes from 'prop-types'
import { contourDensity } from 'd3-contour'
import { geoPath } from 'd3-geo'
import { scaleLinear } from 'd3-scale'

import AbstractSeries from './abstract-series'
import Animation from 'animation'
import { ANIMATED_SERIES_PROPS } from 'utils/series-utils'
import { CONTINUOUS_COLOR_RANGE } from 'theme'

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--contour'

function getDomain(data) {
  return data.reduce(
    (acc, row) => {
      return {
        min: Math.min(acc.min, row.value),
        max: Math.max(acc.max, row.value),
      }
    },
    { min: Infinity, max: -Infinity }
  )
}

class ContourSeries extends AbstractSeries {
  render() {
    const {
      animation,
      bandwidth,
      className,
      colorRange,
      data,
      innerHeight,
      innerWidth,
      marginLeft,
      marginTop,
      style,
    } = this.props

    if (!data || !innerWidth || !innerHeight) {
      return null
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <ContourSeries {...this.props} animation={null} />
        </Animation>
      )
    }

    const x = this._getAttributeFunctor('x')
    const y = this._getAttributeFunctor('y')

    const contouredData = contourDensity()
      .x(d => x(d))
      .y(d => y(d))
      .size([innerWidth, innerHeight])
      .bandwidth(bandwidth)(data)

    const geo = geoPath()
    const { min, max } = getDomain(contouredData)
    const colorScale = scaleLinear()
      .domain([min, max])
      .range(colorRange || CONTINUOUS_COLOR_RANGE)
    return (
      <g
        className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}
      >
        {contouredData.map((polygon, index) => {
          return (
            <path
              className="rv-xy-plot__series--contour-line"
              key={`rv-xy-plot__series--contour-line-${index}`}
              d={geo(polygon)}
              style={{
                fill: colorScale(polygon.value),
                ...style,
              }}
            />
          )
        })}
      </g>
    )
  }
}

ContourSeries.propTypes = {
  ...AbstractSeries.propTypes,
  animation: PropTypes.bool,
  bandwidth: PropTypes.number,
  className: PropTypes.string,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  style: PropTypes.object,
}

ContourSeries.defaultProps = {
  ...AbstractSeries.defaultProps,
  bandwidth: 40,
  style: {},
}

export default ContourSeries
