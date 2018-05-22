import React from 'react';
import PropTypes from 'prop-types';
import styles from './ToggleSwitch.module.scss';

import { SwitchModule } from 'components';

class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false
    };
  }

  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };

  render() {
    const { offOption, onOption } = this.props;

    return (
      <div>
        <SwitchModule
          onClick={this.toggleSwitch}
          on={this.state.switched}
          offOption={offOption}
          onOption={onOption}
        >
          {this.state.switched ? onOption : offOption}
        </SwitchModule>
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  offOption: PropTypes.str,
  onOption: PropTypes.str
};

ToggleSwitch.defaultProps = {
  offOption: '',
  onOption: ''
};

export default ToggleSwitch;
