import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './Dropdown.module.scss';

class DropdownTrigger extends React.Component {
  render() {
    return this.props.children;
  }
}

class MenuItem extends React.Component {
  render() {
    const { icon, children, className, onClick } = this.props;

    const iconBlock = icon ? (
      <FontAwesomeIcon icon={icon} className={styles.faIcon} />
    ) : null;

    return (
      <li
        className={`${className} ${styles.menuItem}`}
        onClick={() => onClick()}
      >
        {iconBlock}
        {children}
      </li>
    );
  }
}

MenuItem.propTypes = {
  icon: PropTypes.object,
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

    this.state = {
      show: false
    };
  }

  hide = () => {
    // I don't like this, but otherwise the click handlers don't propagate properly
    setTimeout(() => this.setState({ show: false }), 100);
  };

  toggle = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { show } = this.state;

    const { position, className, hideOnClick } = this.props;

    let contentClass = show
      ? `${styles.content} ${styles.show} ${className}`
      : `${styles.content} ${className}`;

    if (position === 'left') {
      contentClass += ` ${styles.contentLeft}`;
    }

    return (
      <div
        className={styles.container}
        tabIndex={hideOnClick ? null : '0'}
        onBlur={hideOnClick ? () => {} : this.hide}
      >
        <div
          className={styles.trigger}
          onClick={this.toggle}
          tabIndex={hideOnClick ? '0' : null}
          onBlur={hideOnClick ? this.hide : () => {}}
        >
          {this.props.children[0]}
        </div>
        <div className={contentClass}>{this.props.children[1]}</div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
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
  position: 'right'
};

Dropdown.DropdownTrigger = DropdownTrigger;
Dropdown.DropdownContent = DropdownContent;
Dropdown.MenuItem = MenuItem;

export default Dropdown;
