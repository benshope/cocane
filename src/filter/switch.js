// @flow
import React from 'react';
import styled from 'styled-components';
import {theme} from './theme';

const SwitchLabel = styled.label`
  margin: 0;
  position: relative;
  display: inline-block;
  max-width: 2.5em;
  height: 1.5em;
  outline: none;
  input {
    position: absolute;
    left: -99999px;
  }
  .ui-switch {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme(['colors', 'mono400'])};
    transition: 0.1s;
    border-radius: 1.5em;
  }
  .ui-switch:before {
    position: absolute;
    content: '';
    height: 0.9em;
    width: 0.9em;
    left: 0.3em;
    bottom: 0.3em;
    background-color: ${theme(['colors', 'mono800'])};
    transition: 0.1s;
    border-radius: 50%;
  }
  input:hover + .ui-switch {
    background-color: ${theme(['colors', 'mono400'])};
  }
  input:focus + .ui-switch {
    background-color: ${theme(['colors', 'mono400'])};
  }
  input:checked + .ui-switch {
    background-color: ${theme(['colors', 'mono800'])};
    :before {
      background-color: white;
    }
  }
  input:focus:checked + .ui-switch {
    background-color: ${theme(['colors', 'mono900'])};
  }
  input:checked + .ui-switch:before {
    transform: translateX(1em);
  }
`;

type Props = {
  checked?: boolean,
  defaultChecked?: boolean,
  className?: string,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void
};

class Switch extends React.Component<Props, {checked: boolean}> {
  state = {
    checked: Boolean(this.props.defaultChecked)
  };

  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      checked:
        this.props.checked === undefined
          ? !this.state.checked
          : !this.props.checked
    });
    this.props.onChange(e);
  };

  render() {
    return (
      <SwitchLabel>
        <input
          {...this.props}
          type="checkbox"
          checked={
            this.props.checked === undefined
              ? this.state.checked
              : this.props.checked
          }
          onChange={this.handleChange}
        />
        <div className="ui-switch" />
      </SwitchLabel>
    );
  }
}

export default Switch;
