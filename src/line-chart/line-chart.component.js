import React from 'react'
import PropTypes from 'prop-types'
import { line, curveMonotoneX } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'

// are HOCs the right way to represent this?
// they're an easy way to represent this
// but might not be the *right* way
// no need to rebuild CB
// you could also use hook containers?
// how do hooks fit with this?
// should we create a stack?
const LinePath = ({
  data = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 1 }],
  width = 200,
  height = 100,
}) => {
  var xScale = scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width])
  var yScale = scaleLinear()
    .domain(extent(data, point => point.x))
    .range([0, height])
  const d = line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d.y))
    .curve(curveMonotoneX)
  return (
    <svg>
      <path d={d} stroke="orange" fill="orange" />
    </svg>
  )
}

// LinePath.propTypes = {
//   data: PropTypes.array,
// }

export default LinePath
