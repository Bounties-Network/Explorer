import React from 'react';
import { Modal, Button } from 'components';
import intl from 'react-intl-universal';

const ExtendDeadlineErrorModal = props => {
  const { onClose, onExtendDeadline, visible } = props;

  return (
    <Modal
      dismissable={false}
      onClose={onClose}
      visible={visible}
      fixed
      size="small"
    >
      <Modal.Header closable icon="error">
        <Modal.Message>
          {intl.get('sections.bounty.modals.extend_deadline_error.title')}
        </Modal.Message>
      </Modal.Header>
      <Modal.Footer>
        <Button margin onClick={onClose} buttonType="button">
          {intl.get('actions.cancel')}
        </Button>
        <Button type="primary" submit onClick={onExtendDeadline}>
          {intl.get('actions.extend_deadline')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExtendDeadlineErrorModal;
