import React from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.module.scss';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  toggleState = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { checked } = this.state;

    return (
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          value
          checked={checked}
          onChange={this.toggleState}
        />
      </div>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string
};

Checkbox.defaultProps = {};

export default Checkbox;
