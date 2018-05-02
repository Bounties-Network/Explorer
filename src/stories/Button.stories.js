import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, Text } from 'components';

storiesOf('Button', module)
  .add('All Buttons', () => (
    <div>
      <Text style="H3">Button Type</Text>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <br />
        <Text style="H4">Primary</Text>
        <Button onClick={action('clicked')}>Hello Button</Button>
        <br />
        <Text style="H4">Secondary</Text>
        <Button onClick={action('clicked')} style="secondary">
          Hello Button
        </Button>
        <br />
        <Text style="H4">Destructive</Text>
        <Button onClick={action('clicked')} style="destructive">
          Hello Button
        </Button>
        <br />
        <Text style="H4">Link</Text>
        <Button onClick={action('clicked')} style="link">
          Hello Button
        </Button>
      </div>
      <hr />

      <Text style="H3">Disabled</Text>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <br />
        <Text style="H4">Primary</Text>
        <Button onClick={action('should not fire')} disabled>
          Hello Button
        </Button>
        <br />
        <Text style="H4">Secondary</Text>
        <Button onClick={action('should not fire')} disabled style="secondary">
          Hello Button
        </Button>
        <br />
        <Text style="H4">Destructive</Text>
        <Button
          onClick={action('should not fire')}
          disabled
          style="destructive"
          text="Hello Button"
        >
          Hello Button
        </Button>
        <br />
        <Text style="H4">Link</Text>
        <Button onClick={action('should not fire')} disabled style="link">
          Hello Button
        </Button>
      </div>
      <hr />

      <Text style="H3">Sizes</Text>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <br />
        <Text style="H4">Small</Text>
        <Button onClick={action('clicked')} size="small">
          Button
        </Button>
        <br />
        <Text style="H4">Medium</Text>
        <Button onClick={action('clicked')} size="medium">
          Hello Button
        </Button>
        <br />
        <Text style="H4">Large</Text>
        <Button onClick={action('clicked')} size="large">
          Hello Button
        </Button>
      </div>
    </div>
  ))
  .add('Primary', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('Secondary', () => (
    <Button onClick={action('clicked')} style="secondary">
      Hello Button
    </Button>
  ))
  .add('Destructive', () => (
    <Button onClick={action('clicked')} style="destructive">
      Hello Button
    </Button>
  ))
  .add('Link', () => (
    <Button onClick={action('clicked')} style="link">
      Hello Button
    </Button>
  ))
  .add('Disabled Primary', () => (
    <Button onClick={action('should not fire')} disabled>
      Hello Button
    </Button>
  ))
  .add('Disabled Secondary', () => (
    <Button onClick={action('should not fire')} disabled style="secondary">
      Hello Button
    </Button>
  ))
  .add('Disabled Destructive', () => (
    <Button onClick={action('should not fire')} disabled style="destructive">
      Hello Button
    </Button>
  ))
  .add('Disabled Link', () => (
    <Button onClick={action('should not fire')} disabled style="link">
      Hello Button
    </Button>
  ))
  .add('Small', () => (
    <Button onClick={action('clicked')} size="small">
      Button
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
