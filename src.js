import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'

// TODO things need to be able to be
// initialized with {value: null}
const initialState = {
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

const cellRenderer = {
	sql: SqlCell,
	filter: () => null,
	number: () => null,
	dashboard: () => null,
}

const Cells = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}
