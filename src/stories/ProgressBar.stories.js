import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from '../components/ProgressBar';
import styles from '../components/ProgressBar/ProgressBar.module.scss';
import PageBanner from '../components/PageBanner';
import { Text } from 'components';

storiesOf('ProgressBar', module).add('with Edit Profile', () => (
  <div>
    {/* <p className={styles.progressBarMarginMedium} /> */}
    <Text typeScale="Body">
      Small Margin/Size Progress Bar With Heading and Percent
    </Text>
    <ProgressBar
      heading="Profile Stength"
      percentage={60}
      margin="small"
      size="small"
      width="small"
    />
    <p className={styles.progressBarMarginMedium} />
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
    <p className={styles.progressBarMarginMedium} />
    <Text type="H3">
      Large Margin/Size Progress Bar Without Heading and Percent
    </Text>
    <ProgressBar
      percentage={60}
      showPercent={false}
      margin="large"
      size="large"
    />
    <p className={styles.progressBarMarginMedium} />
    <Text type="H3">Profile Progress Bar using PageBanner</Text>
    <PageBanner margin="medium">
      <ProgressBar
        heading="Profile Stength"
        percentage={60}
        margin="small"
        size="small"
      />
    </PageBanner>
  </div>
));
