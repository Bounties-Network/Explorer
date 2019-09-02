import React from 'react';
import { toast as callToast } from 'react-toastify';
import { ToastContainer } from 'components';
import { faInfoCircle, faEllipsisH } from '@fortawesome/pro-regular-svg-icons';
import {
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/pro-light-svg-icons';

const NOTIFICATION = 'NOTIFICATION';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const TRANSACTION = 'TRANSACTION';

const Toast = (type, message, link, onClose) => {
  let icon;
  let messageType;
  if (type === NOTIFICATION) {
    icon = faInfoCircle;
    messageType = callToast.TYPE.INFO;
  }
  if (type === SUCCESS) {
    icon = faCheckCircle;
    messageType = callToast.TYPE.SUCCESS;
  }
  if (type === ERROR) {
    icon = faExclamationTriangle;
    messageType = callToast.TYPE.ERROR;
  }
  if (type === TRANSACTION) {
    icon = faEllipsisH;
    messageType = callToast.TYPE.WARNING;
  }

  return callToast(
    <ToastContainer.BaseToast icon={icon} message={message} link={link} />,
    {
      type: messageType,
      onClose
    }
  );
};

Toast.TYPE = {
  NOTIFICATION: NOTIFICATION,
  SUCCESS: SUCCESS,
  ERROR: ERROR,
  TRANSACTION: TRANSACTION
};

export default Toast;
