import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ZeroState, Text, Card } from 'components';

storiesOf('ZeroState', module).add('ZeroState', () => (
  <div style={{ margin: '10px', width: '500px' }}>
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Zero State No Action</Text>
    <div style={{ marginTop: '10px' }} />
    <Card>
      <Card.Body>
        <div style={{ padding: '20px 50px' }}>
          <ZeroState
            title={'You have 0 active bounties'}
            text={
              "It looks like you don't have any active bounties at the moment. Enter a title for a new bounty here to get started creating one!"
            }
          />
        </div>
      </Card.Body>
    </Card>
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Zero State Action</Text>
    <div style={{ marginTop: '10px' }} />
    <Card>
      <Card.Body>
        <div style={{ padding: '20px 50px' }}>
          <ZeroState
            title={'You have 0 active bounties'}
            text={
              "It looks like you don't have any active bounties at the moment. Enter a title for a new bounty here to get started creating one!"
            }
            action
            actionText={'Create new bounty'}
          />
        </div>
      </Card.Body>
    </Card>
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Custom Icon</Text>
    <div style={{ marginTop: '10px' }} />
    <Card>
      <Card.Body>
        <div style={{ padding: '20px 50px' }}>
          <ZeroState
            title={'You have 0 active bounties'}
            text={
              "It looks like you don't have any active bounties at the moment. Enter a title for a new bounty here to get started creating one!"
            }
            action
            actionText={'Create new bounty'}
            icon={['fal', 'trophy-alt']}
          />
        </div>
      </Card.Body>
    </Card>
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Error Type</Text>
    <div style={{ marginTop: '10px' }} />
    <Card>
      <Card.Body>
        <div style={{ padding: '20px 50px' }}>
          <ZeroState
            type="error"
            title={'You have 0 active bounties'}
            text={
              "It looks like you don't have any active bounties at the moment. Enter a title for a new bounty here to get started creating one!"
            }
            icon={['fal', 'exclamation-triangle']}
          />
        </div>
      </Card.Body>
    </Card>
  </div>
));
