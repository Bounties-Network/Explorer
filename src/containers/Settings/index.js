import React from 'react';
import styles from './Settings.module.scss';
import UserSettings from './UserSettings';
import EmailPreferences from './EmailPreferences';
import { PageCard } from 'explorer-components';

let Settings = props => {
  return (
    <div className="container-fluid">
      <div className="row center-xs">
        <PageCard>
          <PageCard.Header>
            <PageCard.Title>Account Settings</PageCard.Title>
          </PageCard.Header>
          <PageCard.Content className={styles.cardContent}>
            <UserSettings />
          </PageCard.Content>
        </PageCard>
      </div>
      <div className="row center-xs">
        <PageCard noBanner>
          <PageCard.Content className={styles.cardContent}>
            <EmailPreferences />
          </PageCard.Content>
        </PageCard>
      </div>
    </div>
  );
};

export default Settings;
