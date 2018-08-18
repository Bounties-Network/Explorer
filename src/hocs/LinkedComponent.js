import React from 'react';
import { withRouter } from 'react-router-dom';

function LinkedComponentHOC(WrappedComponent) {
  const LinkedComponent = props => {
    const { history, to } = props;

    const handler = e => {
      e.preventDefault();
      history.push(to);
    };

    return <WrappedComponent {...props} onClick={handler} />;
  };

  return withRouter(LinkedComponent);
}

export default LinkedComponentHOC;
