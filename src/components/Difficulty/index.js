import React from 'react';
import PropTypes from 'prop-types';
import styles from './Difficulty.module.scss';

import { Text } from 'components';

import './Difficulty.css';

class Difficulty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      difficulty: 'beginner'
    };

    this.onDifficultyChange = this.onDifficultyChange.bind(this);
  }

  onDifficultyChange(difficulty) {
    this.setState({ difficulty: difficulty }, () => {
      this.props.onChange(difficulty);
    });
  }

  render() {
    const { className } = this.props;
    const { difficulty } = this.state;

    return (
      <div className={`${styles.difficulty} ${className}`}>
        <div className={`${styles.stagesBody}`}>
          <div className={`${styles.item}`}>
            <input
              className={`${styles.radio}`}
              type="radio"
              checked={this.state.difficulty === 'beginner'}
              onChange={() => this.onDifficultyChange('beginner')}
            />{' '}
            <Text
              className={`${styles.text}`}
              color={difficulty === 'beginner' ? 'blue' : 'grey'}
            >
              Beginner
            </Text>{' '}
            <br />
          </div>
          <div className={`${styles.item}`}>
            <input
              className={`${styles.radio}`}
              type="radio"
              checked={this.state.difficulty === 'intermediate'}
              onChange={() => this.onDifficultyChange('intermediate')}
            />{' '}
            <Text
              className={`${styles.text}`}
              color={difficulty === 'intermediate' ? 'blue' : 'grey'}
            >
              Intermediate
            </Text>{' '}
            <br />
          </div>
          <div className={`${styles.item}`}>
            <input
              className={`${styles.radio}`}
              type="radio"
              checked={this.state.difficulty === 'advanced'}
              onChange={() => this.onDifficultyChange('advanced')}
            />{' '}
            <Text
              className={`${styles.text}`}
              color={difficulty === 'advanced' ? 'blue' : 'grey'}
            >
              Advanced
            </Text>{' '}
            <br />
          </div>
        </div>
      </div>
    );
  }
}

Difficulty.propTypes = {
  onChange: PropTypes.func
};

Difficulty.defaultProps = {
  onChange: () => {}
};

export default Difficulty;
