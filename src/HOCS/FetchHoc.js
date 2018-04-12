import React, { Component } from 'react';
import PropTypes from 'prop-types';

function FetchComponent(WrappedComponent) {
  return class Fetch extends Component {
    static propTypes = {
      fetch: PropTypes.func.isRequired
    };

    componentWillMount() {
      return this.props.fetch();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default FetchComponent;
