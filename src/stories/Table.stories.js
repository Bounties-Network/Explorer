import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Table, Text } from 'components';

storiesOf('Table', module).add('Table', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Table
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Table components are used to render tables in different ways.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular table
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A basic Table consists consists of a header and multiple rows. <br />
      <br />
      The header is determined by the <code>Table.Header</code> subcomponent,
      which contains several <code>Table.HeaderCell</code> subcomponents, each
      one with the HTML for each header.<br />
      <br />
      The rows are composed by a <code>Table.Row</code> subcomponent, and each
      cell inside the row is determined using the <code>Table.Cell</code>{' '}
      subcomponent.
    </Text>

    <div className="sb-component-group sb-button-group">
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

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Table Header Cell
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The header of a Table is determined using <code>Table.Header</code>{' '}
      subcomponent. <br />
      Inside, it must contain several <code>Table.HeaderCell</code> elements.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Table>
        <Table.Header>
          <Table.HeaderCell>Header 1</Table.HeaderCell>
          <Table.HeaderCell>Header 2</Table.HeaderCell>
          <Table.HeaderCell>Header 3</Table.HeaderCell>
          <Table.HeaderCell>Header 4</Table.HeaderCell>
        </Table.Header>
      </Table>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>flexBasis</code> prop will determine the CSS flex-basis property
      of that specific cell.
    </Text>
    <div className="sb-component-group sb-button-group">
      <Table>
        <Table.Header>
          <Table.HeaderCell flexBasis="20%">Header 1 (20%)</Table.HeaderCell>
          <Table.HeaderCell flexBasis="30%">Header 2 (30%)</Table.HeaderCell>
          <Table.HeaderCell flexBasis="40%">Header 3 (40%)</Table.HeaderCell>
          <Table.HeaderCell flexBasis="50%">Header 4 (50%)</Table.HeaderCell>
        </Table.Header>
      </Table>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>flexGrow</code> prop will determine the CSS flex-grow property
      of that specific cell.
    </Text>
    <div className="sb-component-group sb-button-group">
      <Table>
        <Table.Header>
          <Table.HeaderCell flexGrow="20%">Header 1 (20%)</Table.HeaderCell>
          <Table.HeaderCell flexGrow="30%">Header 2 (30%)</Table.HeaderCell>
          <Table.HeaderCell flexGrow="40%">Header 3 (40%)</Table.HeaderCell>
          <Table.HeaderCell flexGrow="50%">Header 4 (50%)</Table.HeaderCell>
        </Table.Header>
      </Table>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>contentType</code> prop will determine the content type of the
      cell. It must be either <code>numerical</code> or{' '}
      <code>nonNumerical</code>. The default value is <code>nonNumerical</code>.
    </Text>
    <div className="sb-component-group sb-button-group">
      <Table>
        <Table.Header>
          <Table.HeaderCell flexGrow="25%">Text</Table.HeaderCell>
          <Table.HeaderCell flexGrow="25%" contentType="numerical">
            2
          </Table.HeaderCell>
          <Table.HeaderCell flexGrow="25%">Text</Table.HeaderCell>
          <Table.HeaderCell flexGrow="25%" contentType="numerical">
            4
          </Table.HeaderCell>
        </Table.Header>
      </Table>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Table Row
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Each is a <code>Table.Row</code> element, which must contain several{' '}
      <code>Table.Cell</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Table>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The prop <code>hover</code> will determine if the row will be highlighted
      when the user hovers it. The default value is <code>false</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Table>
        <Table.Row hover>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row hover>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Table Cell
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The subcomponent <code>Table.Cell</code> element accepts several
      properties as well.
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>flexBasis</code> prop will determine the CSS flex-basis property
      of that specific cell.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Table>
        <Table.Row>
          <Table.Cell flexBasis="20%">Cell 1 (20%)</Table.Cell>
          <Table.Cell flexBasis="30%">Cell 2 (30%)</Table.Cell>
          <Table.Cell flexBasis="40%">Cell 3 (40%)</Table.Cell>
          <Table.Cell flexBasis="50%">Cell 4 (50%)</Table.Cell>
        </Table.Row>
      </Table>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>flexGrow</code> prop will determine the CSS flex-grow property
      of that specific cell.
    </Text>
    <div className="sb-component-group sb-button-group">
      <Table>
        <Table.Row>
          <Table.Cell flexGrow="20%">Cell 1 (20%)</Table.Cell>
          <Table.Cell flexGrow="30%">Cell 2 (30%)</Table.Cell>
          <Table.Cell flexGrow="40%">Cell 3 (40%)</Table.Cell>
          <Table.Cell flexGrow="50%">Cell 4 (50%)</Table.Cell>
        </Table.Row>
      </Table>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>contentType</code> prop will determine the content type of the
      cell. It must be either <code>numerical</code> or{' '}
      <code>nonNumerical</code>. The default value is <code>nonNumerical</code>.
    </Text>
    <div className="sb-component-group sb-button-group">
      <Table>
        <Table.Row>
          <Table.Cell contentType="numerical">1</Table.Cell>
          <Table.Cell contentType="numerical">2</Table.Cell>
          <Table.Cell>Cell 3</Table.Cell>
          <Table.Cell>Cell 4</Table.Cell>
        </Table.Row>
      </Table>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>headerText</code> prop will specify the header under which this
      cell appears.
    </Text>
    <div className="sb-component-group sb-button-group">
      <Table>
        <Table.Header>
          <Table.HeaderCell>Header 1</Table.HeaderCell>
          <Table.HeaderCell>Header 2</Table.HeaderCell>
          <Table.HeaderCell>Header 3</Table.HeaderCell>
          <Table.HeaderCell>Header 4</Table.HeaderCell>
        </Table.Header>
        <Table.Row>
          <Table.Cell headerText="Header 1">Cell 1</Table.Cell>
          <Table.Cell headerText="Header 2">Cell 1</Table.Cell>
          <Table.Cell headerText="Header 3">Cell 1</Table.Cell>
          <Table.Cell headerText="Header 4">Cell 1</Table.Cell>
        </Table.Row>
      </Table>
    </div>
  </div>
));
