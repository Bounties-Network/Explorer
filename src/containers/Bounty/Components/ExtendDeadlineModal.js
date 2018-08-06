import React from 'react';
import { Modal, Button } from 'components';

const ExtendDeadlineModal = props => {
  const { onClose, onExtendDeadline } = props;

  return (
    <Modal dismissable onClose={onClose} visible={true} fixed size="small">
      <Modal.Header closable icon={['far', 'exclamation-triangle']}>
        <Modal.Message>
          The deadline must be in the future in order to activate your bounty.
        </Modal.Message>
      </Modal.Header>
      <Modal.Footer>
        <Button margin onClick={onClose}>
          Cancel
        </Button>
        <Button type="primary" onClick={onExtendDeadline}>
          Extend Deadline
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExtendDeadlineModal;
