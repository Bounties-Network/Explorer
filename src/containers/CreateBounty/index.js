import React from 'react';
import styles from './CreateBounty.module.scss';
import { connect } from 'react-redux';
import { PageCard } from 'explorer-components';
import { BigNumber } from 'bignumber.js';
import { actions as bountyActions } from 'public-modules/Bounty';
import { actions as tokensActions } from 'public-modules/Tokens';
import { change } from 'redux-form';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import CreateBountyForm from './CreateBountyForm';
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
import NavigationPrompt from 'react-router-navigation-prompt';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

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

  render() {
    const {
      loading,
      error,
      formInitialValues,
      isEditing,
      isDraft,
      change
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

    var prompter = undefined;
    if (
      this.state.dirty &&
      !isEditing &&
      !isDraft &&
      this.state.submitNotPressed
    ) {
      prompter = (
        <NavigationPrompt
          renderIfNotActive={false}
          when={(crntLocation, nextLocation) =>
            !nextLocation ||
            !nextLocation.pathname.startsWith(crntLocation.pathname)
          }
        >
          {({ isActive, onCancel, onConfirm }) => {
            if (isActive) {
              return (
                <Modal
                  dismissable
                  size="medium"
                  fixed
                  visible={true}
                  onClose={onCancel}
                >
                  <Modal.Header closable>
                    <Modal.Message>
                      {intl.get(
                        'sections.bounty.modals.unsaved_changes.new_bounty.title'
                      )}
                    </Modal.Message>
                  </Modal.Header>
                  <Modal.Body>
                    <Modal.Description>
                      {intl.get(
                        'sections.bounty.modals.unsaved_changes.new_bounty.description'
                      )}
                    </Modal.Description>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="margin"
                      margin
                      fitwidth
                      onClick={onCancel}
                    >
                      {intl.get('actions.cancel')}
                    </Button>
                    <Button type="destructive" onClick={onConfirm}>
                      {intl.get('actions.discard_changes')}
                    </Button>
                  </Modal.Footer>
                </Modal>
              );
            }
          }}
        </NavigationPrompt>
      );
    } else if (
      (this.state.dirty && isEditing && this.state.submitNotPressed) ||
      (this.state.dirty && isDraft && this.state.submitNotPressed)
    ) {
      prompter = (
        <NavigationPrompt
          renderIfNotActive={false}
          when={(crntLocation, nextLocation) =>
            !nextLocation ||
            !nextLocation.pathname.startsWith(crntLocation.pathname)
          }
        >
          {({ isActive, onCancel, onConfirm }) => {
            if (isActive) {
              return (
                <Modal
                  dismissable
                  size="medium"
                  fixed
                  visible={true}
                  onClose={onCancel}
                >
                  <Modal.Header closable>
                    <Modal.Message>
                      {intl.get(
                        'sections.bounty.modals.unsaved_changes.draft_or_edit_bounty.title'
                      )}
                    </Modal.Message>
                  </Modal.Header>
                  <Modal.Body>
                    <Modal.Description>
                      {intl.get(
                        'sections.bounty.modals.unsaved_changes.draft_or_edit_bounty.description'
                      )}
                    </Modal.Description>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="margin"
                      margin
                      fitwidth
                      onClick={onCancel}
                    >
                      {intl.get('actions.cancel')}
                    </Button>
                    <Button type="destructive" onClick={onConfirm}>
                      {intl.get('actions.discard_changes')}
                    </Button>
                  </Modal.Footer>
                </Modal>
              );
            }
          }}
        </NavigationPrompt>
      );
    }

    return (
      <div>
        {prompter}
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
                console.log('error', error);
                if (!error) {
                  this.setState({ submitNotPressed: false });
                }
              }}
              onChange={() => this.setState({ dirty: true })}
              initialValues={formInitialValues}
              change={change}
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
  if (isEditing && draftBounty.contract_version !== 2) {
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
        draftBounty.description || intl.get('components.editor.default'),
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

const CreateBounty = connect(
  mapStateToProps,
  {
    getDraft: bountyActions.getDraft,
    getBounty: bountyActions.getBounty,
    loadTokens: tokensActions.loadTokens,
    change
  }
)(CreateBountyComponent);

export default CreateBounty;
