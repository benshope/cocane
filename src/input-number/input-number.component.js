import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  &,
  * {
    box-sizing: border-box;
  }
  height: 2em;
  font-size: 1em;
  flex: 1;
  line-height: 2em;
  padding: 0 1em;
  border-radius: var(--spacing_1, 1em);
  color: var(--mono1000, black);
  border: 2px solid var(--mono200, hsl(200, 5%, 80%));
  background: var(--mono100, hsl(200, 5%, 100%));
  transition: background 0.1s ease;
  transition: border-color 0.1s ease;
  :focus {
    color: var(--mono1000, black);
    outline: none;
    border: 2px solid var(--mono300, hsl(200, 5%, 70%));
  }
`

const InputNumber = props => (
  <Input
    {...{
      ...props,
      type: 'number',
      onChange: e => props.onChange(parseFloat(e.currentTarget.value)),
      placeholder: 'Enter number...',
    }}
  />
)

// TODO add onChange
InputNumber.propTypes = {
  value: PropTypes.number,
}

export default InputNumber
