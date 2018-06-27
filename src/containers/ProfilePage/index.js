import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './ProfilePage.module.scss';
// import { web3 } from '../../utils/global';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faToolbox from '@fortawesome/fontawesome-pro-light/faToolbox';
import faComments from '@fortawesome/fontawesome-pro-light/faComments';
import faGlobe from '@fortawesome/fontawesome-pro-light/faGlobe';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';

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

let web3 = window.web3;

const {
  currentUserSelector,
  rootCurrentUserSelector,
  bountiesStateSelector,
  rootBountiesSelector,
  statsSelector,
  rootStatsSelector
} = selectors;

const renderChips = data => {
  return data.map((elem, idx) => {
    return (
      <div className={`${styles.chip}`} key={elem + idx}>
        <Chip style="rectangle">{elem}</Chip>
      </div>
    );
  });
};

const renderBountyCards = data => {
  return data.map((elem, idx) => {
    return (
      <div key={'bounty' + idx} className={`${styles.bountyCard}`}>
        <BountyCard bountyData={elem} />
      </div>
    );
  });
};

let tabs = [{ title: 'Bounties' }, { title: 'Submissions' }];

const skills = [
  'FAKE',
  'React',
  'Angular 4',
  'CSS',
  'HTML',
  'Translations',
  'Javascript',
  'Java',
  'Python',
  'Server Side Rendering'
];

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOptions: {}
    };

    this.updateSearchOptions = this.updateSearchOptions.bind(this);
  }

  componentDidMount() {
    let { userAddress } = this.props;
    this.updateSearchOptions('address', userAddress);
  }

  updateSearchOptions(prop, options) {
    const { loadBounties } = this.props;

    let tempSearchOptions = Object.assign({}, this.state.searchOptions);
    tempSearchOptions[prop] = options;

    this.setState({ searchOptions: tempSearchOptions }, () => {
      console.log(this.state.searchOptions);
      loadBounties(this.state.searchOptions);
    });
  }

  render() {
    const {
      loading,
      error,
      userAddress,
      currentUser,
      bounties,
      stats
    } = this.props;
    const { address, email, githubUsername, name } = currentUser;
    const { bounties_acceptance_rate } = stats;

    console.log(stats);
    if (error) {
      return <div>error...</div>;
    }

    return (
      <div className={`${styles.profilePage} row`}>
        <div className="col-xs">
          <div className={`${styles.profile}`}>
            <div className={`${styles.profilePic}`}>
              <Circle type="image" />
              <Text style="H2" className={styles.profileTitle}>
                {name}
              </Text>
              <FullAddressBar address={userAddress} />
            </div>
            <div className={`${styles.profileInfo}`}>
              <div className={`${styles.about}`}>
                <div className={`${styles.profileHeader}`}>
                  <Text style="Body">About</Text>
                </div>
                <div className={`${styles.aboutData}`}>
                  <div className={`${styles.aboutDataCell}`}>
                    <Text style="FormLabel">
                      <FontAwesomeIcon icon={faToolbox} /> Organization
                    </Text>
                    <Text style="BodySmall">FAKE Consensys</Text>
                  </div>
                  <div className={`${styles.aboutDataCell}`}>
                    <Text style="FormLabel">
                      <FontAwesomeIcon icon={faComments} /> Languages Spoken
                    </Text>
                    <Text style="BodySmall">FAKE, English, Romanian</Text>
                  </div>
                </div>
              </div>
              <div className={`${styles.skills}`}>
                <div className={`${styles.profileHeader}`}>
                  <Text style="Body">Skills</Text>
                </div>
                <div className={`${styles.skillsData}`}>
                  <div className={`${styles.chipBar}`}>
                    {renderChips(skills)}
                  </div>
                </div>
              </div>
              <div className={`${styles.networkStats}`}>
                <div className={`${styles.networkHeader}`}>
                  <Text style="Body">Network Stats</Text>
                </div>
                <div className={`${styles.networkStatsData}`}>
                  <div className={`${styles.networkStatsDataCell}`}>
                    <div className={`${styles.networkStatsCircle}`}>
                      <Circle
                        size="small"
                        color="green"
                        textColor="white"
                        textStyle="H4"
                        input={`${bounties_acceptance_rate * 100}%`}
                      />
                    </div>
                    <Text style="FormLabel">Submission Acceptance Rate</Text>
                  </div>
                  <div className={`${styles.networkStatsDataCell}`}>
                    <div className={`${styles.networkStatsCircle}`}>
                      <Circle
                        size="small"
                        color="orange"
                        textColor="white"
                        textStyle="H4"
                        input="0/0"
                      />
                    </div>
                    <Text style="FormLabel">
                      Average Submission Rating Given
                    </Text>
                  </div>
                  <div className={`${styles.networkStatsDataCell}`}>
                    <div className={`${styles.networkStatsCircle}`}>
                      <Circle
                        size="small"
                        color="green"
                        textColor="white"
                        textStyle="H4"
                        input="00%"
                      />
                    </div>
                    <Text style="FormLabel">Response Rate</Text>
                  </div>
                </div>
              </div>
              <div className={`${styles.elsewhere}`}>
                <div className={`${styles.profileHeader}`}>
                  <Text style="Body">Elsewhere</Text>
                </div>
                <div className={`${styles.elsewhereData}`}>
                  <div>
                    <Text color="grey">
                      <FontAwesomeIcon icon={faGlobe} />
                    </Text>{' '}
                    <Text color="blue" link>
                      {' '}
                      FAKEfirstNameLastName.com
                    </Text>
                  </div>
                  <div>
                    <Text color="grey">
                      <FontAwesomeIcon icon={faTwitter} />
                    </Text>{' '}
                    <Text color="blue" link>
                      {' '}
                      @FAKEtwitterUsername
                    </Text>
                  </div>
                  <div>
                    <Text color="grey">
                      <FontAwesomeIcon icon={faGithub} />
                    </Text>{' '}
                    <Text
                      color="blue"
                      link
                      src={`https://github.com/${githubUsername}`}
                    >
                      {' '}
                      {`@${githubUsername}`}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.tabs}`}>
            <Tabs tabs={tabs} />
          </div>
          <div className={`${styles.bounties}`}>
            <div className={`${styles.sortBy}`}>
              <SortBy onClick={e => this.updateSearchOptions('sort', e)} />
            </div>
            <div className={`${styles.bountiesBody}`}>
              <div className={`${styles.refineBy}`}>
                <RefineByFilter
                  stages
                  paymentStatus
                  onChange={e => this.updateSearchOptions('filter', e)}
                />
              </div>
              <div className={`${styles.bountyCards}`}>
                {renderBountyCards(bounties)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  let currentUser = rootCurrentUserSelector(state);
  let bounties = rootBountiesSelector(state);
  let userAddress = router.match.params.address || '';
  // const userAddress = router.match.params.address;
  // if (web3 && web3.eth && web3.eth.accounts && web3.eth.accounts[0]) {
  //   userAddress = web3.eth.accounts[0];
  // }

  return {
    userAddress: '0x627306090abab3a6e1400e9345bc60c78a8bef57',
    stats: {},
    bounties: bounties.bounties,
    currentUser: currentUser.currentUser,
    ...currentUserSelector(state),
    ...bountiesStateSelector(state),
    ...statsSelector(state)
  };
};

ProfilePage.propTypes = {
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(
    mapStateToProps,
    { load: actions.loadUserInfo, ...actions }
  ),
  LoadComponent('userAddress')
)(ProfilePage);

export default check;
