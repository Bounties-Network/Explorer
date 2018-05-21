import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import BountiesList from './BountiesList';
import { actions, sagas, selectors } from 'public-modules';

const { bountiesStateSelector, rootBountiesSelector } = selectors;

const Bounties = props => {
  const { loading, count, error } = props;
  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  return (
    <div>
      <div>COUNT: {count}</div>
      <BountiesList bounties={props.bounties} />
    </div>
  );
};

const mapStateToProps = (state, router) => {
  let bountiesState = rootBountiesSelector(state);

  return {
    bounties: bountiesState.bounties,
    count: bountiesState.count,
    ...bountiesStateSelector(state)
  };
};

Bounties.propTypes = {
  bounties: PropTypes.array,
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadBounties }),
  LoadComponent('')
)(Bounties);

export default check;
