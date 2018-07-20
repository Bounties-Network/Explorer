import React from 'react';
import { toast as callToast } from 'react-toastify';
import { ToastContainer } from 'components';

const NOTIFICATION = 'NOTIFICATION';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const TRANSACTION = 'TRANSACTION';

const Toast = (type, message, link) => {
  let icon;
  let messageType;
  if (type === NOTIFICATION) {
    icon = ['far', 'info-circle'];
    messageType = callToast.TYPE.INFO;
  }
  if (type === SUCCESS) {
    icon = ['far', 'check-circle'];
    messageType = callToast.TYPE.SUCCESS;
  }
  if (type === ERROR) {
    icon = ['far', 'exclamation-triangle'];
    messageType = callToast.TYPE.ERROR;
  }
  if (type === TRANSACTION) {
    icon = ['far', 'ellipsis-h'];
    messageType = callToast.TYPE.WARNING;
  }

  callToast(
    <ToastContainer.BaseToast icon={icon} message={message} link={link} />,
    { type: messageType }
  );
};

Toast.TYPE = {
  NOTIFICATION: NOTIFICATION,
  SUCCESS: SUCCESS,
  ERROR: ERROR,
  TRANSACTION: TRANSACTION
};

export default Toast;
