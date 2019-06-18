import React from "react";
// import styled from "styled-components";
import { connect } from "react-redux";

const TYPE = "INPUT";

const SET_INPUT_VALUE = "SET_INPUT_VALUE";
const setInputAction = payload => ({
  type: SET_INPUT_VALUE,
  payload
});

const reducer = (state, { type, payload }) => {
  if (type === SET_INPUT_VALUE) {
    const { id, value } = payload;
    return {
      ...state,
      [id]: { ...state[id], value }
    };
  }
  return state;
};

const Input = ({ value, type = "number", onChange }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

const ConnectedInput = connect(
  (state, { id }) => ({ id, ...state[id] }),
  (_, { id }) => ({
    onChange: value => setInputAction({ id, value })
  })
)(Input);

export default {
  name: "Input",
  type: TYPE,
  component: ConnectedInput,
  reducer
};
