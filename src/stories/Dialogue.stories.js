import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Dialogue, Button } from 'components';

const primaryButton = (
  <Button style={'primary'} onClick={action('primary-clicked')}>
    Submit
  </Button>
);

const secondaryButton = (
  <Button style={'secondary'} onClick={action('secondary-clicked')}>
    Cancel
  </Button>
);

storiesOf('Dialogue', module).add('Dialogue', () => (
  <div>
    <Dialogue
      header="Dialogue Title"
      buttons={[secondaryButton, primaryButton]}
      disabled={false}
    >
      This is some body copy that may show up within a dialogue. It may describe
      an event or something else. Who knows?
    </Dialogue>
  </div>
));
