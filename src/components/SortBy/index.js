import React from 'react';
import PropTypes from 'prop-types';
import styles from './SortBy.module.scss';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronUp from '@fortawesome/fontawesome-pro-light/faChevronUp';
import faChevronDown from '@fortawesome/fontawesome-pro-light/faChevronDown';

import { Text } from 'components';

class SortBy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'Value',
      descending: true
    };

    this.onFilterClick = this.onFilterClick.bind(this);
    this.renderChevronState = this.renderChevronState.bind(this);
  }

  onFilterClick(filter) {
    let tempState = Object.assign({}, this.state);
    if (this.state.sortBy === filter) {
      tempState.descending = !this.state.descending;
    } else {
      tempState.sortBy = filter;
    }

    this.setState(tempState);
    this.props.onClick(tempState);
  }

  renderChevronState(filter) {
    if (this.state.sortBy === filter) {
      if (this.state.descending) {
        return faChevronDown;
      } else {
        return faChevronUp;
      }
    } else {
      return faChevronDown;
    }
  }

  render() {
    return (
      <div className={`${styles.sortBy}`}>
        <Text style="H4">Sort By</Text>
        <div
          className={`${styles.sortByButtons} ${
            styles[this.state.sortBy === 'Value' ? 'active' : 'notActive']
          }`}
          onClick={() => this.onFilterClick('Value')}
        >
          <Text color={this.state.sortBy === 'Value' ? 'black' : 'grey'}>
            Value
          </Text>
          <div className={`${styles.chevron}`}>
            <Text
              style="Alt"
              color={this.state.sortBy === 'Value' ? 'blue' : 'black'}
            >
              <FontAwesomeIcon icon={this.renderChevronState('Value')} />
            </Text>
          </div>
        </div>
        <div
          className={`${styles.sortByButtons} ${
            styles[
              this.state.sortBy === 'Creation Date' ? 'active' : 'notActive'
            ]
          }`}
          onClick={() => this.onFilterClick('Creation Date')}
        >
          <Text
            color={this.state.sortBy === 'Creation Date' ? 'black' : 'grey'}
          >
            Creation Date
          </Text>
          <div className={`${styles.chevron}`}>
            <Text
              style="Alt"
              color={this.state.sortBy === 'Creation Date' ? 'blue' : 'black'}
            >
              <FontAwesomeIcon
                icon={this.renderChevronState('Creation Date')}
              />
            </Text>
          </div>
        </div>
        <div
          className={`${styles.sortByButtons} ${
            styles[this.state.sortBy === 'Expiry' ? 'active' : 'notActive']
          }`}
          onClick={() => this.onFilterClick('Expiry')}
        >
          <Text color={this.state.sortBy === 'Expiry' ? 'black' : 'grey'}>
            Expiry
          </Text>
          <div className={`${styles.chevron}`}>
            <Text
              style="Alt"
              color={this.state.sortBy === 'Expiry' ? 'blue' : 'black'}
            >
              <FontAwesomeIcon icon={this.renderChevronState('Expiry')} />
            </Text>
          </div>
        </div>
      </div>
    );
  }
}

SortBy.propTypes = {
  onClick: PropTypes.func
};

SortBy.defaultProps = {
  onClick: e => console.log(e)
};

export default SortBy;
