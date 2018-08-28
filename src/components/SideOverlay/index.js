import React from 'react';
import PropTypes from 'prop-types';
import styles from './SideOverlay.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ModalContext = React.createContext({});

class SideOverlay extends React.Component {
  render() {
    return <div className={styles.sideOverlay}>{this.props.children}</div>;
  }
}

export default SideOverlay;
