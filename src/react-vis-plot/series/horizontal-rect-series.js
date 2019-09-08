import React from 'react'

import AbstractSeries from './abstract-series'
import RectSeries from './rect-series'

class HorizontalRectSeries extends AbstractSeries {
  static getParentConfig(attr) {
    const isDomainAdjustmentNeeded = false
    const zeroBaseValue = attr === 'x'
    return {
      isDomainAdjustmentNeeded,
      zeroBaseValue,
    }
  }

  render() {
    return (
      <RectSeries
        {...this.props}
        linePosAttr="y"
        valuePosAttr="x"
        lineSizeAttr="height"
        valueSizeAttr="width"
      />
    )
  }
}

HorizontalRectSeries.displayName = 'HorizontalRectSeries'

export default HorizontalRectSeries
