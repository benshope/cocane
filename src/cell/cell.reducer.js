import { cellList } from './cell.list'

export default (s = {}, a) =>
  cellList.reduce((acc, cell) => (cell.reducer ? cell.reducer(acc, a) : acc), s)
