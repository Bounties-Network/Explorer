/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Flex } from '@theme-ui/components'
import { IMainProps } from './Main'
import { IHeaderProps } from './Header'
import { IAttachmentProps } from './Attachment'

type SubmissionProps = IMainProps & IAttachmentProps & IHeaderProps

const Submission: React.FunctionComponent<SubmissionProps> = (props) => (
  <Flex>Hello world</Flex>
)

export default Submission