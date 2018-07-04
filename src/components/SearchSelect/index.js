import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchSelect.module.scss';
import Select from 'react-select';
import '../../styles/ReactSelect.scss';

import { Text, Pill } from 'components';

const filterOptions = (filter, options) => {
  let result = [];
  let hashTable = {};

  filter.forEach(elem => {
    hashTable[elem.name] = true;
  });

  options.forEach(elem => {
    if (!hashTable[elem.name]) {
      result.push(elem);
    }
  });

  return result;
};

// props = options, onChange, placeholder
class SearchSelect extends React.Component {
  state = {
    selection: null,
    options: [],
    filters: []
  };

  componentWillReceiveProps() {
    if (this.state.options.length === 0) {
      this.setState({ options: this.props.options });
    }
  }

  componentDidMount() {
    if (this.state.options.length === 0) {
      this.setState({ options: this.props.options });
    }
  }

  onDropdownSelect = e => {
    const { options } = this.props;
    const { filters, selection } = this.state;

    let tempFilters = filters.slice();
    tempFilters.push(e);
    let tempOptions = filterOptions(tempFilters, options);

    this.setState(
      { filters: tempFilters, selection: null, options: tempOptions },
      () => {
        this.props.onChange(this.state.filters);
      }
    );
  };

  closeChip = name => {
    const { filters } = this.state;
    const { options } = this.props;

    let tempFilters = filters.slice().filter(elem => elem.name !== name);
    let tempOptions = filterOptions(tempFilters, options);
    this.setState({ filters: tempFilters, options: tempOptions }, () => {
      this.props.onChange(this.state.filters);
    });
  };

  renderChips = data => {
    return data.map((elem, idx) => {
      return (
        <div className={`${styles.chip}`} key={'chip' + idx}>
          <Chip close onCloseClick={() => this.closeChip(elem.name)}>
            {elem.name}
          </Chip>
        </div>
      );
    });
  };

  clearFilters = () => {
    const { filters } = this.state;
    const { options } = this.props;

    let tempOptions = filterOptions([], options);
    this.setState({ filters: [], options: tempOptions }, () => {
      this.props.onChange(this.state.filters);
    });
  };

  render() {
    const {
      className,
      disabled,
      label,
      error,
      optional,
      placeholder
    } = this.props;

    let labelText = label;
    if (optional) {
      labelText = `(Optional) ${labelText || ''}`;
    }

    let selectClass = className;
    if (error) {
      selectClass += ` ${styles.error}`;
    }

    return (
      <div className={`${styles.dropdownSearch}`}>
        {labelText ? (
          <div>
            <Text type="FormLabel" color={error ? 'red' : null}>
              {labelText}
            </Text>
          </div>
        ) : null}
        <Select
          disabled={disabled}
          className={selectClass}
          name="DropdownSearch"
          options={this.state.options}
          onChange={this.onDropdownSelect}
          placeholder={placeholder}
          labelKey="name"
        />
        {error ? (
          <div>
            <Text type="FormLabel" color={'red'}>
              {error}
            </Text>
          </div>
        ) : null}
        <div>
          <div className={`${styles.chipBar}`}>
            {this.renderChips(this.state.filters)}
          </div>
        </div>
      </div>
    );
  }
}

SearchSelect.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  optional: PropTypes.bool,
  placeholder: PropTypes.string
};

SearchSelect.defaultProps = {
  options: [],
  onChange: () => {}
};

export default SearchSelect;
