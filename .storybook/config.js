import {configure, addParameters, addDecorator} from '@storybook/react';
import {withA11y} from '@storybook/addon-a11y';
import {themes} from '@storybook/theming';

addDecorator(withA11y);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../src', true, /\.story\.js?$/));
}

configure(loadStories, module);
