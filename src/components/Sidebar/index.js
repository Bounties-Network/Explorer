import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ModalContext = React.createContext({});

class TabIcon extends React.Component {
  render() {
    return (
      <ModalContext.Consumer>
        {({ activeTab, onTabClick }) => {
          const { icon, to, tabKey } = this.props;
          let tabStyle = styles.iconTab;

          if (activeTab === tabKey) {
            tabStyle += ` ${styles.active}`;
          }

          return (
            <a className={tabStyle} to={to} onClick={() => onTabClick(tabKey)}>
              <FontAwesomeIcon icon={icon} />
            </a>
          );
        }}
      </ModalContext.Consumer>
    );
  }
}

TabIcon.propTypes = {
  icon: PropTypes.array,
  link: PropTypes.string,
  tabKey: PropTypes.string
};

class Sidebar extends React.Component {
  state = {
    activeTab: null
  };

  onTabClick = tabKey => {
    this.setState({ activeTab: tabKey });
    this.props.onTabClick(`/${tabKey}`);
  };

  render() {
    const { activeTab: activeTabState } = this.state;
    const { defaultActiveTab, className, activeTab } = this.props;

    const currentTab = activeTab || activeTabState || defaultActiveTab;

    return (
      <ModalContext.Provider
        value={{
          activeTab: currentTab,
          onTabClick: this.onTabClick
        }}
      >
        <div className={`${styles.sidebar} ${className}`}>
          {this.props.children}
        </div>
      </ModalContext.Provider>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.arrayOf(function(propValue, key) {
    for (let i = 0; i < propValue.length; i++) {
      if (propValue[i].type.name !== TabIcon.name) {
        return new Error('Children Must Be an Instance of TabIcon');
      }
    }
  }),
  className: PropTypes.string,
  defaultActiveTab: PropTypes.string
};

Sidebar.defaultProps = {};
Sidebar.TabIcon = TabIcon;

export default Sidebar;
