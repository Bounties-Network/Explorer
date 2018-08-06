import React from 'react';
import styles from './ActionBar.module.scss';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'components';

const ActionBar = props => {
  const { isDraft, bounty, user } = props;

  if (isDraft) {
    return (
      <div>
        <Button type="action" fitWidth className={styles.activateButton}>
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

export default ActionBar;
