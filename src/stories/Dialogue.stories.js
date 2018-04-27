import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Dialogue } from 'components';

const primaryButtonObj = {
  onClick: () => {
    console.log('primary clicked');
  },
  text: 'Submit'
};

const secondaryButtonObj = {
  style: 'secondary',
  onClick: () => {
    console.log('secondary clicked');
  },
  text: 'Cancel'
};

storiesOf('Dialogue', module).add('Dialogue', () => (
  <div>
    <Dialogue
      header="Dialogue Title"
      text="This is some body copy that may show up within a dialogue. It may describe an event or something else. Who knows?"
      buttonsData={[secondaryButtonObj, primaryButtonObj]}
    />
  </div>
));
