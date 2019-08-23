import { connect } from "react-redux";

import {
  addCellAction,
  removeCellAction,
  changeCellTypeAction
} from "./flex-layout.actions";
import FlexLayout from "./flex-layout.component";

export default connect(
  (state, { id }) => ({ ...(state[id] || {}), state }),
  (dispatch, { id }) => ({
    addCell: type => {
      console.log("attepting to dispatch addCell", type, id);
      dispatch(addCellAction({ type, id }));
    },
    changeCellType: cellID => dispatch(changeCellTypeAction(cellID)),
    removeCell: cellID => dispatch(removeCellAction(cellID))
  })
)(FlexLayout);

// // only allow selection of string-list or number-list
// const SelectTypes = ({ options = {}, onChange }) => {
//   return (
//     <div>
//       {Object.keys(options).length
//         ? Object.entries(options).map(([optionKey, optionData]) => (
//             <button
//               key={optionKey}
//               onClick={() => onChange(optionKey)}
//             >{`TODO: text description here.  TYPE: ${
//               optionData.type
//             } ID: ${optionKey}`}</button>
//           ))
//         : "No inputs"}
//     </div>
//   );
// };

// const ConnectedArrayOutputSelector = connect(
//   (state, { id }) => {
//     return {
//       options: Object.entries(state).reduce((acc, [cellKey, cellData]) => {
//         if (
//           cellKey !== id &&
//           // TODO get as consts
//           [inputStringListCell.type, inputNumberListCell.type].includes(
//             cellData.type
//           )
//         ) {
//           acc[cellKey] = cellData;
//         }
//         return acc;
//       }, {})
//     };
//   },
//   (dispatch, { id }) => ({
//     onChange: value => dispatch(setSelectInputAction({ id, value }))
//   })
// )(SelectTypes);
