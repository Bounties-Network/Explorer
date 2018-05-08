import React from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.scss';

import { Text } from 'components';

// const Search = props => {
//   const { onChange } = props;

//   return (
//     <input
//       className={`${styles.search}`}
//       type="text"
//       placeholder="🔍  Search"
//       onChange={onChange}
//     />
//   );
// };

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
    this.setState({ searchText: value });
    setTimeout(() => console.log(this.state.searchText), 0);
  }

  render() {
    // const { onChange } = this.props;

    return (
      <input
        className={`${styles.search}`}
        type="text"
        placeholder="🔍  Search"
        onChange={this.onSearchChange}
        value={this.state.searchText}
      />
      // <input
      //   className={`${styles.search}`}
      //   type="text"
      //   placeholder="🔍  Search"
      //   value={this.state.searchText}
      //   onChange={this.onSearchChange}
      // />
    );
  }
}

export default Search;
