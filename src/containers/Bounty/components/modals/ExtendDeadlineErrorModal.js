import React from 'react';
import { Modal, Button } from 'components';

const ExtendDeadlineErrorModal = props => {
  const { onClose, onExtendDeadline, visible } = props;

  return (
    <Modal dismissable onClose={onClose} visible={visible} fixed size="small">
      <Modal.Header closable icon={['far', 'exclamation-triangle']}>
        <Modal.Message>
          The deadline must be in the future in order to activate your bounty.
        </Modal.Message>
      </Modal.Header>
      <Modal.Footer>
        <Button margin onClick={onClose} buttonType="button">
          Cancel
        </Button>
        <Button type="primary" submit onClick={onExtendDeadline}>
          Extend Deadline
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExtendDeadlineErrorModal;
