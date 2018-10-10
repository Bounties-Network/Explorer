import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PageBanner from '../components/PageBanner';
import { Text, Button, ProgressBar } from 'components';

storiesOf('PageBanner', module).add('with ProgressBar', () => (
  <div>
    <Text type="H3">PageBanner With ProgressBar, Edit and Close Buttons</Text>
    <br />
    <br />
    <PageBanner>
      <span style={{ width: '50px' }} />
      <ProgressBar heading="Profile Strength" percentage={75} />
      <span style={{ width: '20px' }} />
      <span className="width-stretch">
        <Button onClick={action('Edit clicked')} type="link">
          Edit Profile
        </Button>
        <span style={{ float: 'right' }}>
          <Button onClick={action('Close clicked')} type="link">
            x
          </Button>
        </span>
      </span>
    </PageBanner>
    <br />
    <br />
    <br />
    <Text type="H3">
      Light Blue PageBanner With ProgressBar, Edit and Close Buttons
    </Text>
    <br />
    <br />
    <PageBanner background="lightblue">
      <span style={{ width: '50px' }} />
      <ProgressBar heading="Profile Strength" percentage={75} />
      <span style={{ width: '20px' }} />
      <span className="width-stretch">
        <Button onClick={action('Edit clicked')} type="link">
          Edit Profile
        </Button>
        <span style={{ float: 'right' }}>
          <Button onClick={action('Close clicked')} type="link">
            x
          </Button>
        </span>
      </span>
    </PageBanner>
    <br />
    <br />
    <br />
    <Text type="H3">
      30px PageBanner With ProgressBar, Edit and Close Buttons
    </Text>
    <br />
    <br />
    <PageBanner height="30px">
      <span style={{ width: '50px' }} />
      <ProgressBar heading="Profile Strength" percentage={75} />
      <span style={{ width: '20px' }} />
      <span className="width-stretch">
        <Button onClick={action('Edit clicked')} type="link">
          Edit Profile
        </Button>
        <span style={{ float: 'right' }}>
          <Button onClick={action('Close clicked')} type="link">
            x
          </Button>
        </span>
      </span>
    </PageBanner>
    <br />
    <br />
    <br />
    <Text type="H3">
      750px Wide PageBanner With ProgressBar, Edit and Close Buttons
    </Text>
    <br />
    <br />
    <PageBanner width="750px">
      <span style={{ width: '50px' }} />
      <ProgressBar heading="Profile Strength" percentage={75} />
      <span style={{ width: '20px' }} />
      <span className="width-stretch">
        <Button onClick={action('Edit clicked')} type="link">
          Edit Profile
        </Button>
        <span style={{ float: 'right' }}>
          <Button onClick={action('Close clicked')} type="link">
            x
          </Button>
        </span>
      </span>
    </PageBanner>
  </div>
));
