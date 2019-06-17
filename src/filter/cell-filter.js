const filterOutputData = ({ operator, value }, data) =>
    data.filter(x => (operator === 'LESS_THAN' ? x < value : x > value))

function FilterDisplayEdit(props) {
    // const cell = cells[data];
    // const dataToFilter = cellRenderer[cell.type]({
    //   ...cell.value,
    //   cells,
    //   output: true
    // });ax
    const [filterState, setFilter] = React.useState({ operator, value })

    const { data, operator, value, cells, output } = props
    return (
        <div>
            Is less than{' '}
            <input
                type="range"
                min={0}
                max={100}
                value={filterState.value}
                onChange={e => setFilter(e.target.value)}
            />
        </div>
    )
}
