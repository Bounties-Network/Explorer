import React from 'react';
import styles from './CreateBounty.module.scss';
import { PageCard, FormSection } from 'explorer-components';
import {
  Text,
  TextInput,
  MarkdownEditor,
  SearchSelect,
  NumberInput,
  DatePicker,
  FileUpload
} from 'components';

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
            <FormSection.InputGroup>
              <div className="row">
                <div className="col-xs-6">
                  <TextInput label="Contact name" placeholder="Enter name..." />
                </div>
                <div className="col-xs-6">
                  <TextInput
                    label="Contact email"
                    placeholder="Enter email..."
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="DETAILS">
            <FormSection.Description>
              How should this bounty be classified?
            </FormSection.Description>
            <FormSection.SubText>
              Enter the categories and difficulty level for the bounty. Since
              difficulty can be fairly subjective, it is helpful to provide more
              details around required experience within your bounty description.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className="col-xs-6">
                  <SearchSelect label="Bounty category" />
                </div>
                <div className="col-xs-6">
                  TODO - need to rewrite radio component
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="REVISIONS">
            <FormSection.Description>
              Will you require revisions?
            </FormSection.Description>
            <FormSection.SubText>
              Enter the maximum number of revisions you may require for this
              task, in order to help set expectations for the contributors.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className="col-xs-4">
                  <NumberInput />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="ATTACHMENTS">
            <FormSection.Description>
              Does this bounty require any external assets for completion?
            </FormSection.Description>
            <FormSection.SubText>
              Attach any files or links that may be helpful as references or
              necessary for a contributor to complete the bounty.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <FileUpload />
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="DEADLINE">
            <FormSection.Description>
              When will this bounty be due?
            </FormSection.Description>
            <FormSection.SubText>
              Enter the date and time for this bounty's deadline
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className="col-xs-4">
                  <DatePicker showTimeSelect />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="PAYOUT">
            <FormSection.Description>
              Select payout method and amount.
            </FormSection.Description>
            <FormSection.SubText>
              Select the token and enter the amount you will award for
              completion of this bounty.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className="col-xs-4">Radio Group - needs rewrite</div>
                <div className="col-xs-8">
                  <TextInput
                    label="Payout amount (ETH or whole tokens)"
                    placeholder="Enter amount..."
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="SAVE OR SUBMIT">
            <FormSection.Description>
              When would you like to submit and activate the bounty?
            </FormSection.Description>
            <FormSection.SubText>
              If you wish to activate the bounty later, you can save it as a
              draft. The requirements for a bounty can only be edited while it
              is in the draft stage. At minimum, your deposit amount must match
              your payout amount.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className="col-xs-4">Radio Group - needs rewrite</div>
                <div className="col-xs-8">
                  <TextInput
                    label="Deposit amount (ETH or whole tokens)"
                    placeholder="Enter amount..."
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
        </FormSection>
      </PageCard.Content>
    </PageCard>
  );
};

export default CreateBounty;
