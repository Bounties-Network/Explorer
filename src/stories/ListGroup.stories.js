import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ListGroup, Text } from 'components';

storiesOf('ListGroup', module).add('ListGroup', () => (
  <div>
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Basic List Group</Text>
    <div style={{ marginTop: '10px' }} />
    <ListGroup>
      <ListGroup.ListItem hover>List Item 1</ListGroup.ListItem>
      <ListGroup.ListItem hover>List Item 2</ListGroup.ListItem>
      <ListGroup.ListItem hover>List Item 3</ListGroup.ListItem>
    </ListGroup>
  </div>
));
