import { connect } from "react-redux";
import uniq from "lodash/fp/uniq";

import Select from "./select.component";
import { setCellValueAction } from "../cell.actions";

export default connect(
  (state, { id }) => ({
    id,
    ...state[id],
    ...(state[id].options
      ? { options: state[id].options }
      : state[id].input &&
        Array.isArray(state[state[id].input].value) &&
        state[state[id].input].value.length
      ? {
          options: uniq(state[state[id].input].value).map(x => ({
            name: x,
            value: x
          }))
        }
      : { options: [], disabled: true })
  }),
  (dispatch, { id }) => ({
    onChange: e =>
      dispatch(setCellValueAction({ id, value: e.currentTarget.value }))
  })
)(Select);
