import AbstractSeries from './abstract-series'
import BarSeries from './bar-series-canvas'

class HorizontalBarSeriesCanvas extends AbstractSeries {
  static get requiresSVG() {
    return false
  }

  static get isCanvas() {
    return true
  }

  static getParentConfig(attr) {
    const isDomainAdjustmentNeeded = attr === 'y'
    const zeroBaseValue = attr === 'x'
    return {
      isDomainAdjustmentNeeded,
      zeroBaseValue,
    }
  }

  static renderLayer(props, ctx) {
    BarSeries.renderLayer(
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

HorizontalBarSeriesCanvas.displayName = 'HorizontalBarSeriesCanvas'
HorizontalBarSeriesCanvas.propTypes = {
  ...AbstractSeries.propTypes,
}

export default HorizontalBarSeriesCanvas
