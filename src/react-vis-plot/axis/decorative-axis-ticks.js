import React from 'react'
import { generatePoints, getAxisAngle } from 'utils/axis-utils'

/**
 * Generate the actual polygons to be plotted
 * @param {Object} props
 - props.animation {Boolean}
 - props.axisDomain {Array} a pair of values specifying the domain of the axis
 - props.numberOfTicks{Number} the number of ticks on the axis
 - props.axisStart {Object} a object specify in cartesian space the start of the axis
 example: {x: 0, y: 0}
 - props.axisEnd {Object} a object specify in cartesian space the start of the axis
 - props.tickValue {Func} a formatting function for the tick values
 - props.tickSize {Number} a pixel size of the axis
 - props.style {Object} The style object for the axis
 * @return {Component} the plotted axis
 */
export default function decorativeAxisTick(props) {
  const {
    axisDomain,
    numberOfTicks,
    axisStart,
    axisEnd,
    tickValue,
    tickSize,
    style,
  } = props
  const { points } = generatePoints({
    axisStart,
    axisEnd,
    numberOfTicks,
    axisDomain,
  })
  // add a quarter rotation to make ticks orthogonal to axis
  const tickAngle = getAxisAngle(axisStart, axisEnd) + Math.PI / 2
  return points.map((point, index) => {
    const tickProps = {
      x1: 0,
      y1: 0,
      x2: tickSize * Math.cos(tickAngle),
      y2: tickSize * Math.sin(tickAngle),
      ...style.ticks,
    }

    const textProps = {
      x: tickSize * Math.cos(tickAngle),
      y: tickSize * Math.sin(tickAngle),
      textAnchor: 'start',
      ...style.text,
    }
    return (
      <g
        key={index}
        transform={`translate(${point.x}, ${point.y})`}
        className="rv-xy-plot__axis__tick"
      >
        <line {...tickProps} className="rv-xy-plot__axis__tick__line" />
        <text {...textProps} className="rv-xy-plot__axis__tick__text">
          {tickValue(point.text)}
        </text>
      </g>
    )
  })
}
