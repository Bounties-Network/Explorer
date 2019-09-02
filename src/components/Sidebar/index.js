import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.scss';
import { each } from 'lodash';
import { SideOverlay, Text } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import intl from 'react-intl-universal';

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
            <a
              className={tabStyle}
              onClick={() => (tabKey ? onTabClick(tabKey) : null)}
            >
              <FontAwesomeIcon icon={icon} className={styles.navIcon} />
              {title && (
                <Text className={styles.navText} typeScale="h4">
                  {intl.get(title)}
                </Text>
              )}
            </a>
          );
        }}
      </ModalContext.Consumer>
    );
  }
}

class TabGroup extends React.Component {
  render() {
    return this.props.children;
  }
}

TabGroup.propTypes = {
  children: PropTypes.arrayOf(function(propValue, key) {
    for (let i = 0; i < propValue.length; i++) {
      if (propValue[i].type.name !== TabIcon.name) {
        return new Error('Children Must Be an Instance of TabIcon');
      }
    }
  })
};

class Footer extends React.Component {
  render() {
    return this.props.children;
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
    const {
      defaultActiveTab,
      className,
      activeTab,
      mobileVisible,
      onMobileHide
    } = this.props;

    let footer, tabGroup;
    const children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];
    each(child => {
      if (!child) {
        return null;
      }

      const childName = child.type.name;
      if (childName === Footer.name) {
        footer = child;
      }

      if (childName === TabGroup.name) {
        tabGroup = child;
      }
    }, children);

    const currentTab = activeTab || activeTabState || defaultActiveTab;
    const sidebarBody = (
      <ModalContext.Provider
        value={{
          activeTab: currentTab,
          onTabClick: this.onTabClick
        }}
      >
        <div className={`${styles.sidebar} ${className}`}>
          <div className={styles.icons}>{tabGroup}</div>
          <div className={styles.footer}>{footer}</div>
        </div>
      </ModalContext.Provider>
    );

    return (
      <div>
        <div className={styles.mobileSideNav}>
          <SideOverlay visible={mobileVisible} onClose={onMobileHide}>
            {sidebarBody}
          </SideOverlay>
        </div>
        <div className={styles.desktopSideNav}>{sidebarBody}</div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.arrayOf(function(propValue, key) {
    for (let i = 0; i < propValue.length; i++) {
      if (
        // if child is a boolean then abort because it is the remnants of
        // an expression that should not be displayed at this time
        typeof propValue[i] !== 'boolean' &&
        propValue[i].type.name !== TabGroup.name &&
        propValue[i].type.name !== Footer.name
      ) {
        return new Error('Children Must Be an Instance of TabGroup or Footer');
      }
    }
  }),
  className: PropTypes.string,
  defaultActiveTab: PropTypes.string
};

Sidebar.defaultProps = {};
Sidebar.TabGroup = TabGroup;
Sidebar.Footer = Footer;
Sidebar.TabIcon = TabIcon;

export default Sidebar;
