import React from 'react';
import styles from './Bounty.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions as bountyActions } from 'public-modules/Bounty';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { PageCard } from 'explorer-components';

const Bounty = props => {
  return (
    <PageCard>
      <PageCard.Header>
        <div className={styles.ethBox} />
        <div className={styles.bountyHeader}>
          <PageCard.Title>Bounty Page</PageCard.Title>
        </div>
      </PageCard.Header>
      <PageCard.Content>Body Content</PageCard.Content>
    </PageCard>
  );
};

const mapStateToProps = state => ({
  user: getCurrentUserSelector(state)
});

export default Bounty;
