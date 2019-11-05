import * as React from 'react'
import emotionStyled from 'lib/emotion-styled';
import SingleComment, { ISingleCommentProps } from '../SingleComment';
import { Flex, Box } from 'rebass';
import css from '@styled-system/css';
import VerticalDivider from 'fora-components/VerticalDivider';

const Container = emotionStyled(Flex)(props => css({ 
  position: 'relative',
})
);
const CommentsContainer = emotionStyled(Flex)(props => css({ 
  '> div:not(:first-of-type)': { 
    pl: '56px' // mm 40 + 16
  },
  '> div:not(:last-of-type)': { 
    mb: 5
  },
  })
);
const Content = emotionStyled(Flex)(props => css({
  position: 'relative',
  '> div:first-of-type': { 
    position: 'absolute',
    zIndex: -1,
    left: '2px',
    top: '60px'
  }
}));

interface IProps { 
  comments: ISingleCommentProps[]
 }

const CommentThread: React.FunctionComponent<IProps> = (props) => (
  <Container flexDirection="row">
    <Content flexDirection="row">
    <VerticalDivider height='calc(100% - 80px)'></VerticalDivider>
    <CommentsContainer flexDirection="column">
    {Array.isArray(props.comments) && 
      props.comments.map(
        (comment, index) =>
        <SingleComment isReply={Boolean(index)} {...comment} />
        )
      }
      </CommentsContainer >
      </Content >
  </Container>
)

export default CommentThread