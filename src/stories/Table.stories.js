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
        <Table.HeaderCell flexBasis="30%">Header 1</Table.HeaderCell>
        <Table.HeaderCell flexBasis="15%">Header 2</Table.HeaderCell>
        <Table.HeaderCell flexBasis="40%">Header 3</Table.HeaderCell>
        <Table.HeaderCell flexBasis="15%">Header 4</Table.HeaderCell>
      </Table.Header>
      <Table.Row hover>
        <Table.Cell headerText="Header 1" flexBasis="30%">
          Cell 1
        </Table.Cell>
        <Table.Cell headerText="Header 2" flexBasis="15%">
          Cell 2
        </Table.Cell>
        <Table.Cell headerText="Header 3" flexBasis="40%">
          Cell 3
        </Table.Cell>
        <Table.Cell headerText="Header 4" flexBasis="15%">
          Cell 4
        </Table.Cell>
      </Table.Row>
      <Table.Row hover>
        <Table.Cell headerText="Header 1" flexBasis="30%">
          This is a flexgrow 2 field.
        </Table.Cell>
        <Table.Cell headerText="Header 2" flexBasis="15%">
          Cell 2
        </Table.Cell>
        <Table.Cell headerText="Header 3" flexBasis="40%">
          This is a flexgrow 3 field.
        </Table.Cell>
        <Table.Cell headerText="Header 4" flexBasis="15%">
          Cell 4
        </Table.Cell>
      </Table.Row>
      <Table.Row hover>
        <Table.Cell headerText="Header 1" flexBasis="30%">
          Cell 1
        </Table.Cell>
        <Table.Cell headerText="Header 2" flexBasis="15%">
          Cell 2
        </Table.Cell>
        <Table.Cell headerText="Header 3" flexBasis="40%">
          Cell 3
        </Table.Cell>
        <Table.Cell headerText="Header 4" flexBasis="15%">
          Cell 4
        </Table.Cell>
      </Table.Row>
    </Table>
  </div>
));
