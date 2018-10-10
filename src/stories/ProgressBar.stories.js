import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from '../components/ProgressBar';
import PageBanner from '../components/PageBanner';
import { Text } from 'components';

storiesOf('ProgressBar', module).add('with Edit Profile', () => (
  <div>
    <br />
    <Text type="H3">Profile Progress Bar With Heading and Percent</Text>
    <br />
    <br />
    <ProgressBar heading="Profile Stength" percentage={60} />
    <br />
    <br />
    <br />
    <Text type="H3">300px Profile Progress Bar With Heading and Percent</Text>
    <br />
    <br />
    <ProgressBar heading="Profile Stength" percentage={60} width="300px" />
    <br />
    <br />
    <br />
    <Text type="H3">Profile Progress Bar Without Heading and Percent</Text>
    <br />
    <br />
    <ProgressBar percentage={60} showPct={false} />
    <br />
    <br />
    <br />
    <Text type="H3">Profile Progress Bar using PageBanner</Text>
    <br />
    <br />
    <PageBanner>
      <ProgressBar heading="Profile Stength" percentage={60} />
    </PageBanner>
    <br />
    <br />
  </div>
));
