import { SET_CELL_VALUE, SET_CELL_INPUT } from "./cell.actions";

const reducer = (state = {}, { type, payload }) => {
  if (type === SET_CELL_VALUE) {
    const { id, value } = payload;
    return {
      ...state,
      [id]: { ...state[id], value }
    };
  }
  if (type === SET_CELL_INPUT) {
    const { id, value } = payload;
    return {
      ...state,
      [id]: { ...state[id], input: value }
    };
  }
  return state;
};

export default reducer;
