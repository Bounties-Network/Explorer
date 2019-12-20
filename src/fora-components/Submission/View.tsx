/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Flex, Text } from '@theme-ui/components'
import Header, { IHeaderProps } from './Header'
import Main, { IMainProps } from './Main'
import CommentThread, { ICommentThreadProps } from 'fora-components/Comment/CommentThread'
import { faArrowDown, faArrowUp } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Divider from 'fora-components/Divider'

interface IShowCommentsProps {
  commentsLength: number;
  showComments: boolean;
  setShowComments: any
}
const ShowComments: React.FC<IShowCommentsProps> = (props) => (
  <Flex onClick={() => props.setShowComments(!props.showComments)} sx={{ cursor: 'pointer', justifyContent: 'center', alignItems: 'center', '> svg': { mr: 2 } }}>
    <FontAwesomeIcon icon={props.showComments ? faArrowUp : faArrowDown} sx={{ color: 'seaGlass400' }}></FontAwesomeIcon>
    <Text fontFamily="secondary" variant='bodyStrong'>
      {props.showComments ? `Hide Comments` : `Show Comments (${props.commentsLength})`}
    </Text>
  </Flex>
)

type SubmissionProps =  IHeaderProps & IMainProps & ICommentThreadProps

const Submission: React.FunctionComponent<SubmissionProps> = (props) => {
  const [showComments, setShowComments] = React.useState<boolean>(false)
  return (
    <Flex sx={{ flexDirection: 'column', border: 'base', borderRadius: 2, boxShadow: 0, px: 3, py: 4 }}>
      <Header {...props} />
      <Main {...props} />
      {props.comments.length && showComments ? <CommentThread {...props} /> : null}
      {props.comments.length && showComments ? <Divider></Divider> : null}
      {props.comments.length ? <ShowComments commentsLength={props.comments.length} showComments={showComments} setShowComments={setShowComments} /> : null}
    </Flex>
  )
}

export default Submission