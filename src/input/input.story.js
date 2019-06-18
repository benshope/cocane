// @flow
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { ConnectedInput, reducer, TYPE } from "./input";
import StoreViewer from "../store-viewer/store-viewer";

const cellStore = createStore(
	(
		state = {
			input1: { type: TYPE, inputType: "number", value: 0 }
		},
		a
	) => {
		action("action")(a);
		return reducer(state, a);
	}
);

const stories = storiesOf("Input", module);

stories.add("component", () => {
	return (
		<Provider store={cellStore}>
			<h2>{"Input 1"}</h2>
			<ConnectedInput id="input1" />
			<h2>{"Store"}</h2>
			<StoreViewer />
		</Provider>
	);
});
