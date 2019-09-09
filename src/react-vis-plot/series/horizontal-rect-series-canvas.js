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
    const zeroBaseValue = attr === 'x'
    return {
      isDomainAdjustmentNeeded,
      zeroBaseValue,
    }
  }

  static renderLayer(props, ctx) {
    RectSeries.renderLayer(
      {
        ...props,
        linePosAttr: 'y',
        valuePosAttr: 'x',
        lineSizeAttr: 'height',
        valueSizeAttr: 'width',
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
