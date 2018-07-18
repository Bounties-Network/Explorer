import React from 'react';
import styles from './Login.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'components';
import { rootLoginSelector } from './selectors';

const LoginComponent = props => {
  const { visible, stage } = props;

  return <div>login</div>;
};

const mapStateToProps = state => {
  const rootLogin = rootLoginSelector(state);

  return {
    visible: rootLogin.visible,
    stage: rootLogin.stage
  };
};

const Login = compose(connect(mapStateToProps))(LoginComponent);

export default Login;
