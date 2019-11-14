/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Textarea } from "@rebass/forms";
import { Flex, Button } from "rebass";
import emotionStyled from "lib/emotion-styled";
import css from "@styled-system/css";
import AvatarImage from "fora-components/AvatarImage";
import LoadingIcon from "assets/loading";

const Container = emotionStyled(Flex)(() =>
  css({
    "> :first-of-type": { mr: 3 }
  })
);
const FormContainer = emotionStyled(Flex)(() =>
  css({
    width: "100%",
  })
);

const CommentForm: React.FC<{
  handleCancel: any;
  handleSubmit: any;
  handleChange: any;
  value: any;
  width?: number
}> = ({ handleSubmit, handleCancel, handleChange, value, width = 400 }) => {
  const [{ loading },setState] = React.useState<{loading: boolean}>({ loading: false })

  return (
    <Container as="form" onSubmit={(e) => {
      if (e.preventDefault) e.preventDefault()
      if (value) {
        setState({ loading: true })
        const callback = () => setState({ loading: false })
        return handleSubmit(value, callback)
      }
    }}>
      <AvatarImage src={undefined}></AvatarImage>
      <FormContainer flexDirection="column">
        <Textarea
        width={width}
          value={value}
          onChange={({ target: { value } }) => {
            handleChange(value);
          }}
          rows={3}
          variant="textarea"
          placeholder="Write a comment..."
        />
        <Flex sx={{ width: '100%', '> :first-of-type': { mr: 2, ml: 'auto' } }}>
          <Button onClick={() => {
            handleChange && handleChange(null)
            handleCancel && handleCancel()
          }} variant="destructiveLink" type="button">
            Cancel
          </Button>
          <Button disabled={!Boolean(value)} variant="secondary" type="submit">
            {loading ? <LoadingIcon variant="secondary" /> : 'Submit'}
          </Button>
        </Flex>
      </FormContainer>
    </Container>
  )
};

export default CommentForm;
