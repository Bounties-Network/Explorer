import React, { Component } from 'react';

function FormInputHOC(WrappedComponent) {
  return props => {
    const {
      meta: { touched, error },
      input
    } = props;
    let componentError = '';
    if (error && touched) {
      componentError = error;
    }
    return <WrappedComponent {...props} {...input} error={componentError} />;
  };
}

export default FormInputHOC;
