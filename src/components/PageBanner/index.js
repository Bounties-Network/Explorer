import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageBanner.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { isFunction } from 'lodash';

const PageBanner = props => {
  const { children, wrapClass, className, dismissable } = props;

  let elemRef = React.createRef();

  const onClose = () => {
    const node = elemRef.current;
    const height = node.getBoundingClientRect().height;

    node.style.height = `${height}px`;

    // allow time for height set to take effect for css transition to work properly.
    requestAnimationFrame(() => {
      node.style.height = '0px';
    });

    if (isFunction(props.onClose)) props.onClose();
  };

  return (
    <div
      className={`${className} ${styles.pageBanner} ${
        styles[dismissable ? 'pageBanner-dismissable' : '']
      }`}
      ref={elemRef}
    >
      <div className={`${wrapClass}`}>
        <div className={`${styles.pageBannerWrapper}`}>
          <div className={`${styles.pageBannerContent}`}>{children}</div>
          {dismissable && (
            <div className={`${styles.pageBannerClose}`}>
              <FontAwesomeIcon
                icon={['fal', 'times']}
                className={styles.closeIcon}
                onClick={onClose}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PageBanner.propTypes = {
  className: PropTypes.string,
  dismissable: PropTypes.bool,
  onClose: PropTypes.func,
  wrapClass: PropTypes.string
};

PageBanner.defaultProps = {
  dismissable: true,
  wrapClass: 'pageWrapper'
};

export default PageBanner;
