import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = styled.button`
  font-size: var(--scale, 1em);
  height: 2em;
  padding: 0 var(--spacing_1, 1em);
  line-height: 2em;
  border-radius: var(--spacing_1, 1em);
  border: none;
  outline: none;
  cursor: pointer;
  transition: background 0.1s ease;
  background: var(--primary600, hsl(200, 30%, 40%));
  color: ${({ theme: { isDark } }) => (isDark ? 'black' : 'white')};
  :hover,
  :focus {
    background: var(--primary700, hsl(200, 30%, 30%));
  }
  :active {
    background: var(--primary800, hsl(200, 30%, 20%));
  }
  :disabled {
    background: var(--primary700, hsl(200, 10%, 40%));
    color: ${({ theme: { isDark } }) => (isDark ? 'black' : 'white')};
    cursor: auto;
  }
`

Button.propTypes = { onClick: PropTypes.function }

export default Button
