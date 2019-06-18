// @flow
import React, {type Node} from 'react';
import styled from 'styled-components';
import {theme} from './theme';

type Props = {
  children: Node,
  indeterminate?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  className?: string,
  children?: Node,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void
};

const CheckboxContainer = styled.div`
  * {
    box-sizing: border-box;
  }
  line-height: 10px;
  position: relative;
  display: inline-block;
`;

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  svg {
    stroke-width: 4px;
    stroke: ${theme(['colors', 'primary400'])};
  }
  border: 2px solid
    ${p =>
      (p.checked || p.indeterminate
        ? theme(['colors', 'primary400'])
        : theme(['colors', 'mono600']))(p)};
  :hover {
    svg {
      stroke: ${theme(['colors', 'primary500'])};
    }
    border: 2px solid
      ${p =>
        (p.checked || p.indeterminate
          ? theme(['colors', 'primary500'])
          : theme(['colors', 'mono700']))(p)};
  }
  :active {
    svg {
      stroke: ${theme(['colors', 'primary600'])};
    }
    border: 2px solid
      ${p =>
        (p.checked || p.indeterminate
          ? theme(['colors', 'primary600'])
          : theme(['colors', 'mono800']))(p)};
  }
  border-radius: 2px;
  display: inline-block;
  border-radius: 3px;
  transition: all 150ms;
`;

const CheckSVG = styled.svg`
  width: 12px;
  height: 12px;
`;

class Checkbox extends React.Component<Props, {checked?: boolean}> {
  state = {checked: Boolean(this.props.defaultChecked)};

  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const newChecked =
      this.props.checked === undefined
        ? !this.state.checked
        : !this.props.checked;
    this.props.onChange(e);
    this.setState({checked: newChecked});
  };

  render() {
    /* eslint-disable no-unused-vars */
    const {className, indeterminate, defaultChecked, ...props} = this.props;
    /* eslint-enable no-unused-vars */
    const checked =
      this.props.checked === undefined
        ? this.state.checked
        : this.props.checked;
    return (
      <CheckboxContainer className={className}>
        <HiddenCheckbox
          checked={checked}
          {...props}
          type="checkbox"
          onChange={this.onChange}
        />
        <StyledCheckbox checked={checked} indeterminate={indeterminate}>
          <CheckSVG viewBox="0 0 24 24">
            {indeterminate ? (
              <path fill="none" d="M4,12 L20,12" />
            ) : checked ? (
              <path fill="none" d="M4,11 L10,18 L21,6" />
            ) : null}
          </CheckSVG>
        </StyledCheckbox>
      </CheckboxContainer>
    );
  }
}

export default Checkbox;
