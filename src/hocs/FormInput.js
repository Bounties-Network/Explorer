import React from 'react';

function FormInputHOC(WrappedComponent, type = 'redux-form') {
  return props => {
    if (type === 'formik') {
      const {
        field, // { name, value, onChange, onBlur }
        form: { errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        loading
      } = props;

      return (
        <WrappedComponent
          {...props}
          {...field}
          // overwrite default onChange because our components return the value instead of event
          onChange={v =>
            field.onChange({ target: { id: field.name, value: v, type: '' } })
          }
          error={errors[field.name]}
          loading={loading}
        />
      );
    }

    // otherwise -> redux form style
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
