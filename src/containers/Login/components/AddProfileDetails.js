import React from 'react';
import PropTypes from 'prop-types';
import styles from './baseStyles.module.scss';
import UserSettings from 'containers/Settings/UserSettings';
import { Modal, Button } from 'components';
import { PageCard } from 'explorer-components';
import intl from 'react-intl-universal';

class AddProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFormVisible: false };
  }

  showForm = () => {
    this.setState({ isFormVisible: true });
  };

  onClose = () => {
    this.setState({ isFormVisible: false });
    this.props.onClose();
  };

  render() {
    const { visible } = this.props;
    const { isFormVisible } = this.state;

    if (isFormVisible) {
      return (
        <Modal
          visible={visible}
          size="large"
          dismissable
          onClose={this.onClose}
        >
          <Modal.Header closable icon="profile">
            <Modal.Heading>
              {intl.get('sections.login.modals.details.title')}
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <Modal.Description>
              {intl.get('sections.login.modals.details.description')}
            </Modal.Description>

            <PageCard.Break />
            <div className={styles.alignLeft}>
              <UserSettings onboarding={true} onClose={this.onClose} />
            </div>
          </Modal.Body>
        </Modal>
      );
    }

    return (
      <Modal visible={visible} size="small" dismissable onClose={this.onClose}>
        <Modal.Header closable icon="profile">
          <Modal.Heading>
            {intl.get('sections.login.modals.details.title')}
          </Modal.Heading>
        </Modal.Header>
        <Modal.Body>
          <Modal.Description>
            {intl.getHTML('sections.login.modals.details.description2')}
          </Modal.Description>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onClose} margin>
            {intl.get('sections.login.modals.details.actions.skip')}
          </Button>
          <Button type="primary" onClick={this.showForm}>
            {intl.get('sections.login.modals.details.actions.add')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddProfileDetails.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

export default AddProfileDetails;
