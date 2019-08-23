import { cellInputContainer } from "../cell.containers";

import { default as component } from "./big-number.component";

export { default as component } from "./big-number.component";
export const container = cellInputContainer(component);
export const name = "Big Number";
export const type = "BIG_NUMBER";
export default { component, container, name, type };
