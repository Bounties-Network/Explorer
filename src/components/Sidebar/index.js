import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ModalContext = React.createContext({});

class TabIcon extends React.Component {
  render() {
    return (
      <ModalContext.Consumer>
        {({ activeTab, onTabClick }) => {
          const { icon, link, tabKey } = this.props;
          let tabStyle = styles.iconTab;

          if (activeTab === tabKey) {
            tabStyle += ` ${styles.active}`;
          }

          return (
            <a
              className={tabStyle}
              to={link}
              onClick={() => onTabClick(tabKey)}
            >
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
  };

  render() {
    const { activeTab } = this.state;
    const { defaultActiveTab, className } = this.props;

    return (
      <ModalContext.Provider
        value={{
          activeTab: activeTab || defaultActiveTab,
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
