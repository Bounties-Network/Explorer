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
    const { defaultSort } = this.props;
    const sortState = sort || defaultSort;

    let newSort = 'desc';
    if (sortState === 'desc') {
      newSort = 'asc';
    }

    this.setState({ sort: newSort });
  };

  render() {
    const { active, defaultSort, className, children } = this.props;
    const { sort } = this.state;

    let iconColor = 'black';
    let textColor = 'grey';
    if (active) {
      iconColor = 'blue';
      textColor = 'black';
    }

    let icon = ['fal', 'chevron-down'];
    const sortState = sort || defaultSort;
    if (sortState === 'asc') {
      icon = ['fal', 'chevron-up'];
    }

    return (
      <span className={`${className} ${styles.sort}`} onClick={this.onClick}>
        <Text color={textColor}>{children}</Text>
        <Text type="Alt" color={iconColor} className={styles.chevron}>
          <FontAwesomeIcon icon={icon} />
        </Text>
      </span>
    );
  }
}

Sort.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  defaultSort: PropTypes.oneOf(['asc', 'desc'])
};

Sort.defaultProps = {
  defaultSort: 'desc',
  active: false
};

export default Sort;
