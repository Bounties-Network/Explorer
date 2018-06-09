import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './SignInPage.module.scss';

import { Text, Button } from 'components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSignIn from '@fortawesome/fontawesome-pro-light/faSignIn';

const { leaderboardSelector, rootLeaderboardSelector } = selectors;

const SignInPage = props => {
  const { loading, error } = props;

  if (error) {
    return <div>error...</div>;
  }

  return (
    <div className={`${styles.signInPage}`}>
      <div className={`${styles.signInPageBody}`}>
        <FontAwesomeIcon
          icon={faSignIn}
          className={`fa-6x ${styles.signInIcon}`}
        />
        <div className={`${styles.signInHeaderText}`}>
          <Text style="H2">Sign in to use</Text>
          <Text
            style="H2"
            link
            color="purple"
            className={`${styles.link}`}
            noUnderline
          >
            bounties.network
          </Text>
        </div>
        <Text
          className={`${styles.descriptionText}`}
          style="CardHeading"
          color="grey"
        >
          In order for you to use certain features of the network like creating
          and fulfilling bounties, commenting, or viewing your network stats,
          please sign in.
        </Text>
        <div className={`${styles.instructionText}`}>
          <Text style="CardHeading" color="grey">
            If you don't wish to sign in but wish to explore, feel free to check
            out some bounties using the
          </Text>
          <Text style="CardHeading" link className={`${styles.link}`}>
            explorer.
          </Text>
        </div>
        <Button className={`${styles.signInButton}`}>Sign In</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, router) => {
  return {};
};

SignInPage.propTypes = {
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadBounties, ...actions }),
  LoadComponent('')
)(SignInPage);

export default check;
