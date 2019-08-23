import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  transition: all linear 0.1s;
  color: black;
  display: block;
  height: 2em;
  font-size: 1em;
  line-height: 2em;
  position: relative;
  padding-right: 1.5em;
  padding-left: 1em;
  box-sizing: border-box;
  margin: 0;
  border-radius: 1em;
  appearance: none;
  background-color: lightgray;
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

const Select = ({ options = [], ...props }) => {
  return (
    <StyledSelect {...props}>
      {!props.value ? <option value="">Choose an option</option> : null}
      {options.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
