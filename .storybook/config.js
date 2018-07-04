import { configure } from '@storybook/react';
import '../src/styles/flexboxgrid.css';
import '../src/font-files/inter-ui.css';
import '../src/styles/index.scss';
import '../src/fontAwesome';
import '../src/styles/Toastify.scss';

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
