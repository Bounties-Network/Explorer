import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from '../components/ProgressBar';
import PageBanner from '../components/PageBanner';
import { Text } from 'components';

storiesOf('ProgressBar', module).add('with Edit Profile', () => (
  <div>
    <p className="progressBarMarginsMediaum" />
    <Text type="H3">
      Small Margin/Size Progress Bar With Heading and Percent
    </Text>
    <ProgressBar
      heading="Profile Stength"
      percentage={60}
      margin="small"
      size="small"
      width="small"
    />
    <p className="progressBarMarginsMediaum" />
    <Text type="H3">
      Medium Margin/Size Progress Bar With Heading and Percent
    </Text>
    <ProgressBar
      heading="Profile Stength"
      percentage={60}
      width="300px"
      margin="medium"
      size="medium"
    />
    <p className="progressBarMarginsMediaum" />
    <Text type="H3">
      Large Margin/Size Progress Bar Without Heading and Percent
    </Text>
    <ProgressBar
      percentage={60}
      showPercent={false}
      margin="large"
      size="large"
    />
    <p className="progressBarMarginsMediaum" />
    <Text type="H3">Profile Progress Bar using PageBanner</Text>
    <PageBanner>
      <ProgressBar
        heading="Profile Stength"
        percentage={60}
        margin="small"
        size="small"
      />
    </PageBanner>
  </div>
));
