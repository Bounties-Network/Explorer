import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './Dropdown.module.scss';

import { Text } from 'components';

class DropdownTrigger extends React.Component {
  render() {
    return this.props.children;
  }
}

class MenuItem extends React.Component {
  render() {
    const { icon, children, className, onClick } = this.props;

    const iconBlock = icon ? (
      <FontAwesomeIcon icon={icon} color="grey" className={styles.faIcon} />
    ) : null;

    return (
      <li className={`${className} ${styles.menuItem}`} onClick={onClick}>
        {iconBlock}
        <Text inline>{children}</Text>
      </li>
    );
  }
}

MenuItem.propTypes = {
  icon: PropTypes.array,
  onClick: PropTypes.func,
  className: PropTypes.string
};

MenuItem.defaultProps = {
  onClick: () => {}
};

class DropdownContent extends React.Component {
  render() {
    const { children, className } = this.props;

    if (Array.isArray(children) && children[0].type.name === MenuItem.name) {
      return <ul className={`${styles.menuItems} ${className}`}>{children}</ul>;
    }

    return children;
  }
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.trigger = React.createRef();
    this.state = {
      show: false
    };
  }

  hide = () => {
    // I don't like this, but otherwise the click handlers don't propagate properly
    setTimeout(() => this.setState({ show: false }), 150);
  };

  toggle = () => {
    // I don't like this, but otherwise the click handlers don't propagate properly
    if (this.state.show) {
      return setTimeout(() => this.setState({ show: !this.state.show }), 150);
    }
    return this.setState({ show: !this.state.show });
  };

  onMouseEnter = () => {
    const { show } = this.state;
    const { hoverTrigger } = this.props;

    if (!show && hoverTrigger) {
      this.trigger.current.focus();
      this.toggle();
    }

    return null;
  };

  render() {
    const { show } = this.state;

    const {
      position,
      className,
      hideOnClick,
      containerClass,
      hoverTrigger,
      animateDirection
    } = this.props;

    let contentClass = show
      ? `${styles.content} ${styles.show} ${className}`
      : `${styles.content} ${className}`;

    if (position === 'left') {
      contentClass += ` ${styles.contentLeft}`;
    }

    let content;
    if (show) {
      content = (
        <CSSTransition
          key="1"
          timeout={{ enter: 150, exit: 0 }}
          classNames={{
            enter:
              animateDirection === 'right' ? styles.enterRight : styles.enter,
            enterActive:
              animateDirection === 'right'
                ? styles.enterActiveRight
                : styles.enterActive
          }}
        >
          <div className={contentClass}>{this.props.children[1]}</div>
        </CSSTransition>
      );
    }

    return (
      <div
        className={`${styles.container} ${containerClass}`}
        tabIndex={hideOnClick ? null : '0'}
        onBlur={hideOnClick ? () => {} : this.hide}
        onMouseLeave={hoverTrigger ? this.hide : () => {}}
      >
        <div
          className={styles.trigger}
          onClick={this.toggle}
          tabIndex={hideOnClick ? '0' : null}
          ref={this.trigger}
          onBlur={hideOnClick ? this.hide : () => {}}
          onMouseEnter={this.onMouseEnter}
        >
          {this.props.children[0]}
        </div>
        <TransitionGroup>{content}</TransitionGroup>
      </div>
    );
  }
}

Dropdown.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  hoverTrigger: PropTypes.bool,
  className: PropTypes.string,
  containerClass: PropTypes.string,
  animateDirection: PropTypes.oneOf(['down', 'right']),
  children: PropTypes.arrayOf(function(propValue, key) {
    if (key > 1) {
      return new Error('Children Must Be DropdownTrigger and DropdownContent');
    }
    if (key === 0 && propValue[0].type.name !== DropdownTrigger.name) {
      return new Error('First Child Must Be a Dropdown Trigger Element');
    }
    if (key === 1 && propValue[1].type.name !== DropdownContent.name) {
      return new Error('Second Child Must Be a Dropdown Content Element');
    }
  })
};

Dropdown.defaultProps = {
  animateDirection: 'down',
  position: 'right'
};

Dropdown.DropdownTrigger = DropdownTrigger;
Dropdown.DropdownContent = DropdownContent;
Dropdown.MenuItem = MenuItem;

export default Dropdown;
