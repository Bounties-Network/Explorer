import React from 'react';
import PropTypes from 'prop-types';
import { Pill } from 'components';
import intl from 'react-intl-universal';

const ApplicantStagePill = props => {
  const { applicationStatus, className } = props;

  let text = intl.get('components.applicant_stage.default');
  let textColor = 'white';
  let backgroundColor = 'orange';

  if (applicationStatus === 'A') {
    text = intl.get('components.applicant_stage.accepted');
    backgroundColor = 'green';
  }

  if (applicationStatus === 'R') {
    text = intl.get('components.applicant_stage.declined');
    backgroundColor = 'red';
  }

  if (applicationStatus === 'P') {
    text = intl.get('components.applicant_stage.pending');
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
  applicationStatus: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};

export default ApplicantStagePill;
