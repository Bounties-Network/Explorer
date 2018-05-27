import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.scss';

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

  onTabClick(page) {
    this.props.onClick(page);

    this.setState({ activeTab: page });
  }

  checkActive(page) {
    return this.state.activeTab === page ? 'active' : 'inactive';
  }

  render() {
    return (
      <div className={`${styles.sidebar}`}>
        <div className={`${styles.iconBar}`}>
          {/*Dashboard*/}
          <div
            className={`${styles.iconTab} ${
              styles[this.checkActive('dashboard')]
            }`}
            onClick={e => this.onTabClick('dashboard')}
          >
            <FontAwesomeIcon icon={faTachometer} />
          </div>
          {/*Explorer*/}
          <div
            className={`${styles.iconTab} ${
              styles[this.checkActive('explorer')]
            }`}
            onClick={e => this.onTabClick('explorer')}
          >
            <FontAwesomeIcon icon={faListAlt} />
          </div>
          {/*Leaderboard*/}
          <div
            className={`${styles.iconTab} ${
              styles[this.checkActive('leaderboard')]
            }`}
            onClick={e => this.onTabClick('leaderboard')}
          >
            <FontAwesomeIcon icon={faTrophyAlt} />
          </div>
          {/*Profile*/}
          <div
            className={`${styles.iconTab} ${
              styles[this.checkActive('profile')]
            }`}
            onClick={e => this.onTabClick('profile')}
          >
            <FontAwesomeIcon icon={faUserAlt} />
          </div>
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
