import React from 'react';
import PropTypes from 'prop-types';
import styles from './LeaderCard.module.scss';
import { map, includes } from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Card, Text, Pill, Avatar } from 'components';

const LeaderCard = props => {
  const { place, img, name, address, value, usd, currency } = props;

  return (
    <Card hover className={styles.leaderCard}>
      <Card.Body>
        <div className="row">
          <div className="col-xs-1">
            <div className={styles.place}>
              <Text color="defaultGrey" typeScale="h1">
                {place}
              </Text>
            </div>
          </div>
          <div className="col-xs-7">
            <div className={styles.avatar}>
              <Avatar
                img={img}
                name={name}
                address={address}
                hash={address}
                size="small"
              />
            </div>
          </div>
          <div className="col-xs-4">
            <div className={styles.price}>
              <Text color="purple" typeScale="h3" className={styles.usd}>
                ${usd}
              </Text>
              <Text
                color="defaultGrey"
                typeScale="h5"
                className={styles.currency}
              >{`${value} ${currency}`}</Text>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

LeaderCard.propTypes = {
  place: PropTypes.number,
  img: PropTypes.string,
  address: PropTypes.string,
  value: PropTypes.number,
  usd: PropTypes.number,
  currency: PropTypes.string
};

LeaderCard.defaultProps = {};

export default LeaderCard;
