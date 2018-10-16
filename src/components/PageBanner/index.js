import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './PageBanner.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const PageBanner = props => {
  const { children, wrapClass } = props;

  const onClose = () => {
    const node = ReactDOM.findDOMNode(this);
    const height = node.getBoundingClientRect
      ? node.getBoundingClientRect().height
      : 0;

    node.style.height = `${height}px`;

    requestAnimationFrame(() => {
      node.style.height = '0px';
    });

    if (props.onClose) props.onClose();
  };

  return (
    <div className={`${styles.pageBanner}`}>
      <div className={`${wrapClass}`}>
        <div className={`${styles.pageBannerWrapper}`}>
          <div className={`${styles.pageBannerContent}`}>{children}</div>
          <FontAwesomeIcon
            icon={['fal', 'times']}
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

PageBanner.propTypes = {
  dismissable: PropTypes.bool,
  onClose: PropTypes.func,
  wrapClass: PropTypes.string
};

PageBanner.defaultProps = {
  dismissable: true,
  wrapClass: 'pageBannerWrapper'
};

export default PageBanner;
