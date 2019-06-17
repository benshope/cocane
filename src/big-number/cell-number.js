function NumberCell({ data, cells, output }) {
	const cell = cells[data]
	const number = cellRenderer[cell.type]({
		...cell.value,
		cells,
		output: true,
	})
	return !output ? <div>{number}</div> : number
}
