import React, { Component } from 'react';
import { curry } from 'lodash';

function FetchComponent(fetch, WrappedComponent) {
  return class Fetch extends Component {
    componentDidMount() {
      if (process.env.SSR) {
        return fetch();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default curry(FetchComponent);
