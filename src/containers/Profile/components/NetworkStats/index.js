import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { LoadComponent } from 'hocs';
import styles from './NetworkStats.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { ReviewsModal } from '../';
import { Circle, Switch, Text } from 'components';
import { capitalize } from 'lodash';
import { displayFormat } from './constants';
import { profileUISelector } from 'containers/Profile/selectors';
import { reviewsStateSelector } from 'public-modules/Reviews/selectors';
import { actions as reviewsActions } from 'public-modules/Reviews';
import intl from 'react-intl-universal';

function formatInput(value, format) {
  if (value === null) {
    return '--';
  } else if (format === 'fraction') {
    return `${Number(value.toFixed(0))}/5`;
  } else {
    return `${Number(value * 100).toFixed(0)}%`;
  }
}

const NetworkStatsComponent = props => {
  const {
    stats,
    switchValue,
    toggleNetworkSwitch,
    reviewsState,
    setReviewsModalVisible,
    reviewsModalVisible,
    loadMoreReviews
  } = props;
  const { loadingMore, loadingMoreError, reviews, count } = reviewsState;

  const renderCircle = key => {
    const text = intl.get(
      `sections.profile.network.descriptions.${switchValue}.${key}`
    );
    let value = stats[switchValue][key];
    let color = value >= 0.8 ? 'green' : value >= 0.5 ? 'orange' : 'red';

    if (value >= 1) {
      color = value >= 4 ? 'green' : value >= 3 ? 'orange' : 'red';
    }

    // an acceptance of 100% should be green and 1/5 ratings should be red
    color = key === 'acceptance' && value === 1 ? 'green' : color;

    let input = formatInput(value, displayFormat[key]);

    if (value === null) {
      color = 'nearWhite';
    }

    return (
      <div className={styles.networkStatCircle}>
        <Circle
          type="text"
          size="medium"
          input={input}
          color={color}
          textColor="white"
        />
        {key === 'rating' ? (
          <Text
            onClick={() => setReviewsModalVisible(true)}
            typeScale="Small"
            alignment="align-center"
            lineHeight="lineHeight-small"
            color="defaultGrey"
            className={`${styles.reviewsModalLink} ${
              styles.networkStatCircleLabel
            }`}
          >
            {text}
            <FontAwesomeIcon
              icon={['far', 'external-link']}
              className={styles.icon}
            />
          </Text>
        ) : (
          <Text
            className={styles.networkStatCircleLabel}
            typeScale="Small"
            alignment="align-center"
            lineHeight="lineHeight-small"
            color="defaultGrey"
          >
            {text}
          </Text>
        )}
      </div>
    );
  };

  return (
    <div className={styles.network}>
      <ReviewsModal
        visible={reviewsModalVisible}
        onClose={() => setReviewsModalVisible(false)}
        reviewType={switchValue.charAt(0).toUpperCase() + switchValue.slice(1)}
        reviews={reviews}
        count={count}
        loadMore={loadMoreReviews}
        loadingMore={loadingMore}
        loadingMoreError={loadingMoreError}
      />
      <div className={styles.networkStatsHeader}>
        <Text typeScale="h4" color="black" weight="fontWeight-medium">
          {intl.get('sections.profile.network.title')}
        </Text>

        <Switch
          onValue={'Fulfiller'}
          offValue={'Issuer'}
          value={capitalize(switchValue)}
          onChange={toggleNetworkSwitch}
        />
      </div>

      <div className={styles.networkStatsContainer}>
        {renderCircle('acceptance')}
        {renderCircle('rating')}
        {renderCircle('ratingGiven')}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const reviewsState = reviewsStateSelector(state);
  const profileUI = profileUISelector(state);

  return {
    reviewsState,
    reviewsModalVisible: profileUI.reviewsModalVisible,
    reviewsLoaderInitialProps: {
      address: ownProps.address,
      reviewType: ownProps.switchValue
    }
  };
};

const NetworkStats = compose(
  connect(
    mapStateToProps,
    {
      load: reviewsActions.loadReviewsReceived,
      loadMoreReviews: reviewsActions.loadMoreReviews
    }
  ),
  LoadComponent('reviewsLoaderInitialProps')
)(NetworkStatsComponent);

export default NetworkStats;
