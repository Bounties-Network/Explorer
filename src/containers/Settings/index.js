import React from 'react';
import styles from './Settings.module.scss';
import UserSettings from './UserSettings';
import EmailPreferences from './EmailPreferences';
import { PageCard } from 'explorer-components';
import intl from 'react-intl-universal';

import NavigationPrompt from 'react-router-navigation-prompt';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false,
      submitNotPressed: true
    };
  }
  render() {
    return (
      <div>
        {this.state.dirty && this.state.submitNotPressed ? (
          <NavigationPrompt
            renderIfNotActive={false}
            when={(crntLocation, nextLocation) =>
              !nextLocation ||
              !nextLocation.pathname.startsWith(crntLocation.pathname)
            }
          >
            {({ isActive, onCancel, onConfirm }) => {
              if (isActive) {
                return (
                  <Modal
                    dismissable
                    size={'medium'}
                    fixed
                    visible={true}
                    onClose={onCancel}
                  >
                    <Modal.Header closable />
                    <Modal.Body>
                      <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <h1 style={{ fontWeight: 'bold' }}>Discard changes?</h1>
                        <br />
                        <p>
                          If you decide to leave this page without confirming
                          your changes, the changes made to your profile will be
                          discarded and your profile will be reverted to its
                          previous state.
                        </p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className="margin"
                        margin
                        fitwidth
                        onClick={onCancel}
                      >
                        Cancel
                      </Button>
                      <Button type="destructive" onClick={onConfirm}>
                        Discard changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                );
              }
            }}
          </NavigationPrompt>
        ) : (
          ''
        )}
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
