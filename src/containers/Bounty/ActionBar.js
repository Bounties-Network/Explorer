import React from 'react';
import styles from './ActionBar.module.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'components';
import { ModalManager } from './components';

const ActionBar = props => {
  const {
    isDraft,
    bounty,
    user,
    history,
    modalType,
    modalVisible,
    closeModal,
    showModal
  } = props;

  if (isDraft) {
    return (
      <div>
        <ModalManager
          visible={modalVisible}
          onClose={closeModal}
          modalType={modalType}
          onExtendDeadline={
            isDraft
              ? () => history.push(`/createBounty/draft/${bounty.id}/`)
              : null
          }
        />
        <Button
          type="action"
          fitWidth
          className={styles.activateButton}
          onClick={() => {
            if (moment(bounty.deadline) < moment()) {
              return showModal('deadlineWarning');
            }
            showModal('activate');
          }}
        >
          Activate Bounty
        </Button>
        <Link to={`/createBounty/draft/${bounty.id}/`}>
          <Button fitWidth className={styles.editBountyButton}>
            Edit Bounty
          </Button>
        </Link>
      </div>
    );
  }
};

export default withRouter(ActionBar);
