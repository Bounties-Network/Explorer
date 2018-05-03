import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

import { Text } from 'components';

const Card = props => {
  const { className, style, height, width, title, tabs } = props;
  // Tabs Example:
  // tabs: [ {
  //   title: 'Active',
  //   badge: 3,
  //   badgeStyle: {},
  //   content: []
  // }, {
  //   title: 'Pending Submissions',
  //   badge: 2,
  //   badgeStyle: {},
  //   content: []
  // } ]

  return (
    <div
      className={`${styles.cardContainer} ${styles[height]} ${styles[width]}`}
    >
      <div className={`${styles.cardTitle}`}>
        <Text style={'H2'}>{props.title}</Text>
      </div>
      <div className={`${styles.cardBody}`}>{props.children}</div>
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  height: PropTypes.oneOf(['short', 'medium', 'tall']),
  width: PropTypes.oneOf(['skinny', 'normal', 'wide']),
  title: PropTypes.string,
  tabs: PropTypes.array
};

Card.defaultProps = {
  height: 'medium',
  width: 'normal'
};

export default Card;
