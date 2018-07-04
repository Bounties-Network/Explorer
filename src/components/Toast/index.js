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
    icon = ['fal', 'info-circle'];
    messageType = callToast.TYPE.INFO;
  }
  if (type === SUCCESS) {
    icon = ['fal', 'check-circle'];
    messageType = callToast.TYPE.SUCCESS;
  }
  if (type === ERROR) {
    icon = ['fal', 'exclamation-triangle'];
    messageType = callToast.TYPE.ERROR;
  }
  if (type === TRANSACTION) {
    icon = ['fal', 'ellipsis-h'];
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
