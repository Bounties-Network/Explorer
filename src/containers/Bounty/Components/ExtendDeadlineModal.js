import React from 'react';
import styles from './ActionBar.module.scss';
import { Modal, Button } from 'components';

const ExtendDeadlineModal = props => {
  const { onExtendDeadline, onClose } = props;

  return (
    <Modal dismissable onClose={onClose}>
      <Modal.Header closable icon={['far', 'exclamation-triangle']}>
        <Modal.Message>
          The deadline must be in the future in order to activate your bounty.
        </Modal.Message>
      </Modal.Header>
      <Modal.Footer>
        <Button margin onClick={onClose}>
          Cancel
        </Button>
        <Button type="primary">Extend Deadline</Button>
      </Modal.Footer>
    </Modal>
  );
};
