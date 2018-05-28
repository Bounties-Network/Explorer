import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

import { Text, Tabs } from 'components';

const Card = props => {
  const { className, style, height, width, title, tabs } = props;

  return (
    <div
      className={`${styles.cardContainer} ${styles[height]} ${styles[width]}`}
    >
      <div className={`${styles.cardTitle}`}>
        <Text style={'H2'}>{props.title}</Text>
        <Text link style="Body" color="blue">
          View All
        </Text>
      </div>
      <div className={`${styles.tabRow}`}>
        <Tabs tabs={tabs} />
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
