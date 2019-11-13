/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Button } from 'rebass'

interface IProps { onClick: any }

const UploadButton: React.FunctionComponent<IProps> = (props) => (
  <Button onClick={props.onClick} variant="upload">
    Upload
  </Button>
)

export default UploadButton