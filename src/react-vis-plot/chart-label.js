import React from 'react'

import PropTypes from 'prop-types'

class ChartLabel extends React.PureComponent {
  static get requiresSVG() {
    return true
  }

  render() {
    const {
      // rv defined
      innerHeight,
      innerWidth,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      // user defined
      className,
      includeMargin,
      style,
      text,
      xPercent,
      yPercent,
    } = this.props
    const width = innerWidth + (includeMargin ? marginLeft + marginRight : 0)
    const height = innerHeight + (includeMargin ? marginTop + marginBottom : 0)
    const xPos = width * xPercent + (includeMargin ? 0 : marginLeft)
    const yPos = height * yPercent + (includeMargin ? marginLeft : 0)
    return (
      <g
        transform={`translate(${xPos}, ${yPos})`}
        className={`rv-xy-plot__axis__title ${className}`}
      >
        <text {...style}>{text}</text>
      </g>
    )
  }
}

ChartLabel.displayName = 'ChartLabel'
ChartLabel.propTypes = {
  className: PropTypes.string,
  includeMargin: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
  xPercent: PropTypes.number.isRequired,
  yPercent: PropTypes.number.isRequired,
}
ChartLabel.defaultProps = {
  className: '',
  includeMargin: true,
  text: '',
  xPercent: 0,
  yPercent: 0,
  style: {},
}
export default ChartLabel
