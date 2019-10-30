import React from 'react';
import styles from './CreateBounty.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PageCard } from 'explorer-components';
import { BigNumber } from 'bignumber.js';
import { actions as bountyActions } from 'public-modules/Bounty';
import { actions as tokensActions } from 'public-modules/Tokens';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import CreateBountyForm from './CreateBountyForm';
import { withRouter } from 'react-router-dom';
import {
  getDraftStateSelector,
  getDraftBountySelector,
  getBountyStateSelector,
  getBountySelector
} from 'public-modules/Bounty/selectors';
import moment from 'moment';
import { Loader, ZeroState } from 'components';
import { DIFFICULTY_MAPPINGS } from 'public-modules/Bounty/constants';
import config from 'public-modules/config';
import intl from 'react-intl-universal';
import { Prompt } from 'react-router';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import onBeforeUnloadHandler from 'lib/on-before-unload-handler';

class CreateBountyComponent extends React.Component {
  constructor(props) {
    super(props);
    const { match, getDraft, getBounty, loadTokens, public_address } = props;
    this.state = {
      dirty: false,
      submitNotPressed: true
    };

    loadTokens();

    if (match.path === '/createBounty/draft/:id/') {
      getDraft(match.params.id, public_address);
    }
    if (match.path === '/editBounty/:id/') {
      getBounty(match.params.id);
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', onBeforeUnloadHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload');
  }

  render() {
    const {
      loading,
      error,
      formInitialValues,
      isEditing,
      isDraft
    } = this.props;

    if (loading) {
      return (
        <div className={styles.centeredBody}>
          <Loader size="medium" />
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.centeredBody}>
          <ZeroState
            type="error"
            title={intl.get('sections.create_bounty.zero_state.title')}
            text={intl.get('sections.create_bounty.zero_state.description')}
            icon="error"
          />
        </div>
      );
    }

    const createWhenCondition =
      this.state.dirty && !isEditing && !isDraft && this.state.submitNotPressed;

    const editWhenCondition =
      (this.state.dirty && isEditing && this.state.submitNotPressed) ||
      (this.state.dirty && isDraft && this.state.submitNotPressed);

    return (
      <div>
        {/* Need i18n? */}
        <Prompt
          when={createWhenCondition}
          message={`Changes you made may not be saved.`}
        />
        <Prompt
          when={editWhenCondition}
          message={`Changes you made may not be saved.`}
        />
        <PageCard>
          <PageCard.Header>
            <PageCard.Title>
              {isEditing || isDraft
                ? intl.get('sections.create_bounty.actions.edit')
                : intl.get('sections.create_bounty.actions.create')}
            </PageCard.Title>
          </PageCard.Header>
          <PageCard.Content
            key="createBountyForm"
            className={styles.cardContent}
          >
            <CreateBountyForm
              handleBounty={error => {
                if (error) {
                  console.error('error', error);
                }
                if (!error) {
                  this.setState({ submitNotPressed: false });
                }
              }}
              onChange={() => this.setState({ dirty: true })}
              initialValues={formInitialValues}
              isEditing={isEditing}
              isDraft={isDraft}
            />
          </PageCard.Content>
        </PageCard>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  const user = getCurrentUserSelector(state) || {};
  const getDraftState = getDraftStateSelector(state);
  const getBountyState = getBountyStateSelector(state);

  let draftBounty = {};
  let fulfillment_amount;
  let balance;
  let categories = [];
  let isDraft = false;
  let isEditing = false;
  let error;
  let loading;

  //|| user.uid !== draftBounty.user.uid
  if (router.match.path === '/createBounty/draft/:id/') {
    draftBounty = getDraftBountySelector(state) || {};
    fulfillment_amount = draftBounty.calculated_fulfillment_amount;
    categories = draftBounty.categories;
    isDraft = true;
    error = getDraftState.error;
    loading = getDraftState.loading;
  }
  if (router.match.path === '/editBounty/:id/') {
    draftBounty = getBountySelector(state) || {};
    fulfillment_amount = draftBounty.calculated_fulfillment_amount;
    balance = draftBounty.calculated_balance;
    categories = draftBounty.categories
      ? draftBounty.categories.map(category => {
          return category.normalized_name;
        })
      : [];
    isEditing = true;
    error = getBountyState.error;
    loading = getBountyState.loading;
  }
  if (draftBounty && draftBounty.user && user) {
    error = draftBounty.user.id !== user.id;
  }
  if (
    isEditing &&
    draftBounty.contract_version.split(
      draftBounty.contract_version.indexOf('.')
    )[0] !== '2'
  ) {
    error = true;
  }

  if (typeof fulfillment_amount === 'string') {
    fulfillment_amount = BigNumber(
      draftBounty.calculated_fulfillment_amount,
      10
    ).toString();
  }
  if (typeof balance === 'string') {
    balance = BigNumber(draftBounty.calculated_balance, 10).toString();
  }

  return {
    public_address: user && user.public_address,
    isDraft,
    isEditing,
    error,
    loading,
    formInitialValues: {
      title: draftBounty.title,
      categories: categories,
      description:
        isEditing || isDraft
          ? draftBounty.description
          : intl.get('components.editor.default'),
      experience_level:
        DIFFICULTY_MAPPINGS[draftBounty.experience_level] || 'Beginner',
      revisions: draftBounty.revisions || 3,
      private_fulfillments: draftBounty.private_fulfillments || false,
      fulfillers_need_approval: draftBounty.fulfillers_need_approval || false,
      paysTokens:
        draftBounty.token_version === 20 || !!config.defaultToken || false,
      token_contract:
        draftBounty.token_contract ||
        (config.defaultToken && config.defaultToken.address),
      fulfillment_amount: fulfillment_amount,
      id: draftBounty.id,
      balance: balance,
      issuer_email: draftBounty.issuer_email || user.email || '',
      issuer_name: draftBounty.issuer_name || user.name || '',
      activateNow: !(isDraft || isEditing),
      webReferenceURL: draftBounty.attached_url,
      token_symbol: draftBounty.token_symbol,
      deadline:
        draftBounty.deadline && moment(draftBounty.deadline) > moment()
          ? moment.utc(draftBounty.deadline).local()
          : moment().add(3, 'days')
    }
  };
};

const CreateBounty = compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      getDraft: bountyActions.getDraft,
      getBounty: bountyActions.getBounty,
      loadTokens: tokensActions.loadTokens
    }
  )
)(CreateBountyComponent);

export default CreateBounty;
