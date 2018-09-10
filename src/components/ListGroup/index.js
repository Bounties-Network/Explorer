import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListGroup.module.scss';
import { Link } from 'react-router-dom';

class ListItem extends React.Component {
  render() {
    const { hover, className } = this.props;

    let itemClass = styles.listItem;

    if (hover) {
      itemClass += ` ${styles.itemHover}`;
    }

    return (
      <li className={`${className} ${itemClass}`}>{this.props.children}</li>
    );
  }
}

ListItem.propTypes = {
  hover: PropTypes.bool,
  className: PropTypes.string
};

class ListGroup extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <ul className={`${className} ${styles.listGroup}`}>
        {this.props.children}
      </ul>
    );
  }
}

ListGroup.propTypes = {
  children: PropTypes.arrayOf(function(propValue, key) {
    for (let i = 0; i < propValue.length; i++) {
      if (
        typeof propValue[i] !== 'boolean' &&
        propValue[i].length > 0 &&
        (propValue[i].type.name !== ListItem.name ||
          propValue[i].type.name !== Link.name)
      ) {
        return new Error('Children Must Be an Instance of a List Item');
      }
    }
  })
};

ListGroup.defaultProps = {};
ListGroup.ListItem = ListItem;

export default ListGroup;
