/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react';
import { storiesOf } from '@storybook/react';
import SearchSelect from '.';

storiesOf('SearchSelect', module)
.add('Mi Fora', () => (
  <div sx={{ width: '50vw', pt: 3, pl: 5 }}>
    <SearchSelect handleSelect={(option) => alert(option)} options={['React', 'HTML', 'CSS']} placeholder='Placeholder..' />
  </div>
  )
)

  .add('Scrollable', () => (
  <div sx={{ width: '50vw', pt: 3, pl: 5 }}>
    <SearchSelect handleSelect={(option) => alert(option)} options={['React', 'HTML', 'CSS', 'JavaScript', 'Rust', 'Clojure']} placeholder='Placeholder..' />
  </div>
  )
)