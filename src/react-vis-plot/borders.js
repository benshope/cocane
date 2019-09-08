import React from 'react'

import PropTypes from 'prop-types'

const propTypes = {
  style: PropTypes.shape({
    bottom: PropTypes.object,
    left: PropTypes.object,
    right: PropTypes.object,
    top: PropTypes.object,
  }),
  // supplied by xyplot
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  innerWidth: PropTypes.number,
  innerHeight: PropTypes.number,
}

const CLASSES = {
  bottom: 'rv-xy-plot__borders-bottom',
  container: 'rv-xy-plot__borders',
  left: 'rv-xy-plot__borders-left',
  right: 'rv-xy-plot__borders-right',
  top: 'rv-xy-plot__borders-top',
}

function Borders(props) {
  const {
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    innerWidth,
    innerHeight,
    style,
    className,
  } = props
  const height = innerHeight + marginTop + marginBottom
  const width = innerWidth + marginLeft + marginRight
  return (
    <g className={`${CLASSES.container} ${className}`}>
      <rect
        className={`${CLASSES.bottom} ${className}-bottom`}
        style={{ ...style.all, ...style.bottom }}
        x={0}
        y={height - marginBottom}
        width={width}
        height={marginBottom}
      />
      <rect
        className={`${CLASSES.left} ${className}-left`}
        style={{ ...style.all, ...style.left }}
        x={0}
        y={0}
        width={marginLeft}
        height={height}
      />
      <rect
        className={`${CLASSES.right} ${className}-right`}
        style={{ ...style.all, ...style.right }}
        x={width - marginRight}
        y={0}
        width={marginRight}
        height={height}
      />
      <rect
        className={`${CLASSES.top} ${className}-top`}
        style={{ ...style.all, ...style.top }}
        x={0}
        y={0}
        width={width}
        height={marginTop}
      />
    </g>
  )
}

Borders.displayName = 'Borders'
Borders.defaultProps = {
  className: '',
  style: {
    all: {},
    bottom: {},
    left: {},
    right: {},
    top: {},
  },
}
Borders.propTypes = propTypes
Borders.requiresSVG = true

export default Borders
