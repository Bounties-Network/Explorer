import React from 'react';
import styles from './CreateBounty.module.scss';
import { PageCard, FormSection } from 'explorer-components';
import { Text, TextInput, MarkdownEditor } from 'components';

const CreateBounty = props => {
  return (
    <PageCard>
      <PageCard.Header>
        <PageCard.Title>Create Bounty</PageCard.Title>
      </PageCard.Header>
      <PageCard.Content className={styles.cardContent}>
        <FormSection>
          <FormSection.Section title="ABOUT">
            <FormSection.Description>
              Enter your details about this bounty.
            </FormSection.Description>
            <FormSection.SubText>
              Enter a title and description for your bounty. A markdown preview
              will automatically be generated as you type, which you can view by
              clicking the preview button.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <TextInput label="Title" placeholder="Enter Title..." />
            </FormSection.InputGroup>
            <FormSection.InputGroup>
              <div className={styles.markdownEditor}>
                <MarkdownEditor label="Description" />
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="CONTACT">
            <FormSection.Description>
              Who will be the primary contact for bounty questions and
              submissions?
            </FormSection.Description>
          </FormSection.Section>
        </FormSection>
      </PageCard.Content>
    </PageCard>
  );
};

export default CreateBounty;
