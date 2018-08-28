import React from 'react';
import PropTypes from 'prop-types';
import styles from './SideOverlay.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ModalContext = React.createContext({});

class OverlayContent extends React.Component {
  componentDidMount() {
    this.overlay.focus();
  }

  render() {
    const { onClose, hasMask, theme, position } = this.props;

    return (
      <div>
        <div
          className={`${styles.sideOverlay} ${styles[theme]} ${
            styles[position]
          }`}
          ref={overlay => {
            this.overlay = overlay;
          }}
        >
          {this.props.children}
        </div>
        <div
          className={`${styles.mask} ${hasMask ? styles.activeMask : ''}`}
          onClick={onClose}
        />
      </div>
    );
  }
}

class SideOverlay extends React.Component {
  render() {
    const { visible, onClose, theme, hasMask, position } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <OverlayContent
        onClose={onClose}
        theme={theme}
        hasMask={hasMask}
        position={position}
      >
        {this.props.children}
      </OverlayContent>
    );
  }
}

SideOverlay.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
  position: PropTypes.oneOf(['left', 'right']),
  onClose: PropTypes.func,
  hasMask: PropTypes.bool
};

SideOverlay.defaultProps = {
  theme: 'dark',
  position: 'left'
};

export default SideOverlay;
