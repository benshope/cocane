import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import styled from 'styled-components'

import flexLayout from './flex-layout'
import inputNumberList from './input-number-list'
import inputNumber from './input-number'
import select from './select'
import bigNumber from './big-number'
import histogram from './histogram'
import toggle from './toggle'
import button from './button'
import cellReducer from './cell.reducers'

const StoreViewerDIV = styled.div`
  position: relative;
  overflow: hidden;
  word-break: break-all;
`

const StoreViewer = connect(state => ({ ...state }))(state => (
  <StoreViewerDIV>
    <pre>{JSON.stringify(state, null, 4)}</pre>
  </StoreViewerDIV>
))

// TODO should use reducers to create state?
const UncontrolledStory = props => {
  const [value, onChange] = React.useState()
  return (
    <props.component
      {...{
        value,
        onChange: v => {
          action('onChange')(v)
          onChange(v)
        },
      }}
    />
  )
}

const addStoryWithStore = stories => ({ name, state }) => cell => {
  stories.add(name, () => {
    const cellStore = createStore((s = state, a) => {
      action(a)
      return cellReducer(cell.reducer ? cell.reducer(s, a) : s, a)
    })
    return (
      <Provider store={cellStore}>
        <div>
          <cell.container id={'myCell'} />
          <StoreViewer />
        </div>
      </Provider>
    )
  })
}

;[
  inputNumberList,
  inputNumber,
  button,
  select,
  bigNumber,
  histogram,
  toggle,
  flexLayout,
].forEach(cell => {
  const stories = storiesOf(cell.name, module)
  if (cell.container) {
    if (cell.mocks) {
      cell.mocks.forEach(mock => {
        addStoryWithStore(stories)(mock)(cell)
      })
    } else {
      if (cell.component) {
        stories.add('component', () => (
          <UncontrolledStory component={cell.component} />
        ))
      }
      addStoryWithStore(stories)({ name: 'container', state: { myCell: {} } })(
        cell
      )
    }
  }
})
