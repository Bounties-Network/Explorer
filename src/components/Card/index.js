import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import { Text, Tabs } from 'components';
import { includes, each } from 'lodash';

const HeaderTitle = props => (
  <Text
    typeScale="h3"
    weight="fontWeight-medium"
    className={styles.headerTitle}
  >
    {props.children}
  </Text>
);

const HeaderTabs = props => <Tabs {...props}>{props.children}</Tabs>;

class Header extends React.Component {
  render() {
    const { underline } = this.props;

    let headerStyles = styles.header;
    if (!underline) {
      headerStyles += ` ${styles.noUnderline}`;
    }

    return (
      <div className={headerStyles}>
        {typeof this.props.children === 'string' ? (
          <HeaderTitle>{this.props.children}</HeaderTitle>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

Header.propTypes = {
  underline: PropTypes.bool
};

Header.defaultProps = {
  underline: true
};

class Body extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div className={`${styles.body} ${className}`}>{this.props.children}</div>
    );
  }
}

Body.propTypes = {
  className: PropTypes.string
};

class Card extends React.Component {
  renderHeader(header) {
    if (!header) {
      return null;
    }

    return header;
  }

  renderBody(body) {
    if (!body) {
      return null;
    }
    return body;
  }

  render() {
    const { hover, className } = this.props;

    let header, body;
    const children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];
    each(child => {
      const childName = child.type.name;
      if (childName === Header.name) {
        header = child;
      }
      if (childName === Body.name) {
        body = child;
      }
    }, children);

    let cardClass = `${styles.card} ${className}`;
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
Card.HeaderTitle = HeaderTitle;
Card.HeaderTabs = HeaderTabs;
Card.Body = Body;

export default Card;
