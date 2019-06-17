import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import Cell from './cell'

const ADD_CELL = 'ADD_CELL'

const cellAPI = null

const simpleReducer = (state = { cells: {} }, { type, payload }) => {
	if (type === ADD_CELL) {
		return {
			...state,
			cells: {
				...state.cells,
				[payload]: true,
			},
		}
	}
	return state
}

const defaultStore = createStore(combineReducers(simpleReducer))

const Cells = ({ rootId, store = defaultStore }) => {
	return (
		<Provider store={store}>
			<Cell id={rootId} />
		</Provider>
	)
}

export default Cells
