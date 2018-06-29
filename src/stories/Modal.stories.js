import React from 'react';

import { storiesOf } from '@storybook/react';

import { Modal, Button } from 'components';

storiesOf('Modal', module).add('Modal', () => (
  <div>
    <Modal>
      <Modal.Header closable icon={['fal', 'wallet']}>
        I am a modal heading
      </Modal.Header>
      <Modal.Body>
        <div>I am a modal body</div>
        <div>More content</div>
      </Modal.Body>
      <Modal.Footer>
        <span style={{ marginRight: '1em' }}>
          <Button style="secondary">Cancel</Button>
        </span>
        <Button>Submit</Button>
      </Modal.Footer>
    </Modal>
  </div>
));
