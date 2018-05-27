import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './ExplorerPage.module.scss';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faToolbox from '@fortawesome/fontawesome-pro-light/faToolbox';
import faComments from '@fortawesome/fontawesome-pro-light/faComments';
import faGlobe from '@fortawesome/fontawesome-pro-light/faGlobe';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';

import { Text, Circle, FullAddressBar, Chip, Tabs } from 'components';

const { currentUserSelector, rootCurrentUserSelector } = selectors;

const renderChips = data => {
  return data.map((elem, idx) => {
    return (
      <div className={`${styles.chip}`} key={elem + idx}>
        <Chip style="rectangle">{elem}</Chip>
      </div>
    );
  });
};

const ExplorerPage = props => {
  console.log('props', props);
  const { loading, error, userAddress, currentUser } = props;
  const { address, email, githubUsername, name } = currentUser;

  let tabs = [{ title: 'Bounties' }, { title: 'Submissions' }];

  const skills = ['React', 'CSS', 'HTML', 'Translations', 'Javascript'];

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error...</div>;
  }

  return (
    <div className={`${styles.explorerPage}`}>
      <div className={`${styles.profile}`}>
        <div className={`${styles.profilePic}`}>
          <Circle type="image" />
          <Text className={styles.profileTitle}>{name}</Text>
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
                <Text style="BodySmall">Consensys</Text>
              </div>
              <div className={`${styles.aboutDataCell}`}>
                <Text style="FormLabel">
                  <FontAwesomeIcon icon={faComments} /> Languages Spoken
                </Text>
                <Text style="BodySmall">English, Romanian</Text>
              </div>
            </div>
          </div>
          <div className={`${styles.skills}`}>
            <div className={`${styles.profileHeader}`}>
              <Text style="Body">Skills</Text>
            </div>
            <div className={`${styles.skillsData}`}>{renderChips(skills)}</div>
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
                    input="85%"
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
                    input="3/5"
                  />
                </div>
                <Text style="FormLabel">Average Submission Rating Given</Text>
              </div>
              <div className={`${styles.networkStatsDataCell}`}>
                <div className={`${styles.networkStatsCircle}`}>
                  <Circle
                    size="small"
                    color="green"
                    textColor="white"
                    textStyle="H4"
                    input="100%"
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
                <Text link> firstNameLastName.com</Text>
              </div>
              <div>
                <Text color="grey">
                  <FontAwesomeIcon icon={faTwitter} />
                </Text>{' '}
                <Text link> @twitterUsername</Text>
              </div>
              <div>
                <Text color="grey">
                  <FontAwesomeIcon icon={faGithub} />
                </Text>{' '}
                <Text link> @githubUsername</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.tabs}`}>
        <Tabs tabs={tabs} />
      </div>
      <div className={`${styles.bounties}`}>BOUNTIES</div>
    </div>
  );
};

const mapStateToProps = (state, router) => {
  let currentUser = rootCurrentUserSelector(state);
  const userAddress = router.match.params.address;

  return {
    userAddress: userAddress,
    currentUser: currentUser.currentUser,
    ...currentUserSelector(state)
  };
};

ExplorerPage.propTypes = {
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadUserInfo }),
  LoadComponent('userAddress')
)(ExplorerPage);

export default check;
