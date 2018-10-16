import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './PageBanner.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class PageBanner extends Component {
  static propTypes = {
    dismissable: PropTypes.bool,
    onClose: PropTypes.func,
    // These sizes correspond to pageWrapper and pageWrapper-large
    size: PropTypes.oneOf(['default', 'large'])
  };

  static defaultProps = {
    dismissable: true,
    size: 'default'
  };

  onClose = () => {
    const node = ReactDOM.findDOMNode(this);
    const height = node.getBoundingClientRect
      ? node.getBoundingClientRect().height
      : 0;

    node.style.height = `${height}px`;

    requestAnimationFrame(() => {
      node.style.height = '0px';
    });

    if (this.props.onClose) this.props.onClose();
  };

  render() {
    const { children, size } = this.props;
    return (
      <div className={`${styles.pageBanner}`}>
        <div
          className={
            size === 'default'
              ? styles.pageBannerWrapper
              : styles['pageBannerWrapper-large']
          }
        >
          {children}
          <FontAwesomeIcon
            icon={['fal', 'times']}
            className={styles.closeIcon}
            onClick={this.onClose}
          />
        </div>
      </div>
    );
  }
}

export default PageBanner;
