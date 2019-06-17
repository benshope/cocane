import React from 'react'
import { connect } from 'react-redux'

const Cell = ({ cell }) => {
    // console.log('RENDERING SQL CELL', cell)
    // // dispatch getCell calls
    // const mockGetData = () =>
    //     new Promise(r => setTimeout(r, 1000)).then(() =>
    //         [...Array(100).keys()].map(() => 1000 * Math.random())
    //     )
    // const [isLoading, setLoading] = React.useState(false)
    // const [sqlQuery, setSQL] = React.useState(cell.query)
    // const [data, setData] = React.useState(mockGetData(cell.query))

    // const onChange = ({ target: { value } }) => {
    //     setLoading(true)
    //     setSQL(value)
    //     mockGetData(value).then(setData)
    // }

    return <div>{'Loading...'}</div>
}

const ConnectedCell = connect(({ cells }, { id }) => ({ cell: cells[id] }))(
    Cell
)

export default {
    sql: Cell,
}
