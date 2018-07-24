import React from 'react';
import PropTypes from 'prop-types';
import styles from './LeaderItem.module.scss';
import { ListGroup, Card, Text, Avatar } from 'components';

const LeaderItem = props => {
  const { place, img, name, address, usd } = props;

  return (
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
        </div>
      </div>
    </div>
  );
};

LeaderItem.propTypes = {
  place: PropTypes.number,
  img: PropTypes.string,
  address: PropTypes.string,
  usd: PropTypes.string
};

LeaderItem.defaultProps = {};

export default LeaderItem;
