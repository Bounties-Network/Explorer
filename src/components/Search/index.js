import React from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.scss';

import { Text } from 'components';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(e) {
    const { value } = e.target;
    this.setState({ searchText: value }, () => this.props.onChange(value));
  }

  render() {
    return (
      <input
        className={`${styles.search}`}
        type="text"
        placeholder="🔍  Search"
        onChange={this.onSearchChange}
        value={this.state.searchText}
      />
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
