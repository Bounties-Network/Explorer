/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react'
import { Textarea } from '@rebass/forms';
import { Flex, Button } from 'rebass';
import emotionStyled from 'lib/emotion-styled';
import css from '@styled-system/css';
import AvatarImage from 'fora-components/AvatarImage';

const Container = emotionStyled(Flex)(props => css({ 
  '> :first-of-type': { mr: 3 }
}));
const FormContainer = emotionStyled(Flex)(props => css({ 
  width: '100%',
  '> button': { ml: 'auto' }
}));
const TextArea = emotionStyled(Textarea)(props => css({
}));

const CommentForm: React.FC<{
  submitHandler: any
}> = ({ submitHandler }) => (
  <Container as='form' onSubmit={submitHandler}>
    <AvatarImage src={undefined}></AvatarImage>
    <FormContainer flexDirection="column">
      <TextArea rows={3} variant='textarea' placeholder='Write a comment...' />
      <Button variant='secondary' type='submit'>Submit</Button>
    </FormContainer>
  </Container>
)

export default CommentForm