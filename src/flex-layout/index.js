import { default as component } from "./flex-layout.component";
import { default as container } from "./flex-layout.container";
import { default as reducer } from "./flex-layout.reducer";
import { default as mocks } from "./flex-layout.mocks";

export { default as component } from "./flex-layout.component";
export { default as container } from "./flex-layout.container";
export { default as reducer } from "./flex-layout.reducer";

export const name = "Flex Layout";
export const type = "FLEX_LAYOUT";
export default {
  component,
  container,
  reducer,
  name,
  type,
  mocks
};
