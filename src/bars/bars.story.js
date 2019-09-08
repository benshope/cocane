import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import styled from 'styled-components'

import Bars from './bars.component'

storiesOf('Bar Series', module).add('default', () => {
  return (
    <Bars
      data={[{ x: 'derp', y: 3 }, { x: 'merp', y: 4 }]}
      xKey={'x'}
      yKeys={['y']}
    />
  )
})
