import cell from '../cell'
import cellReducer from '../cell.reducers'
import arrayMove from 'array-move'

import {
  ADD_CELL,
  REMOVE_CELL,
  CHANGE_CELL_TYPE,
  MOVE_CELL,
} from './grid-layout.actions'

// TODO break out anything non-layout
// this should just set width & order
export default (s = {}, a) => {
  console.log(s, a)
  return [
    cell.reducer,
    cellReducer,
    (state, action) => {
      const { type, payload } = action
      if (type === ADD_CELL) {
        const cellID = Math.random().toString(36)
        return {
          ...state,
          // TODO this part should be handled on
          // REQUEST_ADD_CELL
          [cellID]: { type: payload && payload.type },
          // or this should be // ADD_CELL_SUCCESS
          [payload.id]: {
            ...state[payload.id],
            value: [...(state[payload.id].value || []), { id: cellID }],
          },
        }
      }
      if (type === CHANGE_CELL_TYPE) {
        // TODO should refer to sub-reducers here
        const nextCellType = cellList.reduce(
          (acc, cell, i) => ({
            ...acc,
            [cell.type]: cellList[cellList.length % (i + 1)].type,
          }),
          {}
        )
        return {
          ...state,
          [payload]: { type: nextCellType[state[payload].type] },
        }
      }
      if (type === REMOVE_CELL) {
        const { [payload]: omit, ...nextState } = state
        return nextState
      }
      if (type === MOVE_CELL) {
        const { id, newIndex, oldIndex } = payload
        return {
          ...state,
          [id]: {
            ...state[id],
            value: arrayMove([...state[id].value], oldIndex, newIndex),
          },
        }
      }
      return state
    },
  ].reduce((acc, r) => r(acc, a), s)
}
