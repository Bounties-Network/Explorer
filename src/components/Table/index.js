import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.scss';
import { includes } from 'lodash';
import { Text } from 'components';

class HeaderCell extends React.Component {
  render() {
    const { flexGrow, flexBasis } = this.props;

    return (
      <div className={styles.cell} style={{ flexGrow, flexBasis }}>
        <Text type="body" color="grey">
          {this.props.children}
        </Text>
      </div>
    );
  }
}

HeaderCell.propTypes = {
  flexBasis: PropTypes.string,
  flexGrow: PropTypes.number
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
    const { headerText, flexGrow, flexBasis } = this.props;

    return (
      <div
        className={styles.cell}
        data-header={headerText}
        style={{ flexGrow, flexBasis }}
      >
        <div className={styles.cellWrapper}>{this.props.children}</div>
      </div>
    );
  }
}

class Row extends React.Component {
  render() {
    const { hover } = this.props;

    let rowClass = styles.row;
    if (hover) {
      rowClass += ` ${styles.rowHover}`;
    }

    return <div className={rowClass}>{this.props.children}</div>;
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
      if (!includes(propValue[i].type.name, [Row.name, Header.name])) {
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
