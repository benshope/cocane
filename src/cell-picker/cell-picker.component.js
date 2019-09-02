import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { component as Button } from '../button'
import inputNumberList from '../input-number-list'
import inputNumber from '../input-number'
import select from '../select'
import bigNumber from '../big-number'
import histogram from '../histogram'

// TODO make grid of these
// TODO filter down to only top-level cell types
const Cell = ({ onChange }) => (
  <div>
    {[inputNumberList, inputNumber, select, bigNumber, histogram].map(cell => (
      <Button onClick={() => onChange(cell.type)}>{cell.name}</Button>
    ))}
  </div>
)

export default Cell
