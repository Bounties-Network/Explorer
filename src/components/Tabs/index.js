import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tabs.module.scss';
import { Text } from 'components';

const ModalContext = React.createContext({});

class Tab extends React.Component {
  render() {
    const { tabCount, eventKey, tabColor } = this.props;

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
              className={tabStyles}
              onClick={() => onSelect(this.props.eventKey)}
            >
              <Text
                color={active ? 'black' : 'grey'}
                type={active ? 'H4' : 'CardHeading'}
              >
                {this.props.children}
              </Text>
              <span className={countStyles}>
                <Text type="BodySmall" color={tabTextColor}>
                  12
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
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
    const { defaultActiveKey } = this.props;
    const { activeKey } = this.state;

    return (
      <ModalContext.Provider
        value={{ activeKey: activeKey, onSelect: this.onSelect }}
      >
        <div className={`${styles.tabs}`}>{this.props.children}</div>
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
  activeKey: PropTypes.string
};

Tabs.defaultProps = {};
Tabs.Tab = Tab;

export default Tabs;
