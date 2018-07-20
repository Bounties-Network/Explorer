import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './Sort.module.scss';
import { Text } from 'components';

class Sort extends React.Component {
  state = {
    sort: null
  };

  onClick = () => {
    const { sort } = this.state;
    const { defaultSort, onSort } = this.props;
    const sortState = sort || defaultSort;

    let newSort = 'desc';
    if (sortState === 'desc') {
      newSort = 'asc';
    }

    this.setState({ sort: newSort });
    onSort(newSort);
  };

  render() {
    const { active, defaultSort, className, children } = this.props;
    const { sort } = this.state;

    let textColor = 'defaultGrey';
    let textWeight = 'fontWeight-regular';
    if (active) {
      textColor = 'black';
      textWeight = 'fontWeight-bold';
    }

    let icon = ['far', 'chevron-down'];
    const sortState = sort || defaultSort;
    if (sortState === 'asc') {
      icon = ['far', 'chevron-up'];
    }

    return (
      <span className={`${className} ${styles.sort}`} onClick={this.onClick}>
        <Text
          typeScale="Body"
          weight={textWeight}
          color={textColor}
          className={`${styles.sortText}`}
        >
          {children}
        </Text>
        <i className={styles.chevron}>
          <FontAwesomeIcon icon={icon} />
        </i>
      </span>
    );
  }
}

Sort.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  onSort: PropTypes.func,
  defaultSort: PropTypes.oneOf(['asc', 'desc'])
};

Sort.defaultProps = {
  onSort: () => {},
  defaultSort: 'asc',
  active: false
};

export default Sort;
