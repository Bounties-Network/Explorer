import React from 'react';
import PropTypes from 'prop-types';
// import styles from './ToggleSwitch.module.scss';

import { SwitchModule } from 'components';

class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false
    };
  }

  componentDidMount() {
    let { active } = this.props;

    this.setState({ switched: active });
  }

  toggleSwitch = history => {
    this.props.onClick();
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
  onClick: PropTypes.func
};

ToggleSwitch.defaultProps = {
  offOption: '',
  onOption: '',
  onClick: () => {}
};

export default ToggleSwitch;
