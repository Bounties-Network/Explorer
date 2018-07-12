import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './Modal.module.scss';
import { Text, Loader } from 'components';
import { includes, each } from 'lodash';

const ModalContext = React.createContext({});

class Header extends React.Component {
  render() {
    const { closable, icon, loadingIcon, children } = this.props;

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
              {icon && !loadingIcon ? (
                <div>
                  <FontAwesomeIcon icon={icon} className={styles.iconHeader} />
                </div>
              ) : null}
              {loadingIcon ? (
                <div>
                  <Loader
                    color="blue"
                    size="medium"
                    className={styles.loadingHeader}
                  />
                </div>
              ) : null}
              {children}
            </div>
          </div>
        )}
      </ModalContext.Consumer>
    );
  }
}

Header.propTypes = {
  closable: PropTypes.bool,
  loadingIcon: PropTypes.bool,
  icon: PropTypes.array
};

class Heading extends React.Component {
  render() {
    return (
      <Text
        className={styles.heading}
        typeScale="h3"
        color="black"
        weight="fontWeight-medium"
      >
        {this.props.children}
      </Text>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <Text
        className={styles.message}
        typeScale="h4"
        color="black"
        weight="fontWeight-medium"
      >
        {this.props.children}
      </Text>
    );
  }
}

class Description extends React.Component {
  render() {
    return (
      <Text className={styles.description} typeScale="Body" color="defaultGrey">
        {this.props.children}
      </Text>
    );
  }
}

class Body extends React.Component {
  render() {
    return <div className={styles.body}>{this.props.children}</div>;
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

  renderHeading(heading) {
    if (!heading) {
      return null;
    }
  }

  renderMessage(message) {
    if (!message) {
      return null;
    }
  }

  renderDescription(description) {
    if (!description) {
      return null;
    }
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
    const { size, visible } = this.props;
    let header, heading, message, description, footer, body;
    const children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];
    each(child => {
      const childName = child.type.name;
      if (childName === Header.name) {
        header = child;
      }
      if (childName === Heading.name) {
        heading = child;
      }
      if (childName === Message.name) {
        message = child;
      }
      if (childName === Description.name) {
        description = child;
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

    let baseClass = styles.overlay;
    if (!visible) {
      baseClass += ` ${styles.hidden}`;
    }

    return (
      <div className={baseClass} onClick={this.dismiss}>
        <div className={`${styles.modalWrapper} row center-xs middle-xs`}>
          <div className={gridSize}>
            <div className={styles.modal} onClick={this.modalClick}>
              <ModalContext.Provider value={{ onClose: this.onClose }}>
                {this.renderHeader(header)}
                {this.renderHeading(heading)}
                {this.renderMessage(message)}
                {this.renderDescription(description)}
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
          Heading.name,
          Message.name,
          Description.name,
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
  dismissable: false
};

Modal.Header = Header;
Modal.Heading = Heading;
Modal.Message = Message;
Modal.Description = Description;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
