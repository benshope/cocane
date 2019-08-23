import { connect } from "react-redux";

import { setCellValueAction } from "./cell.actions";

export const cellValueContainer = connect(
  (state, { id }) => state[id],
  (dispatch, { id }) => ({
    onChange: value => dispatch(setCellValueAction({ id, value }))
  })
);

export const cellInputContainer = connect(
  (state, { id }) => ({
    ...state[id],
    value:
      state[id] &&
      state[id].input &&
      state[state[id].input] &&
      state[state[id].input].value
  }),
  {}
);
