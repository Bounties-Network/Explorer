import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

const Card = props => {
  const { className, style, size, onClick, title, viewAll, tabs } = props;
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

  return <div />;
};

Card.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  title: PropTypes.string,
  viewAll: PropTypes.boolean,
  tabs: PropTypes.array
};

Card.defaultProps = {
  size: 'medium'
};

export default Card;
