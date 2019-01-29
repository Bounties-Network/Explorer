import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Text, Button, ToastContainer, Toast } from 'components';

storiesOf('Toast', module).add('Toast', () => (
  <div className="sb-page-wrapper">
    <ToastContainer />

    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Toasts
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Toasts are quick messages that appear on top of the user's screen.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      ToastContainer
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The ToastContainer is a component that must be included in order to use
      the <code>Toast</code> function. It accepts no props.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Toast
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The Toast function must be called to make the Toast appear. <br />
      <br />
      It accepts three arguments:{' '}
      <code>Toast(type, message, link, onClose)</code>
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The first argument will determine the Toast type. It can be one of four
      types: <br />
      <br />
      * <code>Toast.TYPE.NOTIFICATION</code>
      <br />
      * <code>Toast.TYPE.SUCCESS</code>
      <br />
      * <code>Toast.TYPE.ERROR</code>
      <br />
      * <code>Toast.TYPE.TRANSACTION</code>
      <br />
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The second argument will determine the Toast message. It does not accept
      HTML.
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The third argument will determine the Toast link.
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The fourth argument will is a function that will be fired whenever the
      user clicks on the close button.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Button
        onClick={() =>
          Toast(
            Toast.TYPE.SUCCESS,
            'Submission accepted',
            'Rate Issuer',
            action('closed')
          )
        }
      >
        Success Toast
      </Button>
      <Button
        onClick={() =>
          Toast(Toast.TYPE.ERROR, 'Image Save Failed', 'Try Again')
        }
      >
        Error Toast
      </Button>
      <Button
        onClick={() =>
          Toast(Toast.TYPE.NOTIFICATION, 'Submission Received', 'View Bounty')
        }
      >
        Notification Toast
      </Button>
      <Button
        onClick={() =>
          Toast(
            Toast.TYPE.TRANSACTION,
            'Processing transaction',
            'View on etherscan'
          )
        }
      >
        Transaction Toast
      </Button>
    </div>
  </div>
));
