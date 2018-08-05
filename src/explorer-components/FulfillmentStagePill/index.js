import React from 'react';
import PropTypes from 'prop-types';
import { Pill } from 'components';

const FulfillmentStagePill = props => {
  const { accepted } = props;

  let text = 'Pending Acceptance';
  let textColor = 'white';
  let backgroundColor = 'orange';

  if (accepted) {
    text = 'Accepted';
    backgroundColor = 'green';
  }

  return (
    <Pill textColor={textColor} backgroundColor={backgroundColor} noBorder>
      {text}
    </Pill>
  );
};

FulfillmentStagePill.propTypes = {
  accepted: PropTypes.bool
};

export default FulfillmentStagePill;
