function SqlCell({ query }) {
    const mockGetData = () =>
        new Promise(r => setTimeout(r, 1000)).then(() =>
            [...Array(100).keys()].map(() => 1000 * Math.random())
        )
    const [isLoading, setLoading] = React.useState(false)
    const [sqlQuery, setSQL] = React.useState(query)
    const [data, setData] = React.useState(mockGetData(query))

    const onChange = ({ target: { value } }) => {
        setLoading(true)
        setSQL(value)
        mockGetData(value).then(setData)
    }

    return [
        <div>
            <span>{isLoading ? 'Loading...' : JSON.stringify(data)}</span>
            <textarea value={sqlQuery} onChange={onChange} />
        </div>,
        data.alteredByStateInThisComponenet,
    ]
}
