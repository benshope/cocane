// @flow
import React from 'react';
import styled, {keyframes} from 'styled-components';
import theme from './theme';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerSVG = styled.svg`
  animation: ${rotate} 1s linear infinite;
  will-change: transform;
  margin: 0px;
  min-width: ${p => p.size}rem;
  min-height: ${p => p.size}rem;
  max-width: ${p => p.size}rem;
  max-height: ${p => p.size}rem;
`;

const InnerCircle = styled.circle`
  stroke: ${theme('colors.primary500')};
  stroke-linecap: round;
  stroke-dasharray: ${p => p.size * 16 * (3 / 5)}, 1000;
`;

const OuterCircle = styled.circle`
  stroke: ${theme('colors.primary100')};
`;

type Props = {
  size?: number
};

const SpinnerDiv = styled.div`
  height: ${({size}) => `${size}rem`};
  width: ${({size}) => `${size}rem`};
  position: relative;
`;

export const Spinner = ({size = 3}: Props) => {
  const circleProps = {
    cx: `${size / 2}rem`,
    cy: `${size / 2}rem`,
    r: `${(size * 4) / 10}rem`,
    fill: 'none',
    strokeWidth: `${size / 10}rem`,
    size
  };
  return (
    <SpinnerDiv size={size}>
      <SpinnerSVG width={`${size}rem`} height={`${size}rem`} size={size}>
        <OuterCircle className="outer-spinner" {...circleProps} />
        <InnerCircle className="inner-spinner" {...circleProps} />
      </SpinnerSVG>
    </SpinnerDiv>
  );
};

export default Spinner;
