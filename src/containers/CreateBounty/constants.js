import React from 'react';
import Text from 'components/Text';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import css from '@styled-system/css';
import styled from 'lib/emotion-styled';
import { Flex } from 'rebass';
import { textAlign } from 'styled-system';

const OptionContainer = styled(Flex)(props =>
  css({
    '> *:first-child': {
      mr: 2,
      minWidth: '1.25rem',
      textAlign: 'left'
    }
  })
);

export const DIFFICULTY_OPTIONS = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Expert', label: 'Expert' }
];

// true and false to correspond with paysTokens field on the bounty model
export const PAYOUT_OPTIONS = [
  { value: false, label: 'ETH' },
  { value: true, label: 'ERC20 Token' }
];

// true and false to corresponds with activateNow
export const ACTIVATE_OPTIONS = [
  { value: true, label: 'Now' },
  { value: false, label: 'Later' }
];

export const VISIBILITY_OPTIONS = [
  { value: false, label: 'Public' },
  { value: true, label: 'Hidden' }
];

export const APPROVAL_OPTIONS = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

export const UPLOAD_KEY = 'createBounty';

export const templates = [
  {
    value: 'default',
    about:
      'The default description template provides a simple and multi-purpose template for writing well structured and clear instructions for potential fulfillers.',
    description: ''
  },
  { value: 'proof-of-action', label: 'Proof of Action' },
  { value: 'code', label: 'Code' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'translation', label: 'Translation' },
  { value: 'idea-generation', label: 'Idea Generation' },
  { value: 'feedback-and-critique', label: 'Feedback & Critique' },
  { value: 'survey', label: 'Survey' },
  { value: 'recruitment', label: 'Recruitment' }
];

export const templateOptions = [
  {
    value: 'default',
    label: (
      <OptionContainer alignItems="center">
        <FontAwesomeIcon icon={['far', 'file-alt']} color="gray" />
        <Text>Default</Text>
      </OptionContainer>
    )
  },
  {
    value: 'proof-of-action',
    label: (
      <OptionContainer alignItems="center">
        <FontAwesomeIcon icon={['far', 'vote-yea']} color="gray" />
        <Text>Proof of Action</Text>
      </OptionContainer>
    )
  },
  {
    value: 'code',
    label: (
      <OptionContainer alignItems="center">
        <FontAwesomeIcon icon={['far', 'code']} color="gray" />
        <Text>Code</Text>
      </OptionContainer>
    )
  },
  {
    value: 'graphic-design',
    label: (
      <OptionContainer alignItems="center">
        <FontAwesomeIcon icon={['far', 'pencil-paintbrush']} color="gray" />
        <Text>Graphic Design</Text>
      </OptionContainer>
    )
  },
  {
    value: 'translation',
    label: (
      <OptionContainer alignItems="center">
        <FontAwesomeIcon icon={['far', 'language']} color="gray" />
        <Text>Translation</Text>
      </OptionContainer>
    )
  },
  {
    value: 'idea-generation',
    label: (
      <OptionContainer alignItems="center">
        <FontAwesomeIcon icon={['far', 'lightbulb']} color="gray" />
        <Text>Idea Generation</Text>
      </OptionContainer>
    )
  },
  {
    value: 'feedback-and-critique',
    label: (
      <OptionContainer alignItems="center">
        <FontAwesomeIcon icon={['far', 'comments']} color="gray" />
        <Text>Feedback & Critique</Text>
      </OptionContainer>
    )
  },
  {
    value: 'survey',
    label: (
      <OptionContainer alignItems="center">
        <FontAwesomeIcon icon={['far', 'file-signature']} color="gray" />
        <Text>Survey</Text>
      </OptionContainer>
    )
  },
  {
    value: 'recruitment',
    label: (
      <OptionContainer alignItems="center">
        <FontAwesomeIcon icon={['far', 'users']} color="gray" />
        <Text>Recruitement</Text>
      </OptionContainer>
    )
  }
];
