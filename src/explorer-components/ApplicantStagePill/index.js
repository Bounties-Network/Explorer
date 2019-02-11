import React from 'react';
import PropTypes from 'prop-types';
import { Pill } from 'components';
import { DEAD, COMPLETED } from 'public-modules/Bounty/constants';

const ApplicantStagePill = props => {
  const { applicationStatus, className } = props;

  let text = 'Pending acceptance';
  let textColor = 'white';
  let backgroundColor = 'orange';

  if (applicationStatus === 'A') {
    text = 'Accepted';
    backgroundColor = 'green';
  }

  if (applicationStatus === 'R') {
    text = 'Declined';
    backgroundColor = 'red';
  }

  if (applicationStatus === 'P') {
    text = 'Pending';
    backgroundColor = 'orange';
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

ApplicantStagePill.propTypes = {
  applicationStatus: PropTypes.number,
  className: PropTypes.string
};

export default ApplicantStagePill;
