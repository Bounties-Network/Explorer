import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PageBanner from '../components/PageBanner';
import styles from '../components/PageBanner/PageBanner.module.scss';
import { Text, Button, ProgressBar } from 'components';

storiesOf('PageBanner', module).add('with ProgressBar', () => (
  <div>
    <Text type="H3">PageBanner With ProgressBar, Edit and Close Buttons</Text>
    <p className={styles.pageBannerMarginMedium} />
    <PageBanner onClose={action('Close clicked')}>
      <ProgressBar
        heading="Profile Strength"
        percentage={75}
        margin="medium"
        size="small"
      />
      <Button onClick={action('Edit clicked')} type="link">
        Edit Profile
      </Button>
    </PageBanner>
    <p className={styles.pageBannerMarginMedium} />
    <Text type="H3">
      Medium Margin PageBanner With ProgressBar, Edit and Close Buttons
    </Text>
    <PageBanner onClose={action('Close clicked')} margin="medium">
      <ProgressBar
        heading="Profile Strength"
        percentage={75}
        margin="medium"
        size="small"
      />
      <Button onClick={action('Edit clicked')} type="link">
        Edit Profile
      </Button>
    </PageBanner>
    <Text type="H3">
      Small Margin and Small Height PageBanner With ProgressBar, Edit and Close
      Buttons
    </Text>
    <PageBanner onClose={action('Close clicked')} margin="small" height="small">
      <ProgressBar
        heading="Profile Strength"
        percentage={75}
        margin="medium"
        size="small"
      />
      <Button onClick={action('Edit clicked')} type="link">
        Edit Profile
      </Button>
    </PageBanner>
    <Text type="H3">
      Large Margin and Medium Size PageBanner With ProgressBar, Edit and Close
      Buttons
    </Text>
    <PageBanner
      onClose={action('Close clicked')}
      margin="large"
      size="medium"
      height="medium"
    >
      <ProgressBar
        heading="Profile Strength"
        percentage={75}
        margin="medium"
        size="small"
      />
      <Button onClick={action('Edit clicked')} type="link">
        Edit Profile
      </Button>
    </PageBanner>
    <Text type="H3">
      Small Margin and Light Blue Background PageBanner With ProgressBar, Edit
      and Close Buttons
    </Text>
    <PageBanner
      onClose={action('Close clicked')}
      margin="small"
      background="lightBlue"
    >
      <ProgressBar
        heading="Profile Strength"
        percentage={75}
        margin="medium"
        size="small"
      />
      <Button onClick={action('Edit clicked')} type="link">
        Edit Profile
      </Button>
    </PageBanner>
  </div>
));
