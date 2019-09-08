import React from 'react'

import AbstractSeries from './abstract-series'
import BarSeries from './bar-series'

class HorizontalBarSeries extends AbstractSeries {
  static getParentConfig(attr) {
    const isDomainAdjustmentNeeded = attr === 'y'
    const zeroBaseValue = attr === 'x'
    return {
      isDomainAdjustmentNeeded,
      zeroBaseValue,
    }
  }

  render() {
    return (
      <BarSeries
        {...this.props}
        linePosAttr="y"
        valuePosAttr="x"
        lineSizeAttr="height"
        valueSizeAttr="width"
      />
    )
  }
}

HorizontalBarSeries.displayName = 'HorizontalBarSeries'

export default HorizontalBarSeries
