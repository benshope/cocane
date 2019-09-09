import { default as component } from './grid-layout.component'
import { default as container } from './grid-layout.container'
import { default as reducer } from './grid-layout.reducer'
import { default as mocks } from './grid-layout.mocks'

export { default as component } from './grid-layout.component'
export { default as container } from './grid-layout.container'
export { default as reducer } from './grid-layout.reducer'

export const name = 'Flex Layout'
export const type = 'FLEX_LAYOUT'
export default {
  component,
  container,
  reducer,
  name,
  type,
  mocks,
}
