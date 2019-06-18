import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { themes } from "@storybook/theming";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import nativeInput from "./input";
import StoreViewer from "../store-viewer/store-viewer";

const { component: NativeInput, reducer, type } = nativeInput;

const cellStore = createStore(
	(
		state = {
			input1: { type, inputType: "number", value: 0 }
		},
		a
	) => {
		action("action")(a);
		return reducer(state, a);
	}
);

const stories = storiesOf("Input", module).addParameters({
	options: { theme: themes.dark }
});

stories.add("component", () => {
	return (
		<Provider store={cellStore}>
			<h2>{"Input 1"}</h2>
			<NativeInput id="input1" />
			<h2>{"Store"}</h2>
			<StoreViewer />
		</Provider>
	);
});
