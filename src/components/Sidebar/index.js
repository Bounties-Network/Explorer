import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.scss';

import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTachometer from '@fortawesome/fontawesome-pro-light/faTachometer';
import faListAlt from '@fortawesome/fontawesome-pro-light/faListAlt';
import faTrophyAlt from '@fortawesome/fontawesome-pro-light/faTrophyAlt';
import faUserAlt from '@fortawesome/fontawesome-pro-light/faUserAlt';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'dashboard',
      tabs: ['dashboard', 'explorer', 'leaderboard', 'profile']
    };

    this.onTabClick = this.onTabClick.bind(this);
    this.checkActive = this.checkActive.bind(this);
  }

  componentDidMount() {
    if (window && window.location && window.location.pathname) {
      let path = window.location.pathname;
      let activeTab;

      if (path.slice(0, 10) === '/dashboard') {
        activeTab = 'dashboard';
      } else if (path.slice(0, 9) === '/explorer') {
        activeTab = 'explorer';
      } else if (path.slice(0, 12) === '/leaderboard') {
        activeTab = 'leaderboard';
      } else if (path.slice(0, 8) === '/profile') {
        activeTab = 'profile';
      }

      this.setState({ activeTab });
    }
  }

  onTabClick(page) {
    this.props.onClick(page);

    this.setState({ activeTab: page });
  }

  checkActive(page) {
    return this.state.activeTab === page ? 'active' : 'inactive';
  }

  render() {
    const { loginStatus } = this.props;
    return (
      <div className={`${styles.sidebar}`}>
        <div className={`${styles.iconBar}`}>
          {/*Dashboard*/}
          <Link
            className={`${styles.iconTab} ${
              styles[this.checkActive('dashboard')]
            }`}
            to="/dashboard"
            onClick={e => this.onTabClick('dashboard')}
          >
            <FontAwesomeIcon icon={faTachometer} />
          </Link>
          {/*Explorer*/}
          <Link
            className={`${styles.iconTab} ${
              styles[this.checkActive('explorer')]
            }`}
            to="/explorer"
            onClick={e => this.onTabClick('explorer')}
          >
            <FontAwesomeIcon icon={faListAlt} />
          </Link>
          {/*Leaderboard*/}
          <Link
            className={`${styles.iconTab} ${
              styles[this.checkActive('leaderboard')]
            }`}
            to="/leaderboard"
            onClick={e => this.onTabClick('leaderboard')}
          >
            <FontAwesomeIcon icon={faTrophyAlt} />
          </Link>
          {/*Profile*/}
          {loginStatus && (
            <Link
              className={`${styles.iconTab} ${
                styles[this.checkActive('profile')]
              }`}
              to="/profile"
              onClick={e => this.onTabClick('profile')}
            >
              <FontAwesomeIcon icon={faUserAlt} />
            </Link>
          )}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  onChange: PropTypes.func
};

Sidebar.defaultProps = {
  onChange: e => {
    console.log(e);
  }
};

export default Sidebar;
