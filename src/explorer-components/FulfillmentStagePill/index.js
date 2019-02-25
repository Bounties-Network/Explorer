import React from 'react';
import PropTypes from 'prop-types';
import { Pill } from 'components';
import { DEAD, COMPLETED } from 'public-modules/Bounty/constants';

const FulfillmentStagePill = props => {
  const { bountyStage, accepted, className } = props;

  let text;
  let backgroundColor;
  let textColor = 'white';

  if (accepted) {
    text = 'Accepted';
    backgroundColor = 'green';
  } else if (!accepted && (bountyStage === COMPLETED || bountyStage === DEAD)) {
    text = 'Not Accepted';
    backgroundColor = 'orange';
  } else {
    return null;
  }

  return (
    <Pill
      className={className}
      textColor={textColor}
      backgroundColor={backgroundColor}
      noBorder
    >
      {text}
    </Pill>
  );
};

FulfillmentStagePill.propTypes = {
  accepted: PropTypes.bool,
  bountyStage: PropTypes.number,
  className: PropTypes.string
};

export default FulfillmentStagePill;
