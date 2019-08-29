import React from 'react';
import Text from 'components/Text';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import css from '@styled-system/css';
import styled from 'lib/emotion-styled';
import { Flex } from 'rebass';

const OptionContainer = styled(Flex)(props =>
  css({
    '> *:first-child': {
      mr: 2
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
  { value: 'idea-generation', label: 'Idea Generation' },
  { value: 'feedback-and-critique', label: 'Feedback & Critique' },
  { value: 'survey', label: 'Survey' },
  { value: 'recruitment', label: 'Recruitment' }
];

export const templateOptions = [
  { value: 'default', label: 'Default' },
  {
    value: 'proof-of-action',
    label: (
      <OptionContainer alignItems="center">
        <FontAwesomeIcon icon={['far', 'search']} />
        <Text>Proof of Action</Text>
      </OptionContainer>
    )
  },
  { value: 'code', label: 'Code' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'idea-generation', label: 'Idea Generation' },
  {
    value: 'feedback-and-critique',
    label: 'Feedback & Critique'
  },
  { value: 'survey', label: 'Survey' },
  { value: 'recruitment', label: 'Recruitment' }
];
