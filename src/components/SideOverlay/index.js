import React from 'react';
import PropTypes from 'prop-types';
import styles from './SideOverlay.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ModalContext = React.createContext({});

class OverlayContent extends React.Component {
  componentDidMount() {
    this.overlay.focus();
    document.getElementsByClassName('page-header')[0].style.zIndex = 0;
  }

  componentWillUnmount() {
    document.getElementsByClassName('page-header')[0].style.zIndex = 10;
  }

  render() {
    const { onClose, hasMask, theme, position } = this.props;

    return (
      <div className={hasMask ? 'has-mask' : ''}>
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

    let body;
    if (visible) {
      body = (
        <CSSTransition
          key="1"
          timeout={hasMask ? 300 : 300}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            exit: styles.exit,
            exitActive: styles.exitActive
          }}
        >
          <OverlayContent
            onClose={onClose}
            theme={theme}
            hasMask={hasMask}
            position={position}
          >
            {this.props.children}
          </OverlayContent>
        </CSSTransition>
      );
    }

    return <TransitionGroup>{body}</TransitionGroup>;
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
