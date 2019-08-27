import inputNumberList from '../input-number-list'
import inputNumber from '../input-number'
import select from '../select'
import bigNumber from '../big-number'
import histogram from '../histogram'

import { cellList } from './cell.list'

export default (s = {}, a) =>
  cellList.reduce((acc, cell) => (cell.reducer ? cell.reducer(acc, a) : acc), s)
