import React from 'react';
import styles from './CreateBounty.module.scss';
import { PageCard } from 'explorer-components';
import { Text, TextInput } from 'components';

const CreateBounty = props => {
  return (
    <PageCard>
      <PageCard.Header>
        <PageCard.Title>Create Bounty</PageCard.Title>
      </PageCard.Header>
      <PageCard.Content className={styles.cardContent}>
        <div className="row">
          <div className="col-xs-3">
            <Text
              color="defaultGrey"
              typeScale="Body"
              weight="fontWeight-medium"
            >
              ABOUT
            </Text>
          </div>
          <div className="col-xs-9">
            <Text typeScale="H4" weight="fontWeight-bold">
              Enter your details about this bounty.
            </Text>
            <Text className={styles.subText} color="defaultGrey">
              Enter a title and description for your bounty. A markdown preview
              will automatically be generated as you type, which you can view by
              clicking the preview button.
            </Text>
            <div className={styles.inputBlock}>
              <TextInput label="Title" placeholder="Enter title..." />
            </div>
          </div>
        </div>
        <div className="row" />
      </PageCard.Content>
    </PageCard>
  );
};

export default CreateBounty;
