import AbstractSeries from './abstract-series'
import RectSeries from './rect-series-canvas'

class HorizontalRectSeriesCanvas extends AbstractSeries {
  static get requiresSVG() {
    return false
  }

  static get isCanvas() {
    return true
  }

  static getParentConfig(attr) {
    const isDomainAdjustmentNeeded = false
    const zeroBaseValue = attr === 'y'
    return {
      isDomainAdjustmentNeeded,
      zeroBaseValue,
    }
  }

  static renderLayer(props, ctx) {
    RectSeries.renderLayer(
      {
        ...props,
        linePosAttr: 'x',
        valuePosAttr: 'y',
        lineSizeAttr: 'width',
        valueSizeAttr: 'height',
      },
      ctx
    )
  }

  render() {
    return null
  }
}

HorizontalRectSeriesCanvas.displayName = 'HorizontalRectSeriesCanvas'
HorizontalRectSeriesCanvas.propTypes = {
  ...AbstractSeries.propTypes,
}

export default HorizontalRectSeriesCanvas
