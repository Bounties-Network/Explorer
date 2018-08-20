import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { curry } from 'lodash';
import { TransactionWalkthrough } from 'explorer-components';
import { actions } from 'public-modules/Transaction';
import {
  rootTransactionSelector,
  pendingReceiptHashSelector,
  getTransactionSelector
} from 'public-modules/Transaction/selectors';
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

    componentWillUnmount() {
      this.props.onClose();
    }

    render() {
      const {
        visible,
        stage,
        history,
        onClose,
        transaction
      } = this.props;

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
            transaction={transaction}
            dismissable={config.dismissable}
            pendingReceiptText={config.pendingReceiptText}
            pendingWalletText={config.pendingWalletText}
            successLink={transaction.link}
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
    const pendingReceipt = pendingReceiptHashSelector(state);
    const transaction = getTransactionSelector(pendingReceipt)(state);

    return {
      visible: transactionState.walkthroughVisible,
      stage: transactionState.walkthroughStage,
      transaction: transaction || {}
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
