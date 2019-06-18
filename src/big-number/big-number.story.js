// @flow
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { ConnectedBigNumber, reducer } from "./file-input";
import StoreViewer from "../store-viewer/store-viewer";

const cellStore = createStore(
	(
		state = {
			myNumber1: { type: "INPUT", inputType: "number" },
			bigNumber1: { type: "BIG_NUMBER", cellID: "myNumber1" }
		},
		a
	) => {
		action("action")(a);
		return reducer(state, a);
	}
);

const stories = storiesOf("File Input", module);

stories.add("component", () => {
	return (
		<Provider store={cellStore}>
			<h2>{"File Input 1"}</h2>
			<ConnectedBigNumber id="bigNumber1" />
			<h2>{"File Input 2"}</h2>
			<ConnectedBigNumber id="bigNumber2" />
			<h2>{"Store"}</h2>
			<StoreViewer />
		</Provider>
	);
});
