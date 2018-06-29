import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './Modal.module.scss';
import { Text } from 'components';
import { includes, each } from 'lodash';

const ModalContext = React.createContext({});

class Header extends React.Component {
  render() {
    const { closable, icon, children } = this.props;

    return (
      <ModalContext.Consumer>
        {({ onClose }) => (
          <div className={styles.header}>
            {closable ? (
              <div className={styles.closeWrapper}>
                <FontAwesomeIcon
                  icon={['fal', 'times']}
                  className={styles.closeIcon}
                  onClick={onClose}
                />
              </div>
            ) : null}
            <div className={styles.headerContent}>
              {icon ? (
                <div>
                  <FontAwesomeIcon icon={icon} className={styles.iconHeader} />
                </div>
              ) : null}
              <Text style="H2">{children}</Text>
            </div>
          </div>
        )}
      </ModalContext.Consumer>
    );
  }
}

Header.propTypes = {
  closable: PropTypes.bool,
  icon: PropTypes.array
};

class Body extends React.Component {
  render() {
    return <div className={styles.body}>{this.props.children}</div>;
    return this.props.children;
  }
}

class Footer extends React.Component {
  render() {
    return <div className={styles.footer}>{this.props.children}</div>;
  }
}

class Modal extends React.Component {
  onClose = () => {
    this.props.onClose();
  };

  dismiss = () => {
    if (this.props.dismissable) {
      this.onClose();
    }
  };

  modalClick(e) {
    e.stopPropagation();
  }

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

  renderFooter(footer) {
    if (!footer) {
      return null;
    }
    return <div className={styles.footerWrapper}>{footer}</div>;
  }

  render() {
    const { size } = this.props;
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

    let gridSize = 'col-xs-7';
    if (size === 'large') {
      gridSize = 'col-xs-9';
    }
    if (size === 'small') {
      gridSize = 'col-xs-5';
    }

    return (
      <div className={styles.overlay} onClick={this.dismiss}>
        <div className={`${styles.modalWrapper} row center-xs middle-xs`}>
          <div className={gridSize}>
            <div className={styles.modal} onClick={this.modalClick}>
              <ModalContext.Provider value={{ onClose: this.onClose }}>
                {this.renderHeader(header)}
                {this.renderBody(body)}
                {this.renderFooter(footer)}
              </ModalContext.Provider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  dismissable: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
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

Modal.defaultProps = {
  size: 'medium',
  dismissable: true
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
