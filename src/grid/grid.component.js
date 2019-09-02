import styled from 'styled-components'

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  padding-top: var(--em05, 0.5em);
  padding-left: var(--em05, 0.5em);
  > * {
    transition: background 0.1s ease;
    background: var(--mono100, white);
    margin-bottom: var(--em05, 0.5em);
    margin-right: var(--em05, 0.5em);
    border-radius: 4px;
    overflow: hidden;
  }
`

export default GridDiv
