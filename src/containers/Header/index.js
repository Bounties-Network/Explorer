import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';

import { Header } from 'components';

const { authStateSelector, rootAuthSelector } = selectors;

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { loading, error, loginStatus } = this.props;

    return (
      <div>
        <Header loginStatus={loginStatus} />
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  let status = rootAuthSelector(state);
  return {
    status: status.status,
    loginStatus: status.loginStatus,
    ...authStateSelector(state)
  };
};

HeaderComponent.propTypes = {
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.checkLoginStatus, ...actions }),
  LoadComponent('')
)(HeaderComponent);

export default check;
