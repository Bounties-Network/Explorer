import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, Text } from 'components';

storiesOf('Button', module).add('All Buttons', () => (
  <div>
    <Text style="H3">Button Type</Text>
    <div>
      <div style={{ marginTop: '10px' }} />
      <Text style="H4">Primary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')}>Hello Button</Button>
      <div style={{ marginTop: '10px' }} />
      <Text style="H4">Secondary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} style="secondary">
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text style="H4">Destructive</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} style="destructive">
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text style="H4">Link</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} style="link">
        Hello Button
      </Button>
    </div>
    <hr />

    <Text style="H3">Disabled</Text>
    <div>
      <div style={{ marginTop: '10px' }} />
      <Text style="H4">Primary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('should not fire')} disabled>
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text style="H4">Secondary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('should not fire')} disabled style="secondary">
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text style="H4">Destructive</Text>
      <span style={{ marginRight: '10px' }} />
      <Button
        onClick={action('should not fire')}
        disabled
        style="destructive"
        text="Hello Button"
      >
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text style="H4">Link</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('should not fire')} disabled style="link">
        Hello Button
      </Button>
    </div>
    <hr />

    <Text style="H3">Sizes</Text>
    <div>
      <div style={{ marginTop: '10px' }} />
      <Text style="H4">Small</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} size="small">
        Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text style="H4">Medium</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} size="medium">
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text style="H4">Large</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} size="large">
        Hello Button
      </Button>
    </div>
  </div>
));
