import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageBanner.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition } from 'react-transition-group';
import { faTimes } from '@fortawesome/pro-light-svg-icons';

const PageBanner = props => {
  const {
    visible,
    children,
    wrapClass,
    className,
    dismissable,
    onClose
  } = props;

  const onExit = node => {
    const height = node.getBoundingClientRect().height;

    node.style.height = `${height}px`;

    // <Transition> component onExiting would be most appropriate for this but
    // it does not happen in the next animation frame - meaning the css
    // transition does not take effect and no animation of height happens.
    requestAnimationFrame(() => {
      node.style.height = '0px';
    });
  };

  return (
    <Transition
      in={visible}
      enter={false}
      onExit={onExit}
      unmountOnExit={true}
      timeout={200}
    >
      <div
        className={`${className} ${styles.pageBanner} ${
          styles[dismissable ? 'pageBanner-dismissable' : '']
        }`}
      >
        <div className={`${wrapClass}`}>
          <div className={`${styles.pageBannerWrapper}`}>
            <div className={`${styles.pageBannerContent}`}>{children}</div>
            {dismissable && (
              <div className={`${styles.pageBannerClose}`}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className={styles.closeIcon}
                  onClick={onClose}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Transition>
  );
};

PageBanner.propTypes = {
  visible: PropTypes.bool,
  className: PropTypes.string,
  dismissable: PropTypes.bool,
  onClose: PropTypes.func,
  wrapClass: PropTypes.string
};

PageBanner.defaultProps = {
  visible: true,
  dismissable: true,
  wrapClass: 'pageWrapper',
  onClose: () => {}
};

export default PageBanner;
