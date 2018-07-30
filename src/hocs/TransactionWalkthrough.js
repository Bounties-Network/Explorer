import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { TransactionWalkthrough } from 'explorer-components';
import { actions } from 'public-modules/Bounty';
import { rootTransactionSelector } from 'public-modules/Bounty/selectors';
import { withRouter } from 'react-router-dom';

function TransactionWalkthroughHOC(WrappedComponent, config = {}) {
  class TransactionWalkthrough extends Component {
    render() {
      const {
        visible,
        stage,
        initiateWalkthrough,
        closeWalkthrough
      } = this.props;

      return (
        <div className={config.wrapperClassName}>
          <TransactionWalkthrough
            visible={visible}
            stage={stage}
            closeWalkthrough={closeWalkthrough}
          />
          <WrappedComponent
            {...this.props}
            initiateWalkthrough={initiateWalkthrough}
          />
        </div>
      );
    }
  }

  TransactionWalkthrough.proptypes = {};

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
        closeWalkthrough: actions.closeWalkthrough
      }
    )
  )(TransactionWalkthrough);
}

export default TransactionWalkthroughHOC;
