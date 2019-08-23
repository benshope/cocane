import { cellValueContainer } from "../cell.containers";

import { default as component } from "./toggle.component";

export { default as component } from "./toggle.component";
export const container = cellValueContainer(component);
export const name = "Toggle";
export const type = "TOGGLE";
export default { component, container, name, type };
