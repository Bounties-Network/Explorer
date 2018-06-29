import React from 'react';

import { storiesOf } from '@storybook/react';

import { Modal } from 'components';

storiesOf('Modal', module).add('Modal', () => (
  <div>
    <Modal>
      <Modal.Header>Header</Modal.Header>
      <Modal.Body>Body</Modal.Body>
      <Modal.Footer>Footer</Modal.Footer>
    </Modal>
  </div>
));
