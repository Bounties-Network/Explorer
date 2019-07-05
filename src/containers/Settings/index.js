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
                    size="medium"
                    fixed
                    visible={true}
                    onClose={onCancel}
                  >
                    <Modal.Header closable>
                      <Modal.Message>
                        {intl.get(
                          'sections.settings.modals.unsaved_changes.title'
                        )}
                      </Modal.Message>
                    </Modal.Header>
                    <Modal.Body>
                      <Modal.Description>
                        {intl.get(
                          'sections.settings.modals.unsaved_changes.description'
                        )}
                      </Modal.Description>
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
