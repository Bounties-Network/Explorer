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
        <Table.HeaderCell flexGrow={2}>Header 1</Table.HeaderCell>
        <Table.HeaderCell>Header 2</Table.HeaderCell>
        <Table.HeaderCell flexGrow={3}>Header 3</Table.HeaderCell>
        <Table.HeaderCell>Header 4</Table.HeaderCell>
      </Table.Header>
      <Table.Row hover>
        <Table.Cell headerText="Header 1" flexGrow={2}>
          Cell 1
        </Table.Cell>
        <Table.Cell headerText="Header 2">Cell 2</Table.Cell>
        <Table.Cell headerText="Header 3" flexGrow={3}>
          Cell 3
        </Table.Cell>
        <Table.Cell headerText="Header 4">Cell 4</Table.Cell>
      </Table.Row>
      <Table.Row hover>
        <Table.Cell headerText="Header 1" flexGrow={2}>
          This is a flexgrow 2 field. It will grow faster than other columns.
        </Table.Cell>
        <Table.Cell headerText="Header 2">Cell 2</Table.Cell>
        <Table.Cell headerText="Header 3" flexGrow={3}>
          This is a flexgrow 3 field. It will grow faster than other columns,
          particularly faster than the flexgrow2 field.
        </Table.Cell>
        <Table.Cell headerText="Header 4">Cell 4</Table.Cell>
      </Table.Row>
      <Table.Row hover>
        <Table.Cell headerText="Header 1" flexGrow={2}>
          Cell 1
        </Table.Cell>
        <Table.Cell headerText="Header 2">Cell 2</Table.Cell>
        <Table.Cell headerText="Header 3" flexGrow={3}>
          Cell 3
        </Table.Cell>
        <Table.Cell headerText="Header 4">Cell 4</Table.Cell>
      </Table.Row>
    </Table>
  </div>
));
