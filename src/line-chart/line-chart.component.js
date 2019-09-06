import React from 'react'
import PropTypes from 'prop-types'
import d3Shape from 'd3-shape'

// import { DEFAULT_OPACITY } from 'theme'
// import { ANIMATED_SERIES_PROPS } from 'utils/series-utils'

// import AbstractSeries from './abstract-series'

const LinePath = ({
  curve,
  marginLeft,
  marginTop,
  strokeDasharray,
  strokeStyle,
  strokeWidth,
  style,
  animation,
  className,
  data,
}) => {
  if (!data) {
    return null
  }
  return null

  // const x = this._getAttributeFunctor('x');
  // const y = this._getAttributeFunctor('y');
  // const stroke =
  //   this._getAttributeValue('stroke') || this._getAttributeValue('color');
  // const newOpacity = this._getAttributeValue('opacity');
  // const opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY;
  // const getNull = this.props.nullAccessor || this.props.getNull;
  //     let line = d3Shape.line();
  // if (curve !== null) {
  //   if (typeof curve === 'string' && d3Shape[curve]) {
  //     line = line.curve(d3Shape[curve]);
  //   } else if (typeof curve === 'function') {
  //     line = line.curve(curve);
  //   }
  // }
  // line = line.defined(getNull);
  // line = line.x(x).y(y);
  // const d = line(data);

  // return (
  //   <path
  //     d={d}
  //     transform={`translate(${marginLeft},${marginTop})`}
  //     onMouseOver={this._seriesMouseOverHandler}
  //     onMouseOut={this._seriesMouseOutHandler}
  //     onClick={this._seriesClickHandler}
  //     onContextMenu={this._seriesRightClickHandler}
  //     style={{
  //       opacity,
  //       strokeWidth,
  //       stroke,
  //       ...style
  //     }}
  //   />
  // );
  // }
}

LineSeries.propTypes = {
  // ...AbstractSeries.propTypes,
  // strokeStyle: PropTypes.oneOf(Object.keys(STROKE_STYLES)),
  curve: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  getNull: PropTypes.func,
}

LineSeries.defaultProps = {
  // ...AbstractSeries.defaultProps,
  strokeStyle: 'solid',
  style: {},
  opacity: 1,
  curve: null,
  className: '',
  getNull: () => true,
}

export default LineSeries
