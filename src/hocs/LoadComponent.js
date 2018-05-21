import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { curry } from 'lodash';

function LoadComponent(initiatorProp, WrappedComponent) {
  return class Load extends Component {
    static propTypes = {
      load: PropTypes.func.isRequired
    };

    componentWillMount() {
      if (initiatorProp) {
        this.props.load(this.props[initiatorProp]);
      } else {
        this.props.load();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default curry(LoadComponent);
