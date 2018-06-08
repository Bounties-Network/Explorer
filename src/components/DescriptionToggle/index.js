import React from 'react';
import PropTypes from 'prop-types';
import styles from './DescriptionToggle.module.scss';
import Switch from 'react-switch';

import { Text } from 'components';

class DescriptionToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };

    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  componentDidMount() {
    this.setState({ checked: this.props.default });
  }

  toggleSwitch() {
    this.setState({ checked: !this.state.checked }, () => {
      this.props.onClick(this.state.checked);
    });
  }

  render() {
    const { className, children } = this.props;

    return (
      <div className={`${styles.descriptionToggle} ${className}`}>
        <div className={`${styles.descriptionText}`}>
          <Text style="CardHeading" color="grey">
            {children}
          </Text>
        </div>
        <div className={`${styles.toggle}`}>
          <Switch
            onChange={this.toggleSwitch}
            checked={this.state.checked}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        </div>
      </div>
    );
  }
}

DescriptionToggle.propTypes = {
  onChange: PropTypes.func
};

DescriptionToggle.defaultProps = {
  default: false,
  onChange: () => {}
};

export default DescriptionToggle;
