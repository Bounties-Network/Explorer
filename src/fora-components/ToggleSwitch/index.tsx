/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Switch } from '@chakra-ui/core' 

const ToggleSwitch: React.FunctionComponent<{ isChecked, onChange: any, size?: string }> = (props) => (
  <Switch {...props} sx={{
    bg:
      props.isChecked ? 'seaGlass300' : 'gray200',
    boxShadow: 3, borderRadius: '100px',
    '> *': { borderRadius: '100px' },
    '> * > *': {
      borderRadius: '50%',
      mixBlendMode: 'normal', boxShadow: 0,
      bg: 'white'
    }
  }}>

  </Switch>
)

export default ToggleSwitch