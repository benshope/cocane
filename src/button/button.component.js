import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  height: 2em;
  padding: 0 1rem;
  line-height: 2em;
  font-size: 1em;
  border-radius: 1em;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background 0.1s ease;
  background: var(--primary600, hsl(200, 30%, 40%));
  color: var(--mono100, white);
  :hover,
  :focus {
    background: var(--primary700, hsl(200, 30%, 30%));
  }
  :active {
    background: var(--primary800, hsl(200, 30%, 20%));
  }
  :disabled {
    background: var(--primary700, hsl(200, 10%, 40%));
    color: var(--mono100, white);
    cursor: auto;
  }
`;

Button.propTypes = { onClick: PropTypes.function };

export default Button;
