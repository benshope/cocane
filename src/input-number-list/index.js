import { cellValueContainer } from "../cell.containers";
import { default as component } from "./input-number-list.component";

export { default as component } from "./input-number-list.component";

export const container = cellValueContainer(component);
export const name = "Input Number List";
export const type = "INPUT_NUMBER_LIST";
export default { component, container, name, type };
