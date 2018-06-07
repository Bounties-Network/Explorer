import { configure } from '@storybook/react';
import '../src/flexboxgrid.css';
import '../src/font-files/inter-ui.css';

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
