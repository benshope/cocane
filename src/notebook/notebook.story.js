// @flow
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { ConnectedNotebook, reducer } from "./notebook";
import StoreViewer from "../store-viewer/store-viewer";

const cellStore = createStore(
	(state = { notebook1: { type: "NOTEBOOK", components: [] } }, a) => {
		action("action")(a);
		return reducer(state, a);
	}
);

const stories = storiesOf("Notebook", module);

// TODO illustrate reducers & async
stories.add("component", () => {
	return (
		<Provider store={cellStore}>
			<h2>{"Notebook"}</h2>
			<ConnectedNotebook id="notebook1" />
			<StoreViewer />
		</Provider>
	);
});
