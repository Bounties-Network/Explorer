import React from 'react';
import PropTypes from 'prop-types';
import styles from './ToastContainer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from 'components';
import { ToastContainer as ToastWrapper } from 'react-toastify';
import { faTimes } from '@fortawesome/pro-light-svg-icons';

const BaseToast = props => {
  const { icon, message, link } = props;

  return (
    <div className={styles.baseToast}>
      <div className={styles.messageSection}>
        <i className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </i>
        <Text color="white" typeScale="Body" className={styles.message}>
          {message}
        </Text>
      </div>
      <div className={styles.linkSection}>{link}</div>
    </div>
  );
};

const CloseIcon = props => {
  return (
    <i className={styles.closeIcon}>
      <FontAwesomeIcon icon={faTimes} />
    </i>
  );
};

BaseToast.propTypes = {
  icon: PropTypes.array,
  message: PropTypes.string,
  link: PropTypes.node,
  onClose: PropTypes.func
};

const ToastContainer = props => {
  return (
    <ToastWrapper
      newestOnTop
      autoClose={15000}
      pauseOnFocusLoss={false}
      hideProgressBar
      draggable
      closeButton={<CloseIcon />}
    />
  );
};

ToastContainer.BaseToast = BaseToast;

export default ToastContainer;
