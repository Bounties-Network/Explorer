import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import { includes, each } from 'lodash';

class Header extends React.Component {
  render() {
    return <div className={styles.header}>{this.props.children}</div>;
  }
}

class Body extends React.Component {
  render() {
    return <div className={styles.body}>{this.props.children}</div>;
  }
}

class Card extends React.Component {
  renderHeader(header) {
    if (!header) {
      return null;
    }

    return <div className={styles.headerWrapper}>{header}</div>;
  }

  renderBody(body) {
    if (!body) {
      return null;
    }
    return <div className={styles.bodyWrapper}>{body}</div>;
  }

  render() {
    const { hover, className } = this.props;

    let header, body;
    const children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];
    each(child => {
      console.log(child);
      const childName = child.type.name;
      if (childName === Header.name) {
        header = child;
      }
      if (childName === Body.name) {
        body = child;
      }
    }, children);

    let cardClass = styles.card;
    if (hover) {
      cardClass += ` ${styles.hover}`;
    }

    return (
      <div className={cardClass}>
        {this.renderHeader(header)}
        {this.renderBody(body)}
      </div>
    );
  }
}

Card.propTypes = {
  hover: PropTypes.bool,
  children: function(props, propName, componentName) {
    const children = props[propName];
    const isArray = Array.isArray(children);
    let collection = children;

    if (!isArray) {
      collection = [children];
    }

    // have to return an error not throw...
    // so we have to use this ugly for loop
    for (let i = 0; i < collection.length; i++) {
      if (!includes(collection[i].type.name, [Header.name, Body.name])) {
        return new Error('Children must be a Card header or body');
      }
    }
  }
};

Card.defaultProps = {};
Card.Header = Header;
Card.Body = Body;

export default Card;
