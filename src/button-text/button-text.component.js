import PropTypes from "prop-types";
import styled from "styled-components";

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
  color: var(--primary600, hsl(200, 30%, 10%));
  :hover,
  :focus {
    color: var(--primary700, hsl(200, 30%, 15%));
  }
  :active {
    color: var(--primary800, hsl(200, 30%, 20%));
  }
  :disabled {
    color: var(--primary700, hsl(200, 10%, 40%));
    cursor: auto;
  }
`;

Button.propTypes = { onClick: PropTypes.function };

export default Button;
