import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const TYPE = "SELECT";

const SET_SELECT_VALUE = "SET_SELECT_VALUE";
const setSelectValueAction = payload => ({
  type: SET_SELECT_VALUE,
  payload
});

const reducer = (state, { type, payload }) => {
  if (type === SET_SELECT_VALUE) {
    const { id, value } = payload;
    return {
      ...state,
      [id]: { ...state[id], value }
    };
  }
  return state;
};

const Select = styled.select`
  color: black;
  display: block;
  height: 1.5em;
  line-height: 1.5em;
  position: relative;
  padding-right: 1.5em;
  padding-left: 0.75em;
  border: none;
  box-sizing: border-box;
  margin: 0;
  border-radius: 1em;
  appearance: none;
  background-color: white;
  background-repeat: no-repeat, repeat;
  background-position: right 0.5em top 50%, 0 0;
  background-size: 1em auto, 100%;
  :hover,
  :focus {
    background-color: gray;
    outline: none;
  }
  option {
    font-weight: normal;
  }
`;

export const SingleSelect = ({ options = [], onChange, ...props }) => {
  return (
    <Select {...props} onChange={e => onChange(e.currentTarget.value)}>
      {!props.value ? <option value="">Please choose an option</option> : null}
      {options.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </Select>
  );
};

const ConnectedSelect = connect(
  (state, { id }) => ({ id, ...state[id] }),
  (_, { id }) => ({
    onChange: value => setSelectValueAction({ id, value })
  })
)(SingleSelect);

export default {
  name: "Select",
  type: TYPE,
  component: ConnectedSelect,
  reducer
};
