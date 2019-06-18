// @flow

import {type ComponentType, type Node} from 'react';
import styled from 'styled-components';
import {theme} from './theme';

type ButtonProps = {
  children?: Node,
  disabled?: boolean,
  onClick?: mixed => mixed
};

export const Button: ComponentType<ButtonProps> = styled.button`
  cursor: pointer;
  border: none;
  font-weight: 500;
  border: 1px solid ${theme(['colors', 'mono800'])};
  border-radius: ${theme(['borders', 'radius200'])};
  line-height: 2em;
  padding: 0 0.5rem;
  text-align: center;
  outline: none;
  border: none;
  color: ${theme(['colors', 'mono900'])};
  background: ${theme(['colors', 'mono100'])};
  :hover {
    background: ${theme(['colors', 'mono200'])};
  }
  :focus {
    background: ${theme(['colors', 'mono300'])};
    outline: none;
  }
  :active {
    background: ${theme(['colors', 'mono400'])};
  }
  :disabled {
    background: ${theme(['colors', 'mono200'])};
    cursor: auto;
    color: ${theme(['colors', 'mono500'])};
  }
`;

export const ButtonPrimary: ComponentType<ButtonProps> = styled(Button)`
  color: white;
  background: ${theme(['colors', 'primary500'])};
  :hover {
    background: ${theme(['colors', 'primary600'])};
  }
  :focus {
    background: ${theme(['colors', 'primary600'])};
  }
  :active {
    ${theme(['colors', 'primary700'])};
  }
`;

export const ButtonGroup: ComponentType<{
  children?: Node
}> = styled.div`
  display: flex;
  > * {
    font-weight: 600;
    margin: 0;
    flex: 1;
    line-height: 2em;
    cursor: pointer;
    border-radius: 0;
    border: none;
    border-right: 1px solid white;
    color: ${theme(['colors', 'mono900'])};
    background: ${theme(['colors', 'mono200'])};
    :first-child {
      border-radius: ${theme(['borders', 'radius200'])} 0 0
        ${theme(['borders', 'radius200'])};
    }
    :last-child {
      border: none;
      border-radius: 0 ${theme(['borders', 'radius200'])}
        ${theme(['borders', 'radius200'])} 0;
    }
    :hover {
      background: ${theme(['colors', 'mono300'])};
    }
    :focus {
      background: ${theme(['colors', 'mono300'])};
      outline: none;
    }
    :active {
      background: ${theme(['colors', 'mono400'])};
    }
    :disabled {
      color: white;
      cursor: default;
      background: ${theme(['colors', 'primary500'])};
      :hover {
        background: ${theme(['colors', 'primary500'])};
      }
      :active {
        background: ${theme(['colors', 'primary500'])};
      }
      :focus {
        background: ${theme(['colors', 'primary600'])};
      }
    }
  }
`;

export const IconButton = styled(Button)`
  cursor: pointer;
  line-height: 2rem;
  height: 2rem;
  min-width: 2rem;
  padding: 0;
  background: none;
  text-align: center;
  svg {
    margin-bottom: -2px;
    pointer-events: none;
  }
  color: ${theme(['colors', 'mono800'])};
  border: none;
  :hover {
    color: ${theme(['colors', 'mono1000'])};
  }
  :active {
    color: ${theme(['colors', 'mono700'])};
  }
  :focus {
    color: ${theme(['colors', 'mono900'])};
  }
`;
