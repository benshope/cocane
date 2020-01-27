import PropTypes from 'prop-types'
import styled from 'styled-components'

import { mono, primary } from '../theme'

const Button = styled.button`
  padding: 0 ${({ theme: { spacing } }) => spacing}em;
  border-radius: ${({ theme: { spacing } }) => 1 + spacing}em;
  line-height: ${({ theme: { spacing } }) => 1 + spacing}em;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background 0.1s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${primary(60)};
  color: white;
  :hover,
  :focus {
    background: ${primary(70)};
  }
  :active {
    background: ${primary(80)};
  }
  :disabled {
    background: ${primary(70)};
    color: ${mono(0)};
    cursor: auto;
  }
`

Button.propTypes = { onClick: PropTypes.function }

export default Button
