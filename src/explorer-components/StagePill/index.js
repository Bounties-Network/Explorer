import React from 'react';
import PropTypes from 'prop-types';
import { Pill } from 'components';
import {
  DRAFT,
  ACTIVE,
  DEAD,
  COMPLETED,
  EXPIRED,
  STAGE_VALUES
} from 'public-modules/Bounty/constants';

const StagePill = props => {
  const { stage } = props;

  let textColor = 'white';
  let backgroundColor = 'green';

  if (stage === DRAFT) {
    backgroundColor = 'orange';
  }

  if (stage === ACTIVE) {
    backgroundColor = 'green';
  }

  if (stage === DEAD) {
    backgroundColor = 'blue';
  }

  if (stage === EXPIRED) {
    backgroundColor = 'red';
  }

  if (stage === COMPLETED) {
    backgroundColor = 'purple';
  }

  return (
    <Pill textColor={textColor} backgroundColor={backgroundColor} noBorder>
      {STAGE_VALUES[stage]}
    </Pill>
  );
};

StagePill.propTypes = {
  stage: PropTypes.oneOf([DRAFT, ACTIVE, DEAD, COMPLETED, EXPIRED])
};

export default StagePill;
