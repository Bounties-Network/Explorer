import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tabs.module.scss';

import { Tab } from 'components';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.tabs[0].title
    };

    this.renderTabs = this.renderTabs.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }

  renderTabs(tabs) {
    return tabs.map(elem => {
      return (
        <div
          className={styles.tab}
          key={elem.title}
          onClick={e => this.onTabChange(elem)}
        >
          <Tab
            notificationAmount={elem.notificationAmount}
            active={this.state.activeTab === elem.title}
            onClick={() => this.onTabChange(elem.title)}
          >
            {elem.title}
          </Tab>
        </div>
      );
    });
  }

  onTabChange(tab) {
    this.setState({ activeTab: tab.title });

    this.props.onClick(tab);
  }

  render() {
    const { tabs } = this.props;

    return <div className={`${styles.tabs}`}>{this.renderTabs(tabs)}</div>;
  }
}

Tabs.propTypes = {
  tabs: PropTypes.array,
  onClick: PropTypes.func
};

Tabs.defaultProps = {
  tabs: [{ title: 'title' }],
  onClick: e => console.log(e)
};

export default Tabs;
