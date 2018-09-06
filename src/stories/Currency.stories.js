import React from 'react';
import styles from '../styles/storybook.scss';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Currency } from 'components';

storiesOf('Currency', module).add('Currency display', () => (
  <div class="sb-page-wrapper">
    <Currency primaryValue="100" secondaryValue="1" />
  </div>
));
