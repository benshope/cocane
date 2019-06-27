import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { ConnectedFlexLayout, reducer } from "./flex-layout";
import StoreViewer from "../store-viewer/store-viewer";

const cellStore = createStore(
	(
		state = { sampleFlexLayoutID: { type: "FLEX_LAYOUT", components: [] } },
		a
	) => {
		action("action")(a);
		return reducer(state, a);
	}
);

const stories = storiesOf("Flex Layout", module);

// TODO illustrate reducers & async
stories.add("component", () => {
	return (
		<Provider store={cellStore}>
			<ConnectedFlexLayout id="sampleFlexLayoutID" />
			<StoreViewer />
		</Provider>
	);
});
