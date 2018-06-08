import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { DescriptionToggle } from 'components';

storiesOf('DescriptionToggle', module).add('DescriptionToggle', () => (
  <div
    style={{
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}
  >
    <DescriptionToggle default={true} onClick={action('clicked')}>
      This is a description of an email notification.
    </DescriptionToggle>
    <DescriptionToggle onClick={action('clicked')}>
      This is a description of an email notification.
    </DescriptionToggle>
    <DescriptionToggle default={true} onClick={action('clicked')}>
      This is a description of an email notification.
    </DescriptionToggle>
    <DescriptionToggle onClick={action('clicked')}>
      This is a description of an email notification.
    </DescriptionToggle>
    <DescriptionToggle default={true} onClick={action('clicked')}>
      This is a description of an email notification.
    </DescriptionToggle>
    <DescriptionToggle onClick={action('clicked')}>
      This is a description of an email notification.
    </DescriptionToggle>
  </div>
));
