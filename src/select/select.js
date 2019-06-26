import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import stringListInput from "../string-list-input/string-list-input";

const TYPE = "SELECT";

const SET_SELECT_VALUE = "SET_SELECT_VALUE";
const setSelectValueAction = payload => ({
  type: SET_SELECT_VALUE,
  payload
});
const SET_SELECT_INPUT = "SET_SELECT_INPUT";
const setSelectInputAction = payload => ({
  type: SET_SELECT_INPUT,
  payload
});

const reducer = (state, { type, payload }) => {
  console.log("select reducer", type, payload);
  if (type === SET_SELECT_VALUE) {
    const { id, value } = payload;
    return {
      ...state,
      [id]: { ...state[id], value }
    };
  }
  if (type === SET_SELECT_INPUT) {
    const { id, value } = payload;
    return {
      ...state,
      [id]: { ...state[id], input: value }
    };
  }
  return state;
};

const Select = styled.select`
  color: black;
  display: block;
  height: 1.5rem;
  line-height: 1.5rem;
  position: relative;
  padding-right: 1.5rem;
  padding-left: 0.75em;
  border: 1px solid black;
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
  (state, { id }) => ({
    id,
    ...state[id],
    options: state[id].input
      ? state[state[id].input].value.map(x => ({ name: x, value: x }))
      : []
  }),
  (dispatch, { id }) => ({
    onChange: value => dispatch(setSelectValueAction({ id, value }))
  })
)(SingleSelect);

// only allow selection of string-list or number-list
const SelectTypes = ({ options = {}, onChange }) => {
  return (
    <div>
      {Object.keys(options).length
        ? Object.entries(options).map(([optionKey, optionData]) => (
            <button
              key={optionKey}
              onClick={() => onChange(optionKey)}
            >{`TODO: text description here.  TYPE: ${
              optionData.type
            } ID: ${optionKey}`}</button>
          ))
        : "No inputs"}
    </div>
  );
};

const ConnectedArrayOutputSelector = connect(
  (state, { id }) => {
    return {
      options: Object.entries(state).reduce((acc, [cellKey, cellData]) => {
        if (
          cellKey !== id &&
          // TODO get as consts
          [stringListInput.type, "NUMBER_LIST"].includes(cellData.type)
        ) {
          acc[cellKey] = cellData;
        }
        return acc;
      }, {})
    };
  },
  (dispatch, { id }) => ({
    onChange: value => dispatch(setSelectInputAction({ id, value }))
  })
)(SelectTypes);

export default {
  name: "Select",
  inputs: ConnectedArrayOutputSelector,
  type: TYPE,
  component: ConnectedSelect,
  reducer
};
