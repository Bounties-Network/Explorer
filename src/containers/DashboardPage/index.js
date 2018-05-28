import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './DashboardPage.module.scss';
import { shortenAddress } from '../../utils/utilities';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faToolbox from '@fortawesome/fontawesome-pro-light/faToolbox';

import {
  Text,
  Circle,
  FullAddressBar,
  Chip,
  Tabs,
  SortBy,
  RefineByFilter,
  BountyCard
} from 'components';

const { statsSelector, rootStatsSelector } = selectors;

const DashboardPage = props => {
  console.log('props', props);
  const { loading, error } = props;

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error...</div>;
  }

  return (
    <div className={`${styles.dashboardPage}`}>
      <div className={`${styles.profileBar}`}>
        <div className={`${styles.profileData}`}>
          <div className={`${styles.circle}`}>
            <Circle type="image" />
          </div>
          <div className={`${styles.profileText}`}>
            <Text style="H1">Simona Pop</Text>
            <Text link color="blue">
              {shortenAddress('0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253')}
            </Text>
          </div>
        </div>
        <div className={`${styles.bountiesInfo}`}>
          <div className={`${styles.dataCell}`}>
            <Text color="purple" style="H2">
              10
            </Text>
            <Text color="grey" style="Body">
              Bounties Issued
            </Text>
          </div>
          <div className={`${styles.dataCell}`}>
            <Text color="purple" style="H2">
              3
            </Text>
            <Text color="grey" style="Body">
              Bounties Completed
            </Text>
          </div>
          <div className={`${styles.dataCell}`}>
            <div className={`${styles.moneyCell}`}>
              <Text color="purple" style="H2">
                $1225
              </Text>
              <Text color="grey" style="Alt">
                1.25 ETH
              </Text>
            </div>
            <Text color="grey" style="Body">
              Awarded
            </Text>
          </div>
          <div className={`${styles.dataCell}`}>
            <div className={`${styles.moneyCell}`}>
              <Text color="purple" style="H2">
                $500
              </Text>
              <Text color="grey" style="Alt">
                0.5 ETH
              </Text>
            </div>
            <Text color="grey" style="Body">
              Earned
            </Text>
          </div>
        </div>
      </div>
      <div className={`${styles.dashboardBody}`}>dashboardBody</div>
    </div>
  );
};

const mapStateToProps = (state, router) => {
  let currentUser = rootStatsSelector(state);
  const userAddress = router.match.params.address;

  return {
    userAddress,
    currentUser: currentUser,
    ...statsSelector(state)
  };
};

DashboardPage.propTypes = {
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadStats }),
  LoadComponent('userAddress')
)(DashboardPage);

export default check;
