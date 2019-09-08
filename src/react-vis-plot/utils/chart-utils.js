import PropTypes from 'prop-types'

/**
 * Get the dimensions of the component for the future use.
 * @param {Object} props Props.
 * @param {Object} defaultMargins Object with default margins.
 * @returns {Object} Dimensions of the component.
 */
export function getInnerDimensions(props, defaultMargins) {
  const { margin, width, height } = props
  const marginProps = {
    ...defaultMargins,
    ...(typeof margin === 'number'
      ? {
          left: margin,
          right: margin,
          top: margin,
          bottom: margin,
        }
      : margin),
  }
  const {
    left: marginLeft = 0,
    top: marginTop = 0,
    right: marginRight = 0,
    bottom: marginBottom = 0,
  } = marginProps
  return {
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    innerHeight: height - marginBottom - marginTop,
    innerWidth: width - marginLeft - marginRight,
  }
}

/**
 * Calculate the margin of the sunburst,
 * so it can be at the center of the container
 * @param  {Number} width - the width of the container
 * @param  {Number} height - the height of the container
 * @param  {Number} radius - the max radius of the sunburst
 * @return {Object} an object includes {bottom, left, right, top}
 */
export function getRadialLayoutMargin(width, height, radius) {
  const marginX = width / 2 - radius
  const marginY = height / 2 - radius
  return {
    bottom: marginY,
    left: marginX,
    right: marginX,
    top: marginY,
  }
}

export const MarginPropType = PropTypes.oneOfType([
  PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
  }),
  PropTypes.number,
])

export const DEFAULT_MARGINS = {
  left: 40,
  right: 10,
  top: 10,
  bottom: 40,
}
