import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tabs.module.scss';
import { Text } from 'components';

const ModalContext = React.createContext({});

class Tab extends React.Component {
  render() {
    const {
      tabCount,
      eventKey,
      tabColor,
      tabClassName,
      tabTextClass,
      typeScale
    } = this.props;

    return (
      <ModalContext.Consumer>
        {({ onSelect, activeKey }) => {
          const active = activeKey === eventKey;
          let tabStyles = styles.tab;
          if (active) {
            tabStyles += ` ${styles.active}`;
          }
          let countStyles = styles.notification;
          if (active) {
            countStyles += ` ${styles[tabColor]}`;
          }
          let tabTextColor = 'darkGrey';
          if (active && tabColor !== 'lightGrey') {
            tabTextColor = 'white';
          }

          return (
            <div
              className={`${tabStyles} ${tabClassName}`}
              onClick={() => onSelect(this.props.eventKey)}
            >
              <Text
                color={active ? 'black' : 'defaultGrey'}
                weight={active ? 'fontWeight-medium' : 'fontWeight-regular'}
                typeScale={typeScale}
                className={tabTextClass}
              >
                {this.props.children}
              </Text>
              <span className={countStyles}>
                <Text typeScale="Small" color={tabTextColor}>
                  {tabCount}
                </Text>
              </span>
            </div>
          );
        }}
      </ModalContext.Consumer>
    );
  }
}

Tab.propTypes = {
  tabCount: PropTypes.number,
  tabColor: PropTypes.oneOf(['blue', 'green', 'lightGrey']),
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabTextClass: PropTypes.string,
  typeScale: PropTypes.string
};

Tab.defaultProps = {
  tabColor: 'lightGrey'
};

class Tabs extends React.Component {
  state = {
    activeKey: null
  };

  onSelect = key => {
    this.setState({ activeKey: key });
    this.props.onSelect(key);
  };

  render() {
    const { activeKey, className, defaultActiveKey } = this.props;
    const { activeKey: stateActiveKey } = this.state;

    const currentKey = activeKey || stateActiveKey || defaultActiveKey;

    return (
      <ModalContext.Provider
        value={{ activeKey: currentKey, onSelect: this.onSelect }}
      >
        <div className={`${styles.tabs} ${className}`}>
          {this.props.children}
        </div>
      </ModalContext.Provider>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(function(propValue, key) {
    for (let i = 0; i < propValue.length; i++) {
      if (propValue[i].type.name !== Tab.name) {
        return new Error('Children Must Be an Instance of Tab');
      }
    }
  }),
  onSelect: PropTypes.func,
  activeKey: PropTypes.string,
  className: PropTypes.string,
  tabClassName: PropTypes.string
};

Tabs.defaultProps = {};
Tabs.Tab = Tab;

export default Tabs;
