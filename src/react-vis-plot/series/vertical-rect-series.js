import React from 'react'

import AbstractSeries from './abstract-series'
import RectSeries from './rect-series'

class VerticalRectSeries extends AbstractSeries {
  static getParentConfig(attr) {
    const isDomainAdjustmentNeeded = false
    const zeroBaseValue = attr === 'y'
    return {
      isDomainAdjustmentNeeded,
      zeroBaseValue,
    }
  }

  render() {
    return (
      <RectSeries
        {...this.props}
        linePosAttr="x"
        valuePosAttr="y"
        lineSizeAttr="width"
        valueSizeAttr="height"
      />
    )
  }
}

VerticalRectSeries.displayName = 'VerticalRectSeries'

export default VerticalRectSeries
