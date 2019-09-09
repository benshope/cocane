import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import styled from 'styled-components'

const GridOL = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  grid-auto-rows: auto;
  align-content: start;
  li {
    height: 10em;
    background: gray;
    margin: var(--spacing_0_25, 0.25em);
    overflow: hidden;
    max-width: 100%;
  }
`

const Grid = () => {
  const [items, setItems] = React.useState(
    Array(20)
      .fill()
      .map((x, i) => ({ id: i, width: (i % 5) + 1 }))
  )
  return (
    <GridOL>
      {items.map(item => (
        <li draggable={true} style={{ gridColumnEnd: `span ${item.width}` }}>
          {JSON.stringify(item)}
        </li>
      ))}
    </GridOL>
  )
}

storiesOf('HTML5 Grid', module).add('default', () => {
  return <Grid />
})
