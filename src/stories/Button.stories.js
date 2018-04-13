import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from 'components';

storiesOf('Button', module)
  .add('Only Text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('Primary', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('Secondary', () => (
    <Button onClick={action('clicked')} style="secondary">
      Hello Button
    </Button>
  ))
  .add('Disabled', () => (
    <Button onClick={action('should not fire')} disabled>
      Hello Button
    </Button>
  ))
  .add('Small', () => (
    <Button onClick={action('clicked')} size="small">
      Hello Button
    </Button>
  ))
  .add('Medium', () => (
    <Button onClick={action('clicked')} size="medium">
      Hello Button
    </Button>
  ))
  .add('Large', () => (
    <Button onClick={action('clicked')} size="large">
      Hello Button
    </Button>
  ));
