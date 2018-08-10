import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageCard.module.scss';
import { map, includes, each } from 'lodash';
import { Text, Card } from 'components';

const Title = props => {
  const { children, className } = props;
  return (
    <Text
      className={className}
      className={styles.title}
      typeScale="h2"
      color="white"
    >
      {children}
    </Text>
  );
};

const Break = props => <div className={styles.break} />;

class Header extends React.Component {
  render() {
    const { children, className } = this.props;

    return <div className={`${styles.header} ${className}`}>{children}</div>;
  }
}

class Content extends React.Component {
  render() {
    const { children, className, bodyClass, noBanner } = this.props;
    return (
      <Card className={`${noBanner ? null : styles.content} ${className}`}>
        <Card.Body className={bodyClass}>{children}</Card.Body>
      </Card>
    );
  }
}

const PageCard = props => {
  const { noBanner } = props;

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
      content.push(React.cloneElement(child, { noBanner }));
    }
  }, children);

  return (
    <div className={styles.pageCard}>
      <div className={noBanner ? null : styles.headerWrapper}>
        <div className="pageWrapper">
          <div className="row center-xs">
            <div className="col-xs-10">{header}</div>
          </div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className="pageWrapper">
          <div className="row center-xs">
            <div className="col-xs-10">{content}</div>
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
  },
  noBanner: PropTypes.bool
};

PageCard.defaultProps = {
  noBanner: false
};

PageCard.Content = Content;
PageCard.Header = Header;
PageCard.Title = Title;
PageCard.Break = Break;

export default PageCard;
