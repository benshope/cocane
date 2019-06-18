import React from "react";
// import styled from "styled-components";
import { connect } from "react-redux";

const TYPE = "INPUT";

const SET_INPUT = "SET_INPUT";
const setInputAction = payload => ({
  type: SET_INPUT,
  payload
});

const reducer = (state, { type, payload }) => {
  if (type === SET_INPUT) {
    const { id, ...restOfPayload } = payload;
    return {
      ...state,
      [id]: restOfPayload
    };
  }
  return state;
};

const Input = ({ state, id, setInput }) => {
  const inputState = state[id];
  return (
    <input
      type="number"
      value={inputState.value}
      onChange={e =>
        setInput({ ...inputState, id, value: e.currentTarget.value })
      }
    />
  );
};

const ConnectedInput = connect(
  state => ({ state }),
  { setInput: setInputAction }
)(Input);

export default {
  name: "Input",
  type: TYPE,
  component: ConnectedInput,
  reducer
};
