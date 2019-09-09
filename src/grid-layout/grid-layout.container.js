import { connect } from 'react-redux'

import {
  addCellAction,
  removeCellAction,
  changeCellTypeAction,
} from './grid-layout.actions'
import FlexLayout from './grid-layout.component'

export default connect(
  (state, { id }) => ({ ...(state[id] || {}), state }),
  (dispatch, { id }) => ({
    addCell: type => dispatch(addCellAction({ type, id })),
    changeCellType: cellID => dispatch(changeCellTypeAction(cellID)),
    removeCell: cellID => dispatch(removeCellAction(cellID)),
  })
)(FlexLayout)
