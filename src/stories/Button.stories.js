import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, Text } from 'components';

storiesOf('Button', module).add('All Buttons', () => (
  <div>
    <Text type="H3">Button Type</Text>
    <div>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Primary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')}>Hello Button</Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Secondary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} type="secondary">
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Destructive</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} type="destructive">
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Destructive</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} type="action">
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Link</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} type="link">
        Hello Button
      </Button>
    </div>
    <hr />

    <Text type="H3">Icon</Text>
    <div>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Primary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} icon={['fal', 'bell']}>
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Secondary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button
        onClick={action('clicked')}
        type="secondary"
        icon={['fal', 'bell']}
      >
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Destructive</Text>
      <span style={{ marginRight: '10px' }} />
      <Button
        onClick={action('clicked')}
        type="destructive"
        icon={['fal', 'bell']}
      >
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Destructive</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} type="action" icon={['fal', 'bell']}>
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Link</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('clicked')} type="link" icon={['fal', 'bell']}>
        Hello Button
      </Button>
    </div>
    <hr />

    <Text type="H3">Disabled</Text>
    <div>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Primary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('should not fire')} disabled>
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Secondary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('should not fire')} disabled type="secondary">
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Destructive</Text>
      <span style={{ marginRight: '10px' }} />
      <Button
        onClick={action('should not fire')}
        disabled
        type="destructive"
        text="Hello Button"
      >
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Destructive</Text>
      <span style={{ marginRight: '10px' }} />
      <Button
        onClick={action('should not fire')}
        disabled
        type="action"
        text="Hello Button"
      >
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Link</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('should not fire')} disabled type="link">
        Hello Button
      </Button>
    </div>
    <Text type="H3">Loading</Text>
    <div>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Primary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('should not fire')} loading>
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Secondary</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('should not fire')} loading type="secondary">
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Destructive</Text>
      <span style={{ marginRight: '10px' }} />
      <Button
        onClick={action('should not fire')}
        loading
        type="destructive"
        text="Hello Button"
      >
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Destructive</Text>
      <span style={{ marginRight: '10px' }} />
      <Button
        onClick={action('should not fire')}
        loading
        type="action"
        text="Hello Button"
      >
        Hello Button
      </Button>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Link</Text>
      <span style={{ marginRight: '10px' }} />
      <Button onClick={action('should not fire')} disabled type="link">
        Hello Button
      </Button>
    </div>
  </div>
));
