import React, { Component } from 'react';
import PropTypes from 'prop-types';

function ModalFormReset(WrappedComponent) {
  return class ModalFormResetComponent extends Component {
    componentDidUpdate(prevProps) {
      if (!prevProps.visible && this.props.visible) {
        if (this.props.initialValues) {
          return this.props.initialize(this.props.initialValues);
        }
        return this.props.initialize();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default ModalFormReset;
