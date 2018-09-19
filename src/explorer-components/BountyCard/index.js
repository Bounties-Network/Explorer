import React from 'react';
import PropTypes from 'prop-types';
import styles from './BountyCard.module.scss';
import { map, includes, capitalize } from 'lodash';
import { Link } from 'react-router-dom';
import { REV_DIFFICULTY_MAPPING } from 'public-modules/Bounties/constants';
import { EXPIRED } from 'public-modules/Bounty/constants';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Card, Text, Pill } from 'components';
import { Currency, LinkedAvatar } from 'explorer-components';

const BountyCard = props => {
  const {
    id,
    title,
    categories,
    img,
    address,
    experienceLevel,
    submissions,
    deadline,
    stage,
    value,
    usd,
    currency,
    onPillClick,
    selectedCategories
  } = props;

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
                onClick={() =>
                  document.getElementsByClassName('page-body')[0].scrollTo(0, 0)
                }
                size="small"
              />
            </div>
          </div>
          <div
            className={`col-xs-12 col-sm-4 col-lg-3 ${styles.bountyMetaData}`}
          >
            <div className={styles.detailGroup}>
              <div className={styles.detailIcon}>
                <Text inline color="defaultGrey">
                  <FontAwesomeIcon icon={['far', 'puzzle-piece']} />
                </Text>
              </div>
              <Text
                inline
                className={styles.detailInput}
                weight="fontWeight-medium"
              >
                {capitalize(REV_DIFFICULTY_MAPPING[experienceLevel])}
              </Text>
              <Text inline color="defaultGrey" className={styles.detailLabel}>
                difficulty
              </Text>
            </div>
            <div className={styles.detailGroup}>
              <div className={styles.detailIcon}>
                <Text inline color="defaultGrey" className={styles.detailIcon}>
                  <FontAwesomeIcon icon={['far', 'clock']} />
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
                {stage === EXPIRED ? 'expired' : 'remaining'}
              </Text>
            </div>
            <div className={styles.detailGroup}>
              <div className={styles.detailIcon}>
                <Text inline color="defaultGrey" className={styles.detailIcon}>
                  <FontAwesomeIcon icon={['far', 'level-up']} />
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
                {submissions === 1 ? 'submission' : 'submissions'}
              </Text>
            </div>
          </div>
          <div className={`col-xs-3 col-sm-2 col-lg-2 ${styles.bountyPrize}`}>
            <Currency
              className={styles.price}
              primaryValue={usd}
              primaryClassName={styles.usd}
              secondaryValue={value}
              secondaryCurrency={currency}
              secondaryTypeScale="Small"
              currencyClass={styles.currency}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

BountyCard.propTypes = {
  experienceLevel: PropTypes.number,
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
  experienceLevel: 'Unknown'
};

export default BountyCard;
