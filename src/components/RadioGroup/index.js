import React from 'react';
import PropTypes from 'prop-types';
import styles from './RadioGroup.module.scss';

import { Text } from 'components';

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: this.props.options[0]
    };

    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.renderRadioButtons = this.renderRadioButtons.bind(this);
  }

  onSelectionChange(selection) {
    this.setState({ selection: selection }, () => {
      this.props.onChange(selection);
    });
  }

  renderRadioButtons(data) {
    return data.map((elem, idx) => {
      return (
        <label key={'radio' + idx} className={`${styles.radioContainer}`}>
          <input
            className={`${styles.radio}`}
            type="radio"
            checked={this.state.selection === elem}
            onChange={() => this.onSelectionChange(elem)}
          />{' '}
          <span className={`${styles.customRadio}`} />
          <Text
            style="Body"
            color={this.state.selection === elem ? 'blue' : 'darkGrey'}
          >
            {elem}
          </Text>{' '}
        </label>
      );
    });
  }

  render() {
    const { className, options } = this.props;
    const { selection } = this.state;

    return (
      <div className={`${styles.radioGroup} ${className}`}>
        <div className={`${styles.stagesBody}`}>
          {this.renderRadioButtons(options)}
        </div>
      </div>
    );
  }
}

RadioGroup.propTypes = {
  onChange: PropTypes.func
};

RadioGroup.defaultProps = {
  onChange: () => {},
  options: []
};

export default RadioGroup;
