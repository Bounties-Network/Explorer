/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react';
import { storiesOf } from '@storybook/react';
import SearchSelect from '.';
import Pill from 'fora-components/Pill'
import { Text } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
import css from "@styled-system/css";

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
  .add('Scrollable Tag example', () => {
    const [state, setState] = React.useState<string[]>([])
  return (
    <div sx={{ width: '50vw', pt: 3, pl: 5 }}>
      <SearchSelect handleSelect={(option: string) => setState(state.concat(option))} options={['React', 'HTML', 'CSS', 'JavaScript', 'Rust', 'Clojure']} placeholder='Placeholder..' />
      <div sx={{ display: 'flex', '> :not(:last-of-type)': { mr: 2 }, mt: 3 }}>
        {state.map((option) =>
          <div sx={{ cursor: 'pointer' }} onClick={() => setState(
            state.filter(x => x !== option)
          )}>
            <Pill css={css({ height: 'unset' })} variant="pill.tag.explorer">
              <div sx={{ minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', '> :first-of-type': { mr: 2 } }}>
              <Text color={'gray.400'} variant='body'>{option}</Text>
              <FontAwesomeIcon sx={{ color: 'seaGlass.300' }} icon={faTimes}></FontAwesomeIcon>
              </div>
            </Pill>
        </div>
        )}
      </div>
    </div>
    )
}
)