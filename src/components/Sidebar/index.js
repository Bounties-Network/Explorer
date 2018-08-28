import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.scss';
import { SideOverlay, Text } from 'components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ModalContext = React.createContext({});

class TabIcon extends React.Component {
  render() {
    return (
      <ModalContext.Consumer>
        {({ activeTab, onTabClick }) => {
          const { icon, tabKey, title } = this.props;
          let tabStyle = styles.iconTab;

          if (activeTab === tabKey) {
            tabStyle += ` ${styles.active}`;
          }

          return (
            <a className={tabStyle} onClick={() => onTabClick(tabKey)}>
              <FontAwesomeIcon icon={icon} />
              <div className={styles.navText}>
                <Text typeScale="h3">{title}</Text>
              </div>
            </a>
          );
        }}
      </ModalContext.Consumer>
    );
  }
}

TabIcon.propTypes = {
  icon: PropTypes.array,
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

    const sidebarBody = (
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

    return (
      <div>
        <div className={styles.mobileSideNav}>
          <SideOverlay>{sidebarBody}</SideOverlay>
        </div>
        <div className={styles.desktopSideNav}>{sidebarBody}</div>
      </div>
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
