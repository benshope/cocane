import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

addDecorator(withInfo({ inline: true }))

function loadStories() {
	require('../src/file-input/file-input.story')
	require('../src/notebook/notebook.story')
}

configure(loadStories, module)
