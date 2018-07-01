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
        <Table.HeaderCell flexGrow={2}>
          <Table.HeaderText>Header 1</Table.HeaderText>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Table.HeaderText>Header 2</Table.HeaderText>
        </Table.HeaderCell>
        <Table.HeaderCell flexGrow={3}>
          <Table.HeaderText>Header 3</Table.HeaderText>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Table.HeaderText>Header 4</Table.HeaderText>
        </Table.HeaderCell>
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
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%'
            }}
          >
            This is a flexgrow 2 field.
          </div>
        </Table.Cell>
        <Table.Cell headerText="Header 2">Cell 2</Table.Cell>
        <Table.Cell headerText="Header 3" flexGrow={3}>
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%'
            }}
          >
            This is a flexgrow 3 field.
          </div>
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
