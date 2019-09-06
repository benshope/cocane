import { cellInputContainer } from '../cell.containers'
import { default as component } from './line-chart.component'
import { default as mocks } from './line-chart.mocks'

export { default as component } from './line-chart.component'

export const container = cellInputContainer(component)
export const name = 'Line Chart'
export const type = 'LINE_CHART'
export default { component, container, name, type, mocks }
