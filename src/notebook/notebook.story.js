// @flow
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'

import Notebook, { reducer } from './notebook'

const cellStore = createStore((state = {}, a) => {
	action('action')(a)
	return reducer(state, a)
})

const stories = storiesOf('Notebook', module)

const StoreViewer = connect(state => ({ ...state }))(state => (
	<div>{JSON.stringify(state)}</div>
))

// TODO illustrate reducers & async
stories.add('component', () => {
	return (
		<Provider store={cellStore}>
			<h2>{'Notebook'}</h2>
			<Notebook id="notebook-1" />
			<StoreViewer />
		</Provider>
	)
})
