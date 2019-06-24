import React from 'react';
import PropTypes from 'prop-types';
import { Pill } from 'components';
import { DEAD, COMPLETED } from 'public-modules/Bounty/constants';
import intl from 'react-intl-universal';

const FulfillmentStagePill = props => {
  const { bounty_stage, accepted, className } = props;

  let text;
  let backgroundColor;
  let textColor = 'white';
  if (accepted) {
    text = intl.get('components.fulfillment_stage.accepted');
    backgroundColor = 'green';
  } else if (
    !accepted &&
    (bounty_stage === COMPLETED || bounty_stage === DEAD)
  ) {
    text = intl.get('components.fulfillment_stage.not_accepted');
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
  bounty_stage: PropTypes.number,
  className: PropTypes.string
};

export default FulfillmentStagePill;
