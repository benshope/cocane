import { cellValueContainer } from '../cell.containers'
import { default as component } from './input-number-list.component'
import { default as mocks } from './input-number-list.mocks'

export { default as component } from './input-number-list.component'

export const container = cellValueContainer(component)
export const name = 'Input Numbers'
export const type = 'INPUT_NUMBER_LIST'
export default { component, container, name, type, mocks }
