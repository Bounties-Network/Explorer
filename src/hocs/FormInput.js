import React from 'react';

function FormInputHOC(WrappedComponent) {
  return props => {
    const {
      meta: { touched, error, asyncValidating },
      input
    } = props;
    let componentError = '';
    if (error && touched) {
      componentError = error;
    }
    return (
      <WrappedComponent
        {...props}
        {...input}
        error={componentError}
        loading={asyncValidating}
      />
    );
  };
}

export default FormInputHOC;
