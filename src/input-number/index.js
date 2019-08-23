import { cellValueContainer } from "../cell.containers";
import { default as component } from "./input-number.component";
import { default as mocks } from "./input-number.mocks";

export { default as component } from "./input-number.component";
const inputNumberContainer = cellValueContainer(component);

export const container = inputNumberContainer;
export const name = "Input Number";
export const type = "INPUT_NUMBER";
export default { component, container, name, type, mocks };
