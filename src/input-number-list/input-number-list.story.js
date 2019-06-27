import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { themes } from "@storybook/theming";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import nativeInput from "./input-number-list";
import StoreViewer from "../store-viewer/store-viewer";

const { component: StringListInput, reducer, type } = nativeInput;

const cellStore = createStore((state = { input1: { type, value: [0] } }, a) => {
  action("action")(a);
  return reducer(state, a);
});

const stories = storiesOf("Number List Input", module).addParameters({
  options: { theme: themes.dark }
});

stories.add("component", () => {
  return (
    <Provider store={cellStore}>
      <StringListInput id="input1" />
      <StoreViewer />
    </Provider>
  );
});
