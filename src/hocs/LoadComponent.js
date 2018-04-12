import React, { Component } from 'react';
import PropTypes from 'prop-types';

function LoadComponent(WrappedComponent) {
  return class Load extends Component {
    static propTypes = {
      load: PropTypes.func.isRequired
    };

    componentWillMount() {
      this.props.load();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default LoadComponent;
