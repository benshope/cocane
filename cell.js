import React, { useState } from 'react'
import { connect } from 'react-redux'

import sql from './cell-sql'

const cellRenderers = {
	...sql,
}

// TODO same api as sub-cells?
// TODO a cell nees to be able to be
// initialized with {value: null}
const Cell = connect(({ cells }) => ({ cells }))(({ id, cells }) => {
	// dispatchGetCell
	return cells[id]
		? cellRenderers[cells[id].type]({ id })
		: `Loading ${id}...`
})

export default Cell
