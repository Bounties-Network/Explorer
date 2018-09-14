import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.scss';
import { includes, some } from 'lodash';
import { Text } from 'components';

class HeaderCell extends React.Component {
  render() {
    const { flexGrow, flexBasis, contentType } = this.props;

    return (
      <div
        className={`${styles.cell} ${styles[contentType]}`}
        style={{ flexGrow, flexBasis }}
      >
        <Text inputLabel>{this.props.children}</Text>
      </div>
    );
  }
}

HeaderCell.propTypes = {
  flexBasis: PropTypes.string,
  flexGrow: PropTypes.number,
  contentType: PropTypes.oneOf(['nonNumerical', 'numerical'])
};

HeaderCell.defaultProps = {
  contentType: 'nonNumerical'
};

class Header extends React.Component {
  render() {
    return (
      <div className={`${styles.header} ${styles.row}`}>
        {this.props.children}
      </div>
    );
  }
}

Header.propTypes = {
  flexBasis: PropTypes.string,
  flexGrow: PropTypes.number,
  children: PropTypes.arrayOf(function(propValue, key) {
    for (let i = 0; i < propValue.length; i++) {
      if (propValue[i].type.name !== HeaderCell.name) {
        return new Error('Children Must Be an Instance of a Header Cell');
      }
    }
  })
};

class Cell extends React.Component {
  render() {
    const {
      headerText,
      contentType,
      flexGrow,
      flexBasis,
      className
    } = this.props;

    return (
      <div
        className={`${styles.cell} ${className} ${styles[contentType]}`}
        data-header={headerText}
        style={{ flexGrow, flexBasis }}
      >
        <div className={styles.cellWrapper}>{this.props.children}</div>
      </div>
    );
  }
}

Cell.propTypes = {
  contentType: PropTypes.oneOf(['nonNumerical', 'numerical'])
};

Cell.defaultProps = {
  contentType: 'nonNumerical'
};

class Row extends React.Component {
  render() {
    const { hover, className } = this.props;

    let rowClass = styles.row;
    if (hover) {
      rowClass += ` ${styles.rowHover}`;
    }

    return (
      <div className={`${rowClass} ${className}`}>{this.props.children}</div>
    );
  }
}

Row.propTypes = {
  hover: PropTypes.bool,
  children: PropTypes.arrayOf(function(propValue, key) {
    for (let i = 0; i < propValue.length; i++) {
      if (propValue[i].type.name !== Cell.name) {
        return new Error('Children Must Be an Instance of a Cell');
      }
    }
  })
};

Row.defaultProps = {};

class Table extends React.Component {
  render() {
    return <div className={styles.table}>{this.props.children}</div>;
  }
}

Table.propTypes = {
  children: PropTypes.arrayOf(function(propValue, key) {
    for (let i = 0; i < propValue.length; i++) {
      if (
        propValue[i].type &&
        !includes(propValue[i].type.name, [Row.name, Header.name])
      ) {
        return new Error('Children Must Be an Instance of Row or Header');
      }
    }
  })
};

Table.defaultProps = {};
Table.Row = Row;
Table.Header = Header;
Table.Cell = Cell;
Table.HeaderCell = HeaderCell;

export default Table;
