// @flow
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import { ConnectedFileInput, reducer } from "./file-input";

const cellStore = createStore((state = {}, a) => {
	action("action")(a);
	return reducer(state, a);
});

const stories = storiesOf("File Input", module);

const StoreViewer = connect(state => ({ ...state }))(state => (
	<div>{JSON.stringify(state)}</div>
));

stories.add("component", () => {
	return (
		<Provider store={cellStore}>
			<h2>{"File Input 1"}</h2>
			<ConnectedFileInput id="file-input-1" />
			<h2>{"File Input 2"}</h2>
			<ConnectedFileInput id="file-input-2" />
			<h2>{"Store"}</h2>
			<StoreViewer />
		</Provider>
	);
});
