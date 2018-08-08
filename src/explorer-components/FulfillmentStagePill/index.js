import React from 'react';
import PropTypes from 'prop-types';
import { Pill } from 'components';

const FulfillmentStagePill = props => {
  const { accepted, className } = props;

  let text = 'Pending acceptance';
  let textColor = 'white';
  let backgroundColor = 'orange';

  if (accepted) {
    text = 'Accepted';
    backgroundColor = 'green';
  }

  return (
    <div className={className}>
      <Pill textColor={textColor} backgroundColor={backgroundColor} noBorder>
        {text}
      </Pill>
    </div>
  );
};

FulfillmentStagePill.propTypes = {
  accepted: PropTypes.bool,
  className: PropTypes.string
};

export default FulfillmentStagePill;
