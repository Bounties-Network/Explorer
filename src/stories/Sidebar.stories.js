import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';

import { Sidebar } from 'components';

storiesOf('Sidebar', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Sidebar', () => (
    <div>
      <Sidebar onClick={console.log} />
    </div>
  ));
