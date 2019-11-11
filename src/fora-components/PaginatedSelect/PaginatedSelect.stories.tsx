import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import PaginatedSelect from '.';

addDecorator(centered);

storiesOf('PaginatedSelect', module).add('Mi Fora', () => (
  <PaginatedSelect
    pageCount={9} 
  >

</PaginatedSelect>));
