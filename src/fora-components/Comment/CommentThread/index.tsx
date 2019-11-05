import * as React from 'react'
import emotionStyled from 'lib/emotion-styled';
import SingleComment, { ISingleCommentProps } from '../SingleComment';
import { Flex } from 'rebass';
import css from '@styled-system/css';

const Container = emotionStyled(Flex)(props => css({ 
  '> :not(:first-of-type)': { 
    pl: '56px' // mm 40 + 16
  },
  '> :not(:last-of-type)': { 
    mb: 5
  }
 }) );

interface IProps { 
  comments: ISingleCommentProps[]
 }

const CommentThread: React.FunctionComponent<IProps> = (props) => (
  <Container flexDirection="column">
    {Array.isArray(props.comments) && 
      props.comments.map(
        (comment, index) =>
          <SingleComment isReply={Boolean(index)} {...comment} />
      )
    }
  </Container>
)

export default CommentThread