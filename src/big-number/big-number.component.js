import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WrapperDiv = styled.div`
  align-self: center;
  font-size: 4em;
  flex: 1;
  text-align: center;
`

const BigNumber = ({ value }) => (
  <WrapperDiv>{`${typeof value === 'number' ? value : 'NaN'}`}</WrapperDiv>
)
BigNumber.propTypes = { value: PropTypes.number }
export default BigNumber
