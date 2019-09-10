import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import styled from 'styled-components'

const GridDiv = styled.div`
  position: relative;
  * {
    box-sizing: border-box;
  }
`

const GridOL = styled.ol`
  list-style: none;
  width: 100%;
  display: grid;
  left: 0;
  top: 0;
  margin: 0;
  padding: 20px;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  grid-auto-rows: auto;
  align-content: start;
  li {
    cursor: grab;
    display: inline-block;
    height: 10em;
    background: gray;
    margin: var(--spacing_0_25, 0.25em);
    overflow: hidden;
    max-width: 100%;
    :active {
      cursor: grabbing;
    }
  }
`

const PreviewGridOL = styled(GridOL)`
  position: absolute;
  opacity: 1;
  pointer-events: none;
`

const arrayMoveMutate = (array, from, to) => {
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0])
}

const arrayMove = (array, from, to) => {
  array = array.slice()
  arrayMoveMutate(array, from, to)
  return array
}

const Grid = () => {
  const [items, setItems] = React.useState(
    Array(20)
      .fill()
      .map((x, i) => ({ id: i, width: (i % 5) + 1 }))
  )
  const [fromIndex, setFromIndex] = React.useState(null)
  const [toIndex, setToIndex] = React.useState(null)
  const [previewItems, setPreviewItems] = React.useState(null)

  const onDragEnd = event => {
    setItems(previewItems)
    setFromIndex(null)
    setToIndex(null)
    setPreviewItems(null)
  }
  // TODO: use data id
  // TODO: conver to index
  const onDragStart = event => {
    setFromIndex(parseInt(event.target.id))
    setPreviewItems(items)
  }
  const onDragOver = event => {
    event.preventDefault()
    if (event.target.id) {
      setToIndex(parseInt(event.target.id))
      setPreviewItems(arrayMove(items, fromIndex, toIndex))
    }
  }

  return (
    <GridDiv>
      {previewItems ? (
        <PreviewGridOL>
          {previewItems.map((item, i) => (
            <li
              {...{
                id: i,
                draggable: true,
                onDragStart,
                onDragOver,
                onDragEnd,
              }}
              style={{
                gridColumnEnd: `span ${item.width}`,
                backgroundColor: toIndex === i ? 'black' : 'gray',
              }}
            >
              {JSON.stringify(item)}
              {String(fromIndex === i)}
            </li>
          ))}
        </PreviewGridOL>
      ) : null}
      <GridOL dragging={typeof fromIndex === 'number'}>
        {items.map((item, i) => (
          <li
            {...{
              id: i,
              draggable: true,
              onDragStart,
              onDragOver,
              onDragEnd,
            }}
            style={{
              gridColumnEnd: `span ${item.width}`,
              opacity:
                !(typeof fromIndex === 'number') || fromIndex === i ? 1 : 0,
            }}
          >
            {JSON.stringify(item)}
          </li>
        ))}
      </GridOL>
    </GridDiv>
  )
}

storiesOf('HTML5 Grid', module).add('default', () => {
  return <Grid />
})
