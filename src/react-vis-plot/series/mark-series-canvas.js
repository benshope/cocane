import { rgb } from 'd3-color'

import { DEFAULT_SIZE, DEFAULT_OPACITY } from 'theme'
import { getAttributeFunctor } from 'utils/scales-utils'

import AbstractSeries from './abstract-series'

class MarkSeriesCanvas extends AbstractSeries {
  static get requiresSVG() {
    return false
  }

  static get isCanvas() {
    return true
  }

  static renderLayer(props, ctx) {
    const { data, marginLeft, marginTop } = props

    const x = getAttributeFunctor(props, 'x')
    const y = getAttributeFunctor(props, 'y')
    const size = getAttributeFunctor(props, 'size') || (p => DEFAULT_SIZE)
    const fill =
      getAttributeFunctor(props, 'fill') || getAttributeFunctor(props, 'color')
    const stroke =
      getAttributeFunctor(props, 'stroke') ||
      getAttributeFunctor(props, 'color')
    const opacity = getAttributeFunctor(props, 'opacity')

    data.forEach(row => {
      const fillColor = rgb(fill(row))
      const strokeColor = rgb(stroke(row))
      const rowOpacity = opacity(row) || DEFAULT_OPACITY
      ctx.beginPath()
      ctx.arc(
        x(row) + marginLeft,
        y(row) + marginTop,
        size(row),
        0,
        2 * Math.PI
      )
      ctx.fillStyle = `rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${rowOpacity})`
      ctx.fill()
      ctx.strokeStyle = `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${rowOpacity})`
      ctx.stroke()
    })
  }

  render() {
    return null
  }
}

MarkSeriesCanvas.displayName = 'MarkSeriesCanvas'

MarkSeriesCanvas.propTypes = {
  ...AbstractSeries.propTypes,
}

export default MarkSeriesCanvas
