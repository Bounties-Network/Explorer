import React from 'react';

import { storiesOf } from '@storybook/react';
import BountyTemplateDropdown from '../components/BountyTemplateDropdown';

storiesOf('BountyTemplateDropdown', module).add(
  'BountyTemplateDropdown',
  () => (
    <div className="sb-page-wrapper">
      <BountyTemplateDropdown />
    </div>
  )
);
