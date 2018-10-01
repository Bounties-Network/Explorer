import React from 'react';

function FormInputHOC(WrappedComponent) {
  return props => {
    const {
      meta: { touched, error, asyncValidating },
      input
    } = props;
    let componentError,
      componentLoading = '';
    if (touched) {
      componentError = error;
      componentLoading = asyncValidating;
    }

    return (
      <WrappedComponent
        {...props}
        {...input}
        error={componentError}
        loading={componentLoading}
      />
    );
  };
}

export default FormInputHOC;
