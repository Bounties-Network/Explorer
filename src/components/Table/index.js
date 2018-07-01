import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.scss';
import { Text } from 'components';

class HeaderCell extends React.Component {
  render() {
    return <div className={styles.item}>{this.props.children}</div>;
  }
}

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
    return <div className={styles.cell}>{this.props.children}</div>;
  }
}

class Row extends React.Component {
  render() {
    return <div className={styles.row}>{this.props.children}</div>;
  }
}

Row.propTypes = {
  children: PropTypes.arrayOf(function(propValue, key) {
    for (let i = 0; i < propValue.length; i++) {
      if (propValue[i].type.name !== Cell.name) {
        return new Error('Children Must Be an Instance of a Cell');
      }
    }
  })
};

class Table extends React.Component {
  render() {
    return <div className={styles.table}>{this.props.children}</div>;
  }
}

Table.propTypes = {
  children: PropTypes.arrayOf(function(propValue, key) {
    for (let i = 0; i < propValue.length; i++) {
      if (!includes(collection[i].type.name, [Row.name, Header.name])) {
        return new Error('Children Must Be an Instance of Row or Header');
      }
    }
  })
};

Table.defaultProps = {};
Table.Row = Row;

export default Table;
