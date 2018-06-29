import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import { includes, each } from 'lodash';

const ModalContext = React.createContext({});

class Header extends React.Component {
  render() {
    return this.props.children;
  }
}

class Body extends React.Component {
  render() {
    return this.props.children;
  }
}

class Footer extends React.Component {
  render() {
    return this.props.children;
  }
}

class Modal extends React.Component {
  onClose = () => {};

  renderHeader(header) {
    if (!header) {
      return null;
    }

    return (
      <ModalContext.Consumer>
        {({ onClose }) => (
          <div className={styles.header} onClick={onClose}>
            {header}
          </div>
        )}
      </ModalContext.Consumer>
    );
  }

  renderBody(body) {
    if (!body) {
      return null;
    }
    return <div className={styles.body}>{body}</div>;
  }

  renderFooter(footer) {
    if (!footer) {
      return null;
    }
    return <div className={styles.footer}>{footer}</div>;
  }

  render() {
    let header, footer, body;
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
      if (childName === Footer.name) {
        footer = child;
      }
    }, this.props.children);

    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <ModalContext.Provider value={{ onClose: this.onClose }}>
            {this.renderHeader(header)}
            {this.renderBody(body)}
            {this.renderFooter(footer)}
          </ModalContext.Provider>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
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
      if (
        !includes(collection[i].type.name, [
          Header.name,
          Body.name,
          Footer.name
        ])
      ) {
        return new Error('Children must be a modal header, footer or body');
      }
    }
  }
};

Modal.defaultProps = {};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
