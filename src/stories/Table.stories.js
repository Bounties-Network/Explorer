import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Table, Text } from 'components';

storiesOf('Table', module).add('Table', () => (
  <div>
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Basic Table</Text>
    <div style={{ marginTop: '10px' }} />
    <Table>
      <Table.Header>
        <Table.HeaderCell>Header 1</Table.HeaderCell>
        <Table.HeaderCell>Header 2</Table.HeaderCell>
        <Table.HeaderCell>Header 3</Table.HeaderCell>
        <Table.HeaderCell>Header 4</Table.HeaderCell>
      </Table.Header>
      <Table.Row>
        <Table.Cell>Cell 1</Table.Cell>
        <Table.Cell>Cell 2</Table.Cell>
        <Table.Cell>Cell 3</Table.Cell>
        <Table.Cell>Cell 4</Table.Cell>
      </Table.Row>
    </Table>
  </div>
));
