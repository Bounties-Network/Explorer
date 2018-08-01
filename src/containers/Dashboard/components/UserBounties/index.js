import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import base from '../BaseStyles.module.scss';
import styles from './UserBounties.module.scss';
import { map } from 'lodash';
import { Avatar, Card, ListGroup, Tabs, Text } from 'components';
import { BountyItem } from '../';
import { rootBountiesSelector } from 'public-modules/Bounties/selectors';

class UserBountiesComponent extends React.Component {
  renderBounties = () => {
    return map(bounty => {
      return (
        <ListGroup.ListItem hover>
          <BountyItem
            title={'This is some place holder text and is a long title'}
            submissions={2}
            value={1}
            currency={'ETH'}
            usd_value={450}
            createdAt={''}
          />
        </ListGroup.ListItem>
      );
    }, this.props.bounties);
  };

  render() {
    const { bounties } = this.props;

    return (
      <div className={base.cardContainer}>
        <Card>
          <Card.Header>
            <Card.HeaderTitle>My bounties</Card.HeaderTitle>
            <Card.HeaderTabs onSelect={() => {}}>
              <Tabs.Tab tabColor="green" eventKey={1}>
                Active
              </Tabs.Tab>
              <Tabs.Tab tabColor="blue" eventKey={2}>
                Drafts
              </Tabs.Tab>
            </Card.HeaderTabs>
          </Card.Header>
          <Card.Body>
            <ListGroup>{this.renderBounties()}</ListGroup>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const bountyState = rootBountiesSelector(state);

  return {
    bounties: bountyState.bounties,
    count: bountyState.count,
    offset: bountyState.offset,
    loading: bountyState.loading,
    loadingMore: bountyState.loadingMore,
    error: bountyState.error
  };
};

const UserBounties = compose(
  connect(
    mapStateToProps,
    {}
  )(UserBountiesComponent)
);

export default UserBounties;
