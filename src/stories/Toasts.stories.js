import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Text, Button, ToastContainer, Toast } from 'components';

storiesOf('Toast', module).add('Toast', () => (
  <div>
    <ToastContainer newestOnTop autoClose={false} hideProgressBar draggable />
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Success Toast</Text>
    <div style={{ marginTop: '10px' }} />
    <Button
      onClick={() =>
        Toast(Toast.TYPE.SUCCESS, 'Submission accepted', 'Rate Issuer')
      }
    >
      Success Toast
    </Button>
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Error Toast</Text>
    <div style={{ marginTop: '10px' }} />
    <Button
      onClick={() => Toast(Toast.TYPE.ERROR, 'Image Save Failed', 'Try Again')}
    >
      Error Toast
    </Button>
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Notification Toast</Text>
    <div style={{ marginTop: '10px' }} />
    <Button
      onClick={() =>
        Toast(Toast.TYPE.NOTIFICATION, 'Submission Received', 'View Bounty')
      }
    >
      Notification Toast
    </Button>
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Transaction Toast</Text>
    <div style={{ marginTop: '10px' }} />
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
));
