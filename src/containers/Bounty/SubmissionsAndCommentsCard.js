import React from 'react';
import styles from './SubmissionsAndCommentsCard.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map as fpMap } from 'lodash';
import { PageCard, FormSection } from 'explorer-components';
import { Field, reduxForm } from 'redux-form';
import { SubmissionItem } from './components';
import { Button, ListGroup, Tabs, Text } from 'components';
import { actions as settingsActions } from 'public-modules/Settings';
import { emailPreferencesSelector } from 'public-modules/Settings/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';

const map = fpMap.convert({ cap: false });

let SubmissionsAndCommentsCard = props => {
  const {
    currentTab,
    fulfillmentsData,
    comments,
    isIssuer,
    stage, // PENDING, ACCEPTED ???
    acceptSubmission,
    rate,
    showModal,
    setActiveTab,
    bounty,
    currentUser
  } = props;

  const { fulfillments } = fulfillmentsData;

  const bountyBelongsToLoggedInUser =
    currentUser && bounty.issuer === currentUser.public_address;

  const renderFulfillments = () => {
    return map(fulfillment => {
      const {
        fulfiller,
        sourceDirectoryHash,
        sourceFileName,
        accepted,
        created,
        description,
        user
      } = fulfillment;

      const { name, email, profile_image } = user;
      const submissionBelongsToLoggedInUser =
        currentUser && fulfiller === currentUser.public_address;

      return (
        <ListGroup.ListItem hover>
          <SubmissionItem
            name={name}
            email={email}
            address={fulfiller}
            img={profile_image}
            url={'add link to model in api'}
            description={description}
            dataHash={sourceDirectoryHash}
            dataFileName={sourceFileName}
            created={created}
            showAccept={bountyBelongsToLoggedInUser}
            showEdit={submissionBelongsToLoggedInUser}
          />
        </ListGroup.ListItem>
      );
    }, fulfillments);
  };

  return (
    <div>
      <Tabs
        className={styles.tabs}
        currentKey={currentTab}
        defaultActiveKey={currentTab}
        onSelect={setActiveTab}
      >
        <Tabs.Tab
          tabClassName={styles.tab}
          tabColor="lightGrey"
          tabCount={fulfillments.length}
          eventKey={'submissions'}
        >
          Submissions
        </Tabs.Tab>
        <Tabs.Tab
          tabClassName={styles.tab}
          tabColor="lightGrey"
          tabCount={fulfillments.length}
          eventKey={'comments'}
        >
          Comments
        </Tabs.Tab>
      </Tabs>

      {currentTab == 'submission' ? (
        <ListGroup>{renderFulfillments()}</ListGroup>
      ) : (
        <ListGroup>{renderFulfillments()}</ListGroup>
      )}
    </div>
  );
};

export default SubmissionsAndCommentsCard;
