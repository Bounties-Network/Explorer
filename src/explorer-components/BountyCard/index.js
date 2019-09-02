import React from 'react';
import PropTypes from 'prop-types';
import styles from './BountyCard.module.scss';
import { includes, map } from 'lodash';
import { Link } from 'react-router-dom';
import { REV_DIFFICULTY_MAPPING } from 'public-modules/Bounties/constants';
import { EXPIRED } from 'public-modules/Bounty/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Pill, Text } from 'components';
import { Currency, LinkedAvatar } from 'explorer-components';
import { scrollToTop } from 'utils/helpers';
import intl from 'react-intl-universal';
import config from 'public-modules/config';
import {
  faLevelUp,
  faClock,
  faPuzzlePiece
} from '@fortawesome/pro-regular-svg-icons';

const BountyCard = props => {
  const {
    id,
    title,
    categories,
    img,
    address,
    experience_level,
    submissions,
    deadline,
    stage,
    value,
    usd,
    currency,
    onPillClick,
    selectedCategories
  } = props;
  let primaryCurrency,
    primaryValue,
    primaryClassName,
    secondaryValue,
    secondaryCurrency;
  if (config.defaultToken) {
    primaryCurrency = currency;
    primaryValue = value;
    secondaryValue = usd;
    secondaryCurrency = 'usd';
  } else {
    primaryValue = usd;
    primaryClassName = styles.usd;
    secondaryValue = value;
    secondaryCurrency = currency;
  }

  const renderCategories = () => {
    return map(category => {
      let backgroundColor = 'white';
      let hoverBackgroundColor = 'nearWhite';
      if (includes(category.normalized_name, selectedCategories)) {
        backgroundColor = 'nearWhite';
        hoverBackgroundColor = 'white';
      }

      return (
        <div key={category.normalized_name} className={styles.pill}>
          <Pill
            onClick={() => onPillClick(category.normalized_name)}
            backgroundColor={backgroundColor}
            hoverBackgroundColor={hoverBackgroundColor}
          >
            {category.name}
          </Pill>
        </div>
      );
    }, categories);
  };

  var reg = /\d+/;
  var number = deadline.match(reg);
  var dateNum;
  if (number) {
    dateNum = number[0];
  } else {
    dateNum = 1;
  }
  return (
    <Card hover className={styles.bountyCard}>
      <Card.Body>
        <div className="row">
          <div
            className={`col-xs-9 col-sm-6 col-lg-7 ${styles.bountyPrimaryData}`}
          >
            <Link to={`/bounty/${id}`} className={styles.link}>
              <Text
                typeScale="h4"
                weight="fontWeight-medium"
                className={styles.titleText}
              >
                {title}
              </Text>
            </Link>
            <div className={styles.categoryList}>{renderCategories()}</div>
            <div className={styles.avatar}>
              <LinkedAvatar
                img={img}
                address={address}
                hash={address}
                to={`/profile/${address}`}
                onClick={() => scrollToTop()}
                variant="small"
                resourceType="user"
              />
            </div>
          </div>
          <div
            className={`col-xs-12 col-sm-4 col-lg-3 ${styles.bountyMetaData}`}
          >
            <div className={styles.detailGroup}>
              <div className={styles.detailIcon}>
                <Text inline color="defaultGrey">
                  <FontAwesomeIcon icon={faPuzzlePiece} />
                </Text>
              </div>
              <Text
                inline
                className={styles.detailInput}
                weight="fontWeight-medium"
              >
                {intl.get(
                  'components.bounty_card.difficulty_options.' +
                    REV_DIFFICULTY_MAPPING[experience_level]
                )}
              </Text>
              <Text inline color="defaultGrey" className={styles.detailLabel}>
                {intl.get('components.bounty_card.difficulty')}
              </Text>
            </div>
            <div className={styles.detailGroup}>
              <div className={styles.detailIcon}>
                <Text inline color="defaultGrey" className={styles.detailIcon}>
                  <FontAwesomeIcon icon={faClock} />
                </Text>
              </div>
              <Text
                inline
                className={styles.detailInput}
                weight="fontWeight-medium"
              >
                {deadline}
              </Text>
              <Text inline color="defaultGrey" className={styles.detailLabel}>
                {stage === EXPIRED
                  ? intl.get('common.expired', { count: dateNum })
                  : intl.get('common.remaining', { count: dateNum })}
              </Text>
            </div>
            <div className={styles.detailGroup}>
              <div className={styles.detailIcon}>
                <Text inline color="defaultGrey" className={styles.detailIcon}>
                  <FontAwesomeIcon icon={faLevelUp} />
                </Text>
              </div>
              <Text
                inline
                className={styles.detailInput}
                weight="fontWeight-medium"
              >
                {submissions || 0}
              </Text>
              <Text inline color="defaultGrey" className={styles.detailLabel}>
                {intl.get('components.bounty_card.submissions_count', {
                  count: submissions || 0
                })}
              </Text>
            </div>
          </div>
          <div className={`col-xs-3 col-sm-2 col-lg-2 ${styles.bountyPrize}`}>
            <Currency
              className={styles.price}
              primaryValue={primaryValue}
              primaryCurrency={primaryCurrency}
              primaryClassName={primaryClassName}
              secondaryValue={secondaryValue}
              secondaryCurrency={secondaryCurrency}
              secondaryTypeScale="Body"
              currencyClass={styles.currency}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

BountyCard.propTypes = {
  experience_level: PropTypes.number,
  title: PropTypes.string,
  categories: PropTypes.array,
  img: PropTypes.string,
  address: PropTypes.string,
  submissions: PropTypes.number,
  deadline: PropTypes.string,
  value: PropTypes.number,
  usd: PropTypes.number,
  currency: PropTypes.string,
  onPillClick: PropTypes.func
};

BountyCard.defaultProps = {
  onPillClick: () => {},
  experience_level: 'Unknown'
};

export default BountyCard;
