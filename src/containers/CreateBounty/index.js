import React from 'react';
import styles from './CreateBounty.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PageCard } from 'explorer-components';
import { BigNumber } from 'bignumber.js';
import { formValueSelector } from 'redux-form';
import { actions as bountyActions } from 'public-modules/Bounty';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import CreateBountyForm from './CreateBountyForm';
import {
  getDraftStateSelector,
  getDraftBountySelector
} from 'public-modules/Bounty/selectors';
import moment from 'moment';
import { Loader, ZeroState } from 'components';
import { DEFAULT_MARKDOWN } from 'utils/constants';
import { DRAFT_DIFFICULTY_MAPPINGS } from './constants';

class CreateBountyComponent extends React.Component {
  componentWillMount() {
    const { match, getDraft } = this.props;

    if (match.path === '/createBounty/draft/:id/') {
      getDraft(match.params.id);
    }
  }

  render() {
    const { draftLoading, formInitialValues, draftError } = this.props;

    if (draftLoading) {
      return (
        <div className={styles.centeredBody}>
          <Loader size="medium" />
        </div>
      );
    }

    if (draftError) {
      return (
        <div className={styles.centeredBody}>
          <ZeroState
            type="error"
            iconColor="red"
            title="Could not find that bounty"
            text="Try refreshing, or make sure your url is correct"
            icon={['far', 'exclamation-triangle']}
          />
        </div>
      );
    }

    return (
      <PageCard>
        <PageCard.Header>
          <PageCard.Title>Create Bounty</PageCard.Title>
        </PageCard.Header>
        <PageCard.Content className={styles.cardContent}>
          <CreateBountyForm initialValues={formInitialValues} />
        </PageCard.Content>
      </PageCard>
    );
  }
}

const mapStateToProps = state => {
  const user = getCurrentUserSelector(state) || {};
  const getDraftState = getDraftStateSelector(state);
  const draftBounty = getDraftBountySelector(state) || {};

  return {
    draftError: getDraftState.error,
    draftLoading: getDraftState.loading,
    formInitialValues: {
      title: draftBounty.title,
      categories: draftBounty.categories,
      description: draftBounty.description || DEFAULT_MARKDOWN,
      experienceLevel:
        DRAFT_DIFFICULTY_MAPPINGS[draftBounty.experienceLevel] || 'Beginner',
      revisions: draftBounty.revisions || 3,
      paysTokens: draftBounty.paysTokens || false,
      tokenContract: draftBounty.tokenContract,
      fulfillmentAmount: BigNumber(
        draftBounty.calculated_fulfillmentAmount,
        10
      ).toString(),
      activateNow: true,
      issuer_email: user.email || '',
      issuer_name: user.name || '',
      deadline: (moment(draftBounty.deadline) || moment()).add(1, 'days').utc()
    }
  };
};

const CreateBounty = connect(
  mapStateToProps,
  { getDraft: bountyActions.getDraft }
)(CreateBountyComponent);

export default CreateBounty;
