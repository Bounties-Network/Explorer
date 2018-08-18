import React from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Search extends React.Component {
  state = {
    searchText: ''
  };

  onSearchChange = e => {
    const { value } = e.target;
    this.setState({ searchText: value });
    this.props.onChange(value);
  };

  render() {
    const { value } = this.props;
    const { searchText } = this.state;

    const searchValue = typeof value === 'string' ? value : searchText;

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
          value={searchValue}
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
