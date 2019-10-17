import React from 'react';
import styles from './Settings.module.scss';
import UserSettings from './UserSettings';
import EmailPreferences from './EmailPreferences';
import { PageCard } from 'explorer-components';
import intl from 'react-intl-universal';

import { Prompt } from 'react-router';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import onBeforeUnloadHandler from 'lib/on-before-unload-handler';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false,
      submitNotPressed: true
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', onBeforeUnloadHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload')
  }

  render() {
    const settingsWhenCondition =this.state.dirty && this.state.submitNotPressed

    return (
      <div>
        {/* Need i18n? */}
        <Prompt when={settingsWhenCondition} message={`Changes you made may not be saved.`} />
        <PageCard>
          <PageCard.Header>
            <PageCard.Title>
              {intl.get('sections.settings.title')}
            </PageCard.Title>
          </PageCard.Header>
          <PageCard.Content key="profile" className={styles.cardContent}>
            <UserSettings
              handleUser={() => this.setState({ submitNotPressed: false })}
              onChange={() => this.setState({ dirty: true })}
            />
          </PageCard.Content>
        </PageCard>
        <PageCard noBanner>
          <PageCard.Content key="email" className={styles.cardContent}>
            <EmailPreferences
              handleEmail={() => this.setState({ submitNotPressed: false })}
              onChange={() => this.setState({ dirty: true })}
            />
          </PageCard.Content>
        </PageCard>
      </div>
    );
  }
}

export default Settings;
