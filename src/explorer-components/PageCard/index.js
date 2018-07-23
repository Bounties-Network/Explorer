import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageCard.module.scss';
import { map, includes, each } from 'lodash';
import { Text, Card } from 'components';

const Title = props => {
  const { children, className } = props;

  return (
    <Text className={className} typeScale="h1" color="white">
      {children}
    </Text>
  );
};

class Header extends React.Component {
  render() {
    const { children, className } = this.props;

    return <div className={`${styles.header} ${className}`}>{children}</div>;
  }
}

class Content extends React.Component {
  render() {
    const { children, className } = this.props;
    return (
      <Card className={`${styles.content} ${className}`}>
        <Card.Body>{children}</Card.Body>
      </Card>
    );
  }
}

const PageCard = props => {
  let header,
    content = [];
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  each(child => {
    const childName = child.type.name;
    if (childName === Header.name) {
      header = child;
    }
    if (childName === Content.name) {
      content.push(child);
    }
  }, children);

  return (
    <div className={styles.pageCard}>
      <div className={styles.headerWrapper}>
        <div className="container-fluid">
          <div className="row center-xs">
            <div className="col-xs-10">{header}</div>
          </div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className="container-fluid fullHeight">
          <div className="row center-xs fullHeight">
            <div className="col-xs-7 fullHeight">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

PageCard.propTypes = {
  children: function(props, propName, componentName) {
    const children = props[propName];
    const isArray = Array.isArray(children);
    let collection = children;

    if (!isArray) {
      collection = [children];
    }

    const childrenTypes = map(component => {
      return component.type.name;
    }, collection);

    if (!includes([Header.name], childrenTypes)) {
      return new Error('You must have a header child');
    }

    if (!includes([Content.name], childrenTypes)) {
      return new Error('You must have a content child');
    }
  }
};

PageCard.Content = Content;
PageCard.Header = Header;
PageCard.Title = Title;

export default PageCard;
