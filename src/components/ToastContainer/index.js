import React from 'react';
import PropTypes from 'prop-types';
import styles from './ToastContainer.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text } from 'components';
import { ToastContainer as ToastWrapper, toast } from 'react-toastify';

const BaseToast = props => {
  const { icon, message, link } = props;

  return (
    <div className={styles.baseToast}>
      <div className={styles.messageSection}>
        <Text color="white" type="BodySmall" className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </Text>
        <Text color="white" type="BodySmall" className={styles.message}>
          {message}
        </Text>
      </div>
      <div className={styles.linkSection}>
        <Text
          color="white"
          type="BodySmall"
          link="link"
          className={styles.link}
        >
          {link}
        </Text>
      </div>
    </div>
  );
};

const CloseIcon = props => {
  const { closeToast } = props;

  return (
    <Text color="white" type="Body">
      <FontAwesomeIcon icon={['fal', 'times']} />
    </Text>
  );
};

BaseToast.propTypes = {
  icon: PropTypes.array,
  message: PropTypes.string,
  link: PropTypes.string
};

const ToastContainer = props => {
  return (
    <ToastWrapper
      newestOnTop
      autoClose={false}
      hideProgressBar
      draggable
      closeButton={<CloseIcon />}
    />
  );
};

ToastContainer.BaseToast = BaseToast;

export default ToastContainer;
