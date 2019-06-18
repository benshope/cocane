import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import fileInput from "./file-input";
import StoreViewer from "../store-viewer/store-viewer";

const { component: ConnectedFileInput, reducer } = fileInput;

const cellStore = createStore((state = {}, a) => {
	action("action")(a);
	return reducer(state, a);
});

const stories = storiesOf("File Input", module);

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
