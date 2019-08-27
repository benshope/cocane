import { connect } from 'react-redux'

import {
  addCellAction,
  removeCellAction,
  changeCellTypeAction,
} from './flex-layout.actions'
import FlexLayout from './flex-layout.component'

export default connect(
  (state, { id }) => ({ ...(state[id] || {}), state }),
  (dispatch, { id }) => ({
    addCell: type => dispatch(addCellAction({ type, id })),
    changeCellType: cellID => dispatch(changeCellTypeAction(cellID)),
    removeCell: cellID => dispatch(removeCellAction(cellID)),
  })
)(FlexLayout)
