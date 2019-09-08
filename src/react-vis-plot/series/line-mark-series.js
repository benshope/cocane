import React from 'react'
import PropTypes from 'prop-types'

import AbstractSeries from './abstract-series'
import LineSeries from './line-series'
import MarkSeries from './mark-series'

const propTypes = {
  ...LineSeries.propTypes,
  lineStyle: PropTypes.object,
  markStyle: PropTypes.object,
}

class LineMarkSeries extends AbstractSeries {
  static get defaultProps() {
    return {
      ...LineSeries.defaultProps,
      lineStyle: {},
      markStyle: {},
    }
  }

  render() {
    const { lineStyle, markStyle, style } = this.props
    return (
      <g className="rv-xy-plot__series rv-xy-plot__series--linemark">
        <LineSeries {...this.props} style={{ ...style, ...lineStyle }} />
        <MarkSeries {...this.props} style={{ ...style, ...markStyle }} />
      </g>
    )
  }
}

LineMarkSeries.displayName = 'LineMarkSeries'
LineMarkSeries.propTypes = propTypes

export default LineMarkSeries
