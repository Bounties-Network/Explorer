import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './Switch.css';

const propTypes = {
  on: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
  className: PropTypes.string
};

const defaultProps = {
  enabled: true,
  className: '',
  onDisabledClick: () => {}
};

function SwitchModule({
  on,
  onClick,
  onDisabledClick,
  enabled,
  className,
  children,
  offOption,
  onOption
}) {
  const classes = [
    'switch',
    className,
    on ? 'on ' : '',
    enabled ? '' : 'disabled '
  ].join(' ');
  return (
    <div
      className={classes}
      onClick={e => (enabled ? onClick(e) : onDisabledClick(e))}
    >
      <div className="optionText">
        <div>{offOption}</div>
        <div>{onOption}</div>
      </div>
      <div className="switch-toggle" children={children} />
    </div>
  );
}

SwitchModule.propTypes = propTypes;
SwitchModule.defaultProps = defaultProps;

export default SwitchModule;
