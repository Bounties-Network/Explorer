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
        <Table.HeaderCell>
          <Table.HeaderText>Header 1</Table.HeaderText>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Table.HeaderText>Header 2</Table.HeaderText>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Table.HeaderText>Header 3</Table.HeaderText>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Table.HeaderText>Header 4</Table.HeaderText>
        </Table.HeaderCell>
      </Table.Header>
      <Table.Row hover>
        <Table.Cell>Cell 1</Table.Cell>
        <Table.Cell>Cell 2</Table.Cell>
        <Table.Cell>Cell 3</Table.Cell>
        <Table.Cell>Cell 4</Table.Cell>
      </Table.Row>
      <Table.Row hover>
        <Table.Cell>Cell 1</Table.Cell>
        <Table.Cell>Cell 2</Table.Cell>
        <Table.Cell>Cell 3</Table.Cell>
        <Table.Cell>Cell 4</Table.Cell>
      </Table.Row>
      <Table.Row hover>
        <Table.Cell>Cell 1</Table.Cell>
        <Table.Cell>Cell 2</Table.Cell>
        <Table.Cell>Cell 3</Table.Cell>
        <Table.Cell>Cell 4</Table.Cell>
      </Table.Row>
    </Table>
  </div>
));
