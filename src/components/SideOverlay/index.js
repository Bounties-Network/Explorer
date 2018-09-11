import React from 'react';
import PropTypes from 'prop-types';
import styles from './SideOverlay.module.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class OverlayContent extends React.Component {
  componentDidMount() {
    this.overlay.focus();
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
  componentDidUpdate(prevProps) {
    const { visible, hasMask } = this.props;

    const pageBody = document.getElementsByClassName('page-body')[0];
    if (!prevProps.visible && visible && hasMask) {
      if (pageBody) {
        pageBody.classList.add('mask-open');
      }
    }

    if (prevProps.visible && !visible && hasMask) {
      if (pageBody) {
        pageBody.classList.remove('mask-open');
      }
    }
  }

  render() {
    const { visible, onClose, theme, hasMask, position } = this.props;

    let body;
    if (visible) {
      body = (
        <CSSTransition
          key="1"
          timeout={hasMask ? 400 : 350}
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
