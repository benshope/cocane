import React from 'react'
import PropTypes from 'prop-types'

const predefinedClassName = 'rv-gradient-defs'

function GradientDefs(props) {
  const { className } = props
  return (
    <defs className={`${predefinedClassName} ${className}`}>
      {props.children}
    </defs>
  )
}

GradientDefs.displayName = 'GradientDefs'
GradientDefs.requiresSVG = true
GradientDefs.propTypes = {
  className: PropTypes.string,
}
GradientDefs.defaultProps = {
  className: '',
}

export default GradientDefs
