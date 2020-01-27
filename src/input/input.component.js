import PropTypes from 'prop-types'
import styled from 'styled-components'

import { mono } from '../theme'

const Button = styled.button`
  height: 2em;
  padding: 0 1rem;
  line-height: 2em;
  font-size: 1em;
  background: blue !important;
  color: white;
  border-radius: 1em;
  border: none;
  outline: none;
  :hover,
  :focus {
    background: green;
  }
  :active {
    background: red;
  }
  :disabled {
    background: gray;
    color: yellow;
    cursor: auto;
  }
`

Button.propTypes = { onClick: PropTypes.function }

export default Button
