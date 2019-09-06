// TODO make this top-level for recursive rendering to work

import inputNumberList from '../input-number-list'
import inputNumber from '../input-number'
import select from '../select'
import bigNumber from '../big-number'
import histogram from '../histogram'
import lineChart from '../line-chart'

export const cellList = [
  inputNumberList,
  inputNumber,
  select,
  bigNumber,
  histogram,
  lineChart,
]

export const cellByType = cellList.reduce((acc, cell) => {
  acc[cell.type] = cell
  return acc
}, {})
