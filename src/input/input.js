import React from "react";
// import styled from "styled-components";
import { connect } from "react-redux";

import { Input } from "./input.styles";

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

const Component = ({ value, type = "number", onChange }) => {
  return (
    <Input
      type={type}
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

const ConnectedComponent = connect(
  (state, { id }) => ({ id, ...state[id] }),
  (dispatch, { id }) => ({
    onChange: value => dispatch(setInputAction({ id, value }))
  })
)(Component);

export default {
  name: "Input",
  type: TYPE,
  inputs: () => null,
  component: ConnectedComponent,
  reducer
};
