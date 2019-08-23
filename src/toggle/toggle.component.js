import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const ToggleLabel = styled.label`
  margin: 0;
  position: relative;
  display: inline-block;
  max-width: 2.5em;
  min-width: 2.5em;
  height: 1.5em;
  outline: none;
  input {
    position: absolute;
    left: -99999px;
  }
  .toggle-dot {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background-color, lightgray);
    transition: 0.1s;
    border-radius: 1.5em;
  }
  .toggle-dot:before {
    position: absolute;
    content: "";
    height: 0.9em;
    width: 0.9em;
    left: 0.3em;
    bottom: 0.3em;
    background-color: var(--background-color, gray);
    transition: 0.1s;
    border-radius: 50%;
  }
  input:hover + .toggle-dot {
    background-color: var(--background-color, lightgray);
  }
  input:focus + .toggle-dot {
    background-color: var(--background-color, lightgray);
  }
  input:checked + .toggle-dot {
    background-color: var(--background-color, gray);
    :before {
      background-color: var(--background-color, white);
    }
  }
  input:focus:checked + .toggle-dot {
    background-color: var(--background-color, black);
  }
  input:checked + .toggle-dot:before {
    transform: translateX(1em);
  }
`;

const Toggle = props => {
  return (
    <ToggleLabel>
      <input
        {...{
          ...props,
          onChange: e => props.onChange(Boolean(e.currentTarget.checked)),
          type: "checkbox"
        }}
      />
      <div className="toggle-dot" />
    </ToggleLabel>
  );
};

Toggle.propTypes = { value: PropTypes.bool };

export default Toggle;
