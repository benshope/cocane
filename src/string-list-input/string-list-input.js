import React from "react";
import { connect } from "react-redux";

const TYPE = "STRING_LIST_INPUT";

const SET_STRING_LIST_INPUT_VALUE = "SET_STRING_LIST_INPUT_VALUE";
const setInputAction = payload => ({
  type: SET_STRING_LIST_INPUT_VALUE,
  payload
});

const reducer = (state, { type, payload }) => {
  console.log("reducer gets", type, payload);
  if (type === SET_STRING_LIST_INPUT_VALUE) {
    const { id, value } = payload;
    return {
      ...state,
      [id]: { ...state[id], value }
    };
  }
  return state;
};

const StringListComponent = ({ value, type = "text", onChange }) => {
  console.log("XXX rendering stringlistinput", value, type, onChange);
  return (
    <div>
      {value.map((v, i) => (
        <input
          key={i}
          type={type}
          value={v}
          onChange={e => {
            console.log(
              "in onchange",
              e.target.value,
              Object.assign([...value], { [i]: e.target.value })
            );
            onChange(Object.assign([...value], { [i]: e.target.value }));
          }}
        />
      ))}
      <button
        onClick={() => {
          console.log("trying to change to ", [...value, ""]);
          onChange([...value, ""]);
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
)(StringListComponent);

export default {
  name: "String List Input",
  type: TYPE,
  inputs: () => null,
  component: ConnectedComponent,
  reducer
};
