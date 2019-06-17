// @flow
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import FileInputCell from './cell-file-input'

const cellStore = createStore((state = {}, a) => {
	action('action')(a)
	return state
})

const stories = storiesOf('Cells | File Input', module)

stories.add('default', () => {
	return (
		<Provider store={cellStore}>
			<FileInputCell />
		</Provider>
	)
})
