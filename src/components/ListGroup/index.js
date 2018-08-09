import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListGroup.module.scss';

class ListItem extends React.Component {
  render() {
    const { hover, className } = this.props;

    let itemClass = styles.listItem;
    if (className) {
      itemClass = className;
    }

    if (hover) {
      itemClass += ` ${styles.itemHover}`;
    }

    return <li className={itemClass}>{this.props.children}</li>;
  }
}

ListItem.propTypes = {
  hover: PropTypes.bool,
  className: PropTypes.string
};

class ListGroup extends React.Component {
  render() {
    return <ul className={styles.listGroup}>{this.props.children}</ul>;
  }
}

ListGroup.propTypes = {
  children: PropTypes.arrayOf(function(propValue, key) {
    for (let i = 0; i < propValue.length; i++) {
      if (propValue[i].type.name !== ListItem.name) {
        return new Error('Children Must Be an Instance of a List Item');
      }
    }
  })
};

ListGroup.defaultProps = {};
ListGroup.ListItem = ListItem;

export default ListGroup;
