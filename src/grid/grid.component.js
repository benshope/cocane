import styled from 'styled-components'

const GridDiv = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
	grid-auto-rows: auto;
	align-content: start;
	> * {
		overflow: hidden;
		max-width: 100%;
	}
`

export default GridDiv
