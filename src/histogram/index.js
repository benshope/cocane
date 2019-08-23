import { cellInputContainer } from "../cell.containers";
import { default as component } from "./histogram.component";
import { default as mocks } from "./histogram.mocks";

export { default as component } from "./histogram.component";

export const container = cellInputContainer(component);
export const name = "Histogram";
export const type = "HISTOGRAM";
export default { component, container, name, type, mocks };
