import React from 'react'
import styled from 'styled-components'

import { component as Button } from '../button'
import inputNumberList from '../input-number-list'
import inputNumber from '../input-number'
import select from '../select'
import bigNumber from '../big-number'
import histogram from '../histogram'
import lineChart from '../line-chart'

// TODO add negative margins right
const PickerGridDiv = styled.div`
  button {
    padding: 0 ${({ theme: { spacing } }) => spacing / 2 + 0.5}em;
    display: inline-block;
    margin-right: ${({ theme: { spacing } }) => spacing}em;
    margin-bottom: ${({ theme: { spacing } }) => spacing}em;
  }
`

// TODO make grid of these
// TODO filter down to only top-level cell types
const Cell = ({ onChange }) => (
  <PickerGridDiv>
    {[
      inputNumberList,
      inputNumber,
      select,
      bigNumber,
      histogram,
      lineChart,
    ].map(cell => (
      <Button key={cell.type} onClick={() => onChange(cell.type)}>
        {cell.name}
      </Button>
    ))}
  </PickerGridDiv>
)

export default Cell
