import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { curry } from 'lodash';
import { TransactionWalkthrough } from 'explorer-components';
import { actions } from 'public-modules/Transaction';
import { rootTransactionSelector } from 'public-modules/Transaction/selectors';
import { withRouter } from 'react-router-dom';

function TransactionWalkthroughHOC(config, WrappedComponent) {
  class TransactionWalkthroughComponent extends React.Component {
    state = {
      onConfirm: () => {}
    };

    initiateWalkthrough = onConfirm => {
      const { initiateWalkthrough } = this.props;

      this.setState(
        {
          onConfirm
        },
        () => initiateWalkthrough()
      );
    };

    render() {
      const { visible, stage, history, onClose, onDismiss } = this.props;

      const { onConfirm } = this.state;

      return (
        <div className={config.wrapperClassName}>
          <TransactionWalkthrough
            visible={visible}
            stage={stage}
            onClose={onClose}
            onConfirm={onConfirm}
            toDashboard={() => {
              onClose();
              history.push('/dashboard');
            }}
            dismissable={config.dismissable}
            pendingReceiptText={config.pendingReceiptText}
            pendingWalletText={config.pendingWalletText}
          />
          <WrappedComponent
            {...this.props}
            initiateWalkthrough={this.initiateWalkthrough}
          />
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    const transactionState = rootTransactionSelector(state);

    return {
      visible: transactionState.walkthroughVisible,
      stage: transactionState.walkthroughStage
    };
  };

  return compose(
    withRouter,
    connect(
      mapStateToProps,
      {
        initiateWalkthrough: actions.initiateWalkthrough,
        onClose: actions.closeWalkthrough
      }
    )
  )(TransactionWalkthroughComponent);
}

export default curry(TransactionWalkthroughHOC);
