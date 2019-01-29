import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ZeroState, Text, Card } from 'components';

storiesOf('Card', module).add('ZeroState', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      ZeroState
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      ZeroState components are useful to let the user know that something is
      empty.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular ZeroState
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A ZeroState component goes within the <code>Card.Body</code> of a Card
      component. It must contain the props <code>title</code> and{' '}
      <code>text</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
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
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      type
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>type</code> prop will determine the type of the ZeroState. It
      can be <code>zero</code> or <code>error</code>. The default value is{' '}
      <code>zero</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Card>
        <Card.Body>
          <div style={{ padding: '20px 50px' }}>
            <ZeroState
              title={'You have 0 active bounties'}
              text={
                "It looks like you don't have any active bounties at the moment. Enter a title for a new bounty here to get started creating one!"
              }
              type="error"
            />
          </div>
        </Card.Body>
      </Card>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      icon
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>icon</code> prop will determine the icon to be displayed. It
      must be an array with a font awesome icon (e.g{' '}
      <code>['['fal', 'trophy-alt']</code>).
    </Text>

    <div className="sb-component-group sb-button-group">
      <Card>
        <Card.Body>
          <div style={{ padding: '20px 50px' }}>
            <ZeroState
              title={'You have 0 active bounties'}
              text={
                "It looks like you don't have any active bounties at the moment. Enter a title for a new bounty here to get started creating one!"
              }
              icon={['fal', 'trophy-alt']}
            />
          </div>
        </Card.Body>
      </Card>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      iconColor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>iconColor</code> prop will determine the color of the icon to be
      displayed. It must be an array with a font awesome icon (e.g{' '}
      <code>['fal', 'trophy-alt']</code>).
    </Text>

    <div className="sb-component-group sb-button-group">
      <Card>
        <Card.Body>
          <div style={{ padding: '20px 50px' }}>
            <ZeroState
              title={'You have 0 active bounties'}
              text={
                "It looks like you don't have any active bounties at the moment. Enter a title for a new bounty here to get started creating one!"
              }
              icon={['fal', 'trophy-alt']}
              iconColor="blue"
            />
          </div>
        </Card.Body>
      </Card>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      action and actionText
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>action</code> prop will determine if the ZeroState will contain
      an action. The default value is <code>false</code>. If this is true, then{' '}
      <code>actionText</code> will be the action to be made.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Card>
        <Card.Body>
          <div style={{ padding: '20px 50px' }}>
            <ZeroState
              title={'You have 0 active bounties'}
              text={
                "It looks like you don't have any active bounties at the moment. Enter a title for a new bounty here to get started creating one!"
              }
              icon={['fal', 'trophy-alt']}
              iconColor="blue"
              action
              actionText="Add a new bounty"
            />
          </div>
        </Card.Body>
      </Card>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onActionClick
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onActionClick</code> prop is a function that will be fired
      whenever the user clicks on the action.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Card>
        <Card.Body>
          <div style={{ padding: '20px 50px' }}>
            <ZeroState
              title={'You have 0 active bounties'}
              text={
                "It looks like you don't have any active bounties at the moment. Enter a title for a new bounty here to get started creating one!"
              }
              icon={['fal', 'trophy-alt']}
              iconColor="blue"
              action
              actionText="Add a new bounty"
              onActionClick={action('click')}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  </div>
));
