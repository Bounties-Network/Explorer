import React from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { Text } from 'components';

const debounceTimer = 400;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };

    this.timeout = null;

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(e) {
    const { value } = e.target;
    this.setState({ searchText: value });

    // debounce
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(
      () => this.props.onChange(this.state.searchText),
      debounceTimer
    );
  }

  render() {
    return (
      <div className={`${styles.searchContainer}`}>
        <i className={styles.searchIcon}>
          <FontAwesomeIcon icon={['far', 'search']} />
        </i>
        <input
          className={`${styles.searchInput}`}
          type="text"
          placeholder="Search..."
          onChange={this.onSearchChange}
          value={this.state.searchText}
        />
      </div>
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func
};

Search.defaultProps = {
  onChange: () => {}
};

export default Search;
