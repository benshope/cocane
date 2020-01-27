import PropTypes from 'prop-types'
import styled from 'styled-components'

import { mono, primary } from '../theme'

const Button = styled.button`
  height: 2em;
  padding: 0 0.5em;
  line-height: 1.5em;
  font-size: 1.5em;
  border: none;
  outline: none;
  cursor: pointer;
  transition: color 0.1s ease;
  background: none;
  color: ${primary(60)};
  :hover,
  :focus {
    color: ${primary(70)};
  }
  :active {
    color: ${primary(80)};
  }
  :disabled {
    color: ${primary(70)};
    cursor: auto;
  }
`

Button.propTypes = { onClick: PropTypes.function }

export default Button
