import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { component as Button } from '../button'
import { component as ButtonText } from '../button-text'
import { component as GridDiv } from '../grid'
import { component as Input } from '../input-number'
import { mono } from '../theme'

// TODO just override column min size
// also can that flex-basis go?
const ContainerDiv = styled(GridDiv)`
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ theme: { scale } }) => scale * 10}rem, 1fr)
  );
  grid-gap: ${({ theme: { spacing } }) => spacing * 0.5}em;
  > * {
    flex: 1;
    flex-basis: 40%;
  }
`

const InputDiv = styled.div`
  position: relative;
  input {
    color: ${mono(0)};
    width: 100%;
    padding-right: 2em;
  }
  button {
    transition: opacity 0.1s ease;
    opacity: 0;
    height: 100%;
    font-size: 1.5em;
    line-height: 0;
    right: 0;
    padding-left: 0em;
    position: absolute;
  }
  :hover button,
  :focus-within button {
    opacity: 1;
  }
`

// TODO generalize to incrementable list
// TODO get input component from the styled single input
const InputNumberList = props => {
  const values = props.value || []
  return (
    <ContainerDiv>
      <Button onClick={() => props.onChange([0, ...values])}>
        {'+ Add Input'}
      </Button>
      {values.map((v, i) => (
        <InputDiv key={i}>
          <Input
            {...{
              autoFocus: i === values - 1,
              ...props,
              ...(values && typeof values[i] === 'number'
                ? { value: values[i] }
                : {}),
              ...(props.defaultValue &&
              typeof props.defaultValue[i] === 'number'
                ? { defaultValue: props.defaultValue[i] }
                : {}),
              onChange: newValue => {
                props.onChange(
                  Object.assign([...values], {
                    [i]: newValue,
                  })
                )
              },
              type: 'number',
            }}
          />
          <ButtonText
            title="Delete"
            tabIndex={-1}
            onClick={() =>
              props.onChange(values.filter((x, index) => index !== i))
            }
          >
            {'×'}
          </ButtonText>
        </InputDiv>
      ))}
    </ContainerDiv>
  )
}

InputNumberList.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number),
}

export default InputNumberList
