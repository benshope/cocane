import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { mono } from '../theme'

const Input = styled.input`
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  flex: 1;
  line-height: ${({ theme: { scale, spacing } }) => scale + spacing}em;
  border-radius: ${({ theme: { scale, spacing } }) => spacing * 2}em;
  padding: 0 1em;
  color: ${mono(0)};
  border: 2px solid ${mono(80)};
  background: ${mono(100)};
  transition: background 0.1s ease;
  transition: border-color 0.1s ease;
  :focus {
    color: ${mono(0)};
    outline: none;
    border: 2px solid ${mono(30)};
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
