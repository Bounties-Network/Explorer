import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './DashboardPage.module.scss';
import { shortenAddress } from '../../utils/utilities';

import { SignInPage } from 'containers';
import { Text, Circle, Card, CardBounty, CardNotification } from 'components';

const {
  currentUserSelector,
  rootCurrentUserSelector,
  bountiesStateSelector,
  rootBountiesSelector,
  statsSelector,
  rootStatsSelector,
  rootAuthSelector,
  authStateSelector,
  publicAddressSelector
} = selectors;

let myBountiesTabs = [
  { title: 'Active', notificationAmount: 4 },
  { title: 'Pending Submissions', notificationAmount: 2 },
  { title: 'Drafts', notificationAmount: 2 }
];

let notificationTabs = [
  { title: 'Active', notificationAmount: 4 },
  { title: 'Pending Submissions', notificationAmount: 2 },
  { title: 'Drafts', notificationAmount: 2 }
];

const notificationData = [
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'Just now'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on',
    title: 'This is a title',
    date: 'Just now'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on',
    title: 'This is a title',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on',
    title: 'This is a title',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'Yesterday'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  }
];

const renderNotification = data => {
  return data.map((elem, ind) => {
    return (
      <CardNotification notificationData={elem} key={'notification' + ind} />
    );
  });
};

const renderBounties = data => {
  return data.map((elem, ind) => {
    return <CardBounty bountyData={elem} key={'bounty' + ind} />;
  });
};

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.log('props?', this.props);
  //   const { loadUserInfo, userAddress = '', loadBounties } = this.props;
  //   loadUserInfo(userAddress);
  //   loadBounties({ address: userAddress });
  // }

  render() {
    const {
      loading,
      error,
      bounties,
      currentUser,
      userAddress = '',
      stats,
      auth
    } = this.props;
    const { address, email, githubUsername, name } = currentUser;
    const { Completed } = stats;
    const bountiesIssued = stats.bounties;

    if (auth.loginStatus) {
      return (
        <div className={`${styles.dashboardPage}`}>
          <div className="container-fluid">
            <div className={`${styles.profileBar} row center-xs middle-xs`}>
              <div className="col-xs-4">
                <div className={`${styles.profileData}`}>
                  <div className={`${styles.circle}`}>
                    <Circle type="image" />
                  </div>
                  <div className={`${styles.profileText}`}>
                    <Text style="H1">{name}</Text>
                    <Text link color="blue">
                      {shortenAddress(userAddress)}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="col-xs-6">
                <div className={`${styles.bountiesInfo}`}>
                  <div className="row middle-xs">
                    <div className={`${styles.dataCell} col-xs-3`}>
                      <Text color="purple" style="H2">
                        {bountiesIssued}
                      </Text>
                      <Text color="grey" style="Body">
                        Bounties Issued
                      </Text>
                    </div>
                    <div className={`${styles.dataCell} col-xs-3`}>
                      <Text color="purple" style="H2">
                        {Completed}
                      </Text>
                      <Text color="grey" style="Body">
                        Bounties Completed
                      </Text>
                    </div>
                    <div className={`${styles.dataCell} col-xs-3`}>
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
                    <div className={`${styles.dataCell} col-xs-3`}>
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
              </div>
            </div>

            <div className={`${styles.dashboardBody}`}>
              <div className="row center-xs">
                <div className="col-xs-5">
                  <div className={`${styles.dashboardBodyLeft}`}>
                    <div className={`${styles.myBounties}`}>
                      <Card title="My Bounties" tabs={myBountiesTabs}>
                        {renderBounties(bounties)}
                      </Card>
                    </div>
                    {/* <div className={`${styles.mySubmissions}`}>{ renderBounties(bountiesData) }</div> */}
                  </div>
                </div>
                <div className="col-xs-5">
                  <div className={`${styles.dashboardBodyRight}`}>
                    <div className={`${styles.activity}`}>
                      <Card title="Activity" tabs={notificationTabs}>
                        {renderNotification(notificationData)}
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <SignInPage />;
    }
  }
}

const mapStateToProps = (state, router) => {
  let currentUser = rootCurrentUserSelector(state);
  let bounties = rootBountiesSelector(state);
  let stats = rootStatsSelector(state);
  let auth = rootAuthSelector(state);
  let userAddress = publicAddressSelector(auth);

  return {
    userAddress,
    auth: auth,
    stats: stats.stats,
    bounties: bounties.bounties,
    currentUser: currentUser.currentUser,
    ...currentUserSelector(state),
    ...bountiesStateSelector(state),
    ...statsSelector(state),
    ...authStateSelector(state)
  };
};

DashboardPage.propTypes = {
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(
    mapStateToProps,
    { load: actions.loadBounties, ...actions }
  ),
  LoadComponent('')
)(DashboardPage);

export default check;
