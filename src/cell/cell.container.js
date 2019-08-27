import React from 'react'
import { connect } from 'react-redux'

import { cellByType } from './cell.list'

const Cell = ({ id, state = {} }) => {
  const cell = cellByType[state[id].type]
  return <cell.container id={id} />
}

export default connect(
  (state, { id }) => ({ id, state }),
  {}
)(Cell)
