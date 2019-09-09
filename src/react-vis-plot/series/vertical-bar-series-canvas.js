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
    const isDomainAdjustmentNeeded = attr === 'x'
    const zeroBaseValue = attr === 'y'
    return {
      isDomainAdjustmentNeeded,
      zeroBaseValue,
    }
  }

  static renderLayer(props, ctx) {
    BarSeries.renderLayer(
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

HorizontalBarSeriesCanvas.displayName = 'HorizontalBarSeriesCanvas'
HorizontalBarSeriesCanvas.propTypes = {
  ...AbstractSeries.propTypes,
}

export default HorizontalBarSeriesCanvas
