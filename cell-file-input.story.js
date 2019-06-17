// @flow
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'

import FileInputCell, { reducer } from './cell-file-input'

const cellStore = createStore((state = {}, a) => {
	console.log('store called', a, reducer(state, a))
	action('action')(a)
	return reducer(state, a)
})

const stories = storiesOf('File Input', module)

const StoreViewer = connect(state => ({ ...state }))(state => (
	<div>{JSON.stringify(state)}</div>
))

stories.add('component', () => {
	return (
		<Provider store={cellStore}>
			<h2>{'File Input 1'}</h2>
			<FileInputCell id="file-input-1" />
			<h2>{'File Input 2'}</h2>
			<FileInputCell id="file-input-2" />
			<h2>{'Store'}</h2>
			<StoreViewer />
		</Provider>
	)
})
