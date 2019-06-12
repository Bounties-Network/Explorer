import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button } from 'components';
import { reduxForm } from 'redux-form';
import intl from 'react-intl-universal';

const KillBountyFormModal = props => {
  const { onClose, handleSubmit, visible } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        dismissable={true}
        onClose={onClose}
        visible={visible}
        fixed
        size="small"
      >
        <Modal.Header closable={true}>
          <Modal.Message>
            {intl.get('sections.bounty.modals.kill_bounty.title')}
          </Modal.Message>
          <Modal.Description>
            {intl.get('sections.bounty.modals.kill_bounty.description')}
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody} />
        <Modal.Footer>
          <Button
            margin
            onClick={e => {
              e.preventDefault();
              onClose();
            }}
            buttonType="button"
          >
            {intl.get('actions.cancel')}
          </Button>
          <Button type="destructive">{intl.get('actions.de_activate')}</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default reduxForm({ form: 'killBounty' })(KillBountyFormModal);
