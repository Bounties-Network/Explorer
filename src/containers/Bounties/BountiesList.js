import React from 'react';
import PropTypes from 'prop-types';

const BountiesList = props => {
  const { bounties } = props;
  return bounties.map((bounty, idx) => <div key={idx}>{bounty.title}</div>);
};

BountiesList.propTypes = {
  bounties: PropTypes.array
};

export default BountiesList;
