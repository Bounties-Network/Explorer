import React from 'react';
import styles from './ExplorerBody.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Text, Sort } from 'components';
import { LoadComponent } from 'hocs';
import {
  bountiesSelector,
  bountiesCountSelector,
  bountiesStateSelector
} from 'public-modules/Bounties/selectors';
import { actions } from 'public-modules/Bounties';

const ExplorerBodyComponent = props => {
  const { bounties } = props;

  return (
    <div className={styles.explorerBody}>
      <div className={styles.bodyHeading}>
        <div>
          <Text
            inline
            color="purple"
            typeScale="h3"
            className={styles.bountyNumber}
          >
            54
          </Text>
          <Text color="defaultGrey" inline>
            bounties
          </Text>
        </div>
        <div className={styles.sortGroup}>
          <Text
            inline
            weight="fontWeight-bold"
            color="black"
            typeScale="Body"
            className={styles.sortByText}
          >
            Sort By
          </Text>
          <Sort active className={styles.sortBy}>
            Value
          </Sort>
          <Sort className={styles.sortBy}>Creation Date</Sort>
          <Sort className={styles.sortBy}>Expiry</Sort>
        </div>
      </div>
      <div className={styles.bountyList}>Explorer</div>
    </div>
  );
};

const mapStateToProps = state => ({
  bounties: bountiesSelector(state),
  count: bountiesCountSelector(state),
  ...bountiesStateSelector(state)
});

const ExplorerBody = compose(
  connect(
    mapStateToProps,
    { load: actions.loadBounties }
  ),
  LoadComponent('')
)(ExplorerBodyComponent);

export default ExplorerBody;
