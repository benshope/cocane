// @flow
import styled from 'styled-components';

import {theme} from './theme';

export const Input = styled.input`
  font-family: ${theme(['primaryFontFamily'])};
  overflow: hidden;
  background: ${theme(['colors', 'mono200'])};
  &:active,
  &:focus {
    outline: none;
  }
  line-height: 2em;
  padding: 0 0.5em;
  border-radius: 4px;
  border: 1px solid ${theme(['colors', 'mono700'])};
  :hover {
    background: ${theme(['colors', 'primary50'])};
    border-color: ${theme(['colors', 'primary600'])};
  }
  :active,
  :focus {
    background: white;
    border-color: ${theme(['colors', 'primary600'])};
  }
`;

export const Select = styled.select`
  font-family: ${theme(['primaryFontFamily'])};
  overflow: hidden;
  background: ${theme(['colors', 'mono200'])};
  &:active,
  &:focus {
    outline: none;
  }
  line-height: 2em;
  padding: 0 0.5em;
  margin-right: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${theme(['colors', 'mono700'])};
  :hover {
    background: ${theme(['colors', 'primary50'])};
    border-color: ${theme(['colors', 'primary600'])};
  }
  :active,
  :focus {
    background: white;
    border-color: ${theme(['colors', 'primary600'])};
  }
  margin: 0;
  display: inline-block;
  appearance: none;
  cursor: pointer;
`;

export const RangeInput = styled.input`
  isolation: isolate;
  cursor: pointer;
  appearance: none;
  margin: 0;
  width: 100%;
  border: 0;
  outline: none;
  left: 0;
  height: 2em;
  ::-webkit-slider-thumb {
    box-sizing: content-box;
    cursor: grab;
    height: 0.5em;
    border: none;
    border-radius: ${theme(['borders', 'radius200'])};
    background-color: ${theme(['colors', 'mono600'])};
    width: 2px;
    max-width: 2px;
    height: 0.6em;
    border: 1px solid white;
    border-width: 0.45em calc(0.75em - 1px);
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.5);
    appearance: none;
    pointer-events: all;
  }
  :focus::-webkit-slider-thumb {
    background-color: ${theme(['colors', 'mono700'])};
  }
  :hover::-webkit-slider-thumb {
    background-color: ${theme(['colors', 'mono800'])};
  }
  :active,
  :active::-webkit-slider-thumb {
    cursor: grabbing;
  }
  :active::-webkit-slider-thumb {
    background-color: ${theme(['colors', 'mono800'])};
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.8);
  }
  &:active,
  &:focus {
    outline: none;
  }
`;

export const InputLabel = styled.label`
  font-family: ${theme(['primaryFontFamily'])};
  padding: 0 0.5em;
  display: flex;
  line-height: 2em;
  font-size: 1em;
  border-radius: ${theme(['borders', 'radius200'])};
  cursor: text;
  border-style: solid;
  background: ${theme(['colors', 'mono300'])};
  border: 1px solid ${theme(['colors', 'mono300'])};
  color: ${theme(['colors', 'mono900'])};
  input {
    font-size: 1em;
  }
  input::placeholder {
    line-height: 2em;
    color: ${theme(['colors', 'mono700'])};
  }
  align-items: center;
  justify-content: flex-center;
  :hover {
    background: white;
    border-color: ${theme(['colors', 'mono400'])};
  }
  :focus-within {
    background: white;
    color: ${theme(['colors', 'primary400'])};
    input {
      color: ${theme(['colors', 'mono1000'])};
    }
    border-color: ${theme(['colors', 'primary400'])};
  }
  input {
    outline: none;
    border: none;
    background: none;
    flex: 1;
  }
`;

export const HighlightsDiv = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  transform: translate(0, -2px);
  border-radius: 2px;
  height: 4px;
  background: ${theme(['colors', 'mono400'])};
  overflow: hidden;
  width: 100%;
`;

export const RangeWithHighlightsDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const RangeInputsWrapperDiv = styled.div`
  font-family: ${theme(['primaryFontFamily'])};
  width: 100%;
  font-size: 1em;
  position: relative;
  input {
    padding: 0;
    position: absolute;
    box-sizing: border-box;
    appearance: none;
    background: none;
    pointer-events: none;
    :first-child {
      position: relative;
    }
    ::-webkit-slider-thumb {
      pointer-events: all;
    }
    &.hovered {
      pointer-events: all;
    }
  }
`;
