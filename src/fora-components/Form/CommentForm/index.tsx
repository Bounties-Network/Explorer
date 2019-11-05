import React from 'react'
import { Textarea } from '@rebass/forms';
import { Flex, Button } from 'rebass';
import emotionStyled from 'lib/emotion-styled';
import css from '@styled-system/css';
import AvatarImage from 'fora-components/AvatarImage';

const Container = emotionStyled(Flex)(props => css({ 
  
}));
const FormContainer = emotionStyled(Flex)(props => css({ 
  width: '100%',
  '> button': { ml: 'auto' }
}));

const CommentForm: React.FC<{
  submitHandler: any
}> = () => (
  <Container as='form' onSubmit={() => alert('submitted')}>
    <AvatarImage src={undefined}></AvatarImage>
    <FormContainer flexDirection="column">
      <Textarea placeholder='Write a comment...'></Textarea>
      <Button variant='secondary' type='submit'>Submit</Button>
    </FormContainer>
  </Container>
)

export default CommentForm