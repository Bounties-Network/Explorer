import React from 'react';
import styles from './IssueRatingFormModal.module.scss';
import { Button, Modal, Text } from 'components';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { FormTextInput } from 'form-components';

const KillBountyFormModal = props => {
  const {
    onClose,
    handleSubmit,
    type,
    bounty,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        dismissable={true}
        onClose={onClose}
        visible={true}
        fixed
        size="small"
      >
        <Modal.Header closable={true}>
          <Modal.Message>
            <div className={styles.bountyInfoContainer}>
              <div className={`row ${styles.centerBountyInfo}`}>
                <div className="col-xs-10">
                  <div className={styles.bountyInfo}>
                    <div className="row">
                      <div className="col-xs-12">
                        <div className={`${styles.rowText} ${styles.detailsGroup}`}>
                          <Text
                            inline
                            typeScale="h5"
                            weight="fontWeight-medium"
                          >
                            {bounty.title}
                          </Text>
                          <Text
                            inline
                            color="purple"
                            typeScale="h5"
                            weight="fontWeight-medium"
                            className={styles.usd}
                          >
                            ${bounty.usd_price.toFixed(0)}
                          </Text>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <div className={styles.rowText}>
                          <Text
                            inline
                            typeScale="Small"
                            color="defaultGrey"
                            className={styles.details}
                          >
                            {`Created bleh`}
                          </Text>
                          <Text
                            inline
                            color="defaultGrey"
                            typeScale="Small"
                            className={styles.usd}
                          >
                            {`500 ETH`}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            Rate {type}
          </Modal.Message>
          <Modal.Description>
            {type}
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody} />
        <Modal.Footer>
          <Button
            margin
            onClick={e => {
              e.preventDefault();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button type="destructive">Kill</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default reduxForm({ form: 'killBounty' })(KillBountyFormModal);
