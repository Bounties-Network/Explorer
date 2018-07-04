import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId, range, map } from 'lodash';
import styles from './Rating.module.scss';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    const uuid = uniqueId();
    this.state = {
      uuid,
      value: null
    };
  }

  onChange = e => {
    const value = e.target.value;
    const { onChange } = this.props;
    this.setState({ value });
    if (onChange) {
      this.props.onChange(e.target.value);
    }
  };

  renderInputs = () => {
    const { uuid, value: stateValue } = this.state;
    const { value, defaultValue } = this.props;

    const checkedValue = Number(value || stateValue || defaultValue);
    const componentSet = [];

    for (let i = 0; i <= 5; i++) {
      let checked = false;
      if (checkedValue === 5 - i) {
        checked = true;
      }
      componentSet.push(
        <input
          key={i + 'input'}
          type="radio"
          id={`${uuid}rating${i}`}
          name="rating"
          checked={checked}
          value={5 - i}
          className={i === 5 ? styles.starClear : null}
          onChange={this.onChange}
        />,
        <label key={i + 'label'} htmlFor={`${uuid}rating${i}`}>
          {5 - i}
        </label>
      );
    }

    return componentSet;
  };

  render() {
    return <span className={styles.starGroup}>{this.renderInputs()}</span>;
  }
}

Rating.propTypes = {
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func
};

Rating.defaultProps = {
  onChange: () => {}
};

export default Rating;
