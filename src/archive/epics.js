import { ofType, combineEpics } from 'redux-observable'

const mockNoSQLDatabase = {
	cells: {
		sqlId: {
			type: 'sql',
			value: { query: 'select * from FACT_TRIP' },
		},
		filterId: {
			type: 'filter',
			value: {
				data: 'sqlId',
				operator: 'LESS_THAN',
				value: 100,
			},
		},
		bigNumberId: {
			type: 'number',
			value: { format: ',' },
		},
		dashboardId: {
			type: 'dashboard',
			value: {
				title: 'My Dashboard',
				cells: [{ id: 'bigNumberId', width: 400, height: 200 }],
			},
		},
	},
}

const getCellEpic = ofType(ADD_CELL).map(({ payload }) => {
	// if (!store.cells[cellId]) {
	// get the cell from the back-end
	// fire UPDATE_CELL with fetched cell
	// }
})

const updateCellEpic = ofType(UPDATE_CELL).map(({ payload }) => {
	// update the cell in the back-end
})

const deleteCellEpic = ofType(UPDATE_CELL).map(({ payload }) => {
	// delete the cell in the back-end
})

export default combineEpics(getCellEpic, updateCellEpic, deleteCellEpic)
