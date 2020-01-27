export const ADD_CELL = 'ADD_CELL'
export const REMOVE_CELL = 'REMOVE_CELL'
export const CHANGE_CELL_TYPE = 'CHANGE_CELL_TYPE'
export const MOVE_CELL = 'MOVE_CELL'

export const addCellAction = payload => ({
	type: ADD_CELL,
	payload,
})
export const changeCellTypeAction = payload => ({
	type: CHANGE_CELL_TYPE,
	payload,
})
export const removeCellAction = payload => ({
	type: REMOVE_CELL,
	payload,
})
export const moveCellAction = payload => ({
	type: MOVE_CELL,
	payload,
})
