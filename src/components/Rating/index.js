import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId, range, map } from 'lodash';
import styles from './Rating.module.scss';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    const uuid = uniqueId();
    this.state = {
      uuid
    };
  }

  onChange = () => {};

  renderInputs = () => {
    const { uuid } = this.state;
    const componentSet = [];

    for (let i = 0; i <= 5; i++) {
      componentSet.push(
        <input
          key={i + 'input'}
          type="radio"
          id={`${uuid}rating${i}`}
          name="rating"
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

export default Rating;
