import AbstractSeries from './abstract-series'
import MarkSeriesCanvas from './mark-series-canvas'
import LineSeriesCanvas from './line-series-canvas'

class LineMarkSeriesCanvas extends AbstractSeries {
  static get requiresSVG() {
    return false
  }

  static get isCanvas() {
    return true
  }

  static renderLayer(props, ctx) {
    LineSeriesCanvas.renderLayer(props, ctx)
    MarkSeriesCanvas.renderLayer(props, ctx)
  }

  render() {
    return null
  }
}

LineMarkSeriesCanvas.displayName = 'LineMarkSeriesCanvas'
LineMarkSeriesCanvas.propTypes = {
  ...AbstractSeries.propTypes,
}

export default LineMarkSeriesCanvas
