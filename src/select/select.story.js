import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { themes } from "@storybook/theming";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import nativeSelect from "./select";
import StoreViewer from "../store-viewer/store-viewer";

const { component: Cell, reducer, type } = nativeSelect;

const cellStore = createStore(
	(
		state = {
			myCell: {
				type,
				inputType: "number",
				value: 0,
				options: [
					{ name: "Hello", value: 200 },
					{ name: "Something", value: 300 }
				]
			}
		},
		a
	) => {
		action("action")(a);
		return reducer(state, a);
	}
);

const stories = storiesOf("Select", module).addParameters({
	options: { theme: themes.light }
});

stories.add("component", () => {
	return (
		<Provider store={cellStore}>
			<Cell id="myCell" />
			<StoreViewer />
		</Provider>
	);
});
