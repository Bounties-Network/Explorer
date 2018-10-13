import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components';
import { startCase } from 'lodash';
import styles from './PageBanner.module.scss';

const PageBanner = props => {
  const {
    visible,
    height,
    size,
    margin,
    background,
    onClose,
    customClass
  } = props;

  const marginClass =
    margin === 'default' ? '' : 'pageBannerMargin' + startCase(margin);
  const sizeClass =
    size === 'default' ? '' : 'pageBannerSize' + startCase(size);
  const heightClass =
    height === 'default' ? '' : 'pageBannerHeight' + startCase(height);

  const closeButton = (
    <span className={styles.pageBannerCloseButton}>
      <Button onClick={onClose} type="link">
        x
      </Button>
      <span />
    </span>
  );

  const pageBanner = (
    <div
      className={`
      ${styles.pageBanner} ${styles[background]}
      ${marginClass ? styles[marginClass] : ''} 
      ${sizeClass ? styles[sizeClass] : ''} 
      ${heightClass ? styles[heightClass] : ''} 
      ${customClass ? customClass : ''}
    `}
    >
      {props.children}
      {onClose && closeButton}
    </div>
  );

  return <Fragment>{visible && pageBanner}</Fragment>;
};

PageBanner.propTypes = {
  visible: PropTypes.bool,
  background: PropTypes.string,
  height: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  margin: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  onClose: PropTypes.func,
  customClass: PropTypes.string
};

PageBanner.defaultProps = {
  visible: true,
  height: 'default',
  size: 'default',
  margin: 'default',
  background: 'lightGrey'
};

export default PageBanner;
