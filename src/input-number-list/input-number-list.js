import React from "react";
import { connect } from "react-redux";

const TYPE = "NUMBER_LIST_INPUT";

const SET_NUMBER_LIST_INPUT_VALUE = "SET_NUMBER_LIST_INPUT_VALUE";
const setInputAction = payload => ({
  type: SET_NUMBER_LIST_INPUT_VALUE,
  payload
});

const reducer = (state, { type, payload }) => {
  if (type === SET_NUMBER_LIST_INPUT_VALUE) {
    const { id, value } = payload;
    return {
      ...state,
      [id]: { ...state[id], value }
    };
  }
  return state;
};

const NumberListComponent = ({ value = [], onChange }) => {
  return (
    <div>
      {value.map((v, i) => (
        <input
          key={i}
          type="number"
          placeholder="Number input..."
          value={v}
          step={1}
          autoFocus={i === value.length - 1}
          onChange={e => {
            onChange(
              Object.assign([...value], {
                [i]: isNaN(e.currentTarget.value)
                  ? e.currentTarget.value
                  : parseFloat(e.currentTarget.value)
              })
            );
          }}
        />
      ))}
      <button
        onClick={() => {
          onChange([...value, 0]);
        }}
      >
        {"Add Input"}
      </button>
    </div>
  );
};

const ConnectedComponent = connect(
  (state, { id }) => ({ id, ...state[id] }),
  (dispatch, { id }) => ({
    onChange: value => dispatch(setInputAction({ id, value }))
  })
)(NumberListComponent);

export default {
  name: "Number List Input",
  type: TYPE,
  inputs: () => null,
  component: ConnectedComponent,
  reducer
};
