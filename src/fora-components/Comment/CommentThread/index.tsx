/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import emotionStyled from "lib/emotion-styled";
import SingleComment, { ISingleCommentProps } from "../SingleComment";
import { Flex } from "rebass";
import css from "@styled-system/css";
import VerticalDivider from "fora-components/VerticalDivider";
import CommentForm from "fora-components/Form/CommentForm";
import Divider from "fora-components/Divider";

const Container = emotionStyled(Flex)(props =>
  css({
    position: "relative"
  })
);
const CommentsContainer = emotionStyled(Flex)(props =>
  css({
    "> *:not(:first-of-type)": {
      pl: "56px" // mm 40 + 16
    },
    "> *:not(:last-of-type)": {
      mb: 5
    }
  })
);

const Content = emotionStyled(Flex)(props =>
  css({
    position: "relative",
    "> div:first-of-type": {
      position: "absolute",
      left: "2px",
      top: "60px",
      height: "calc(100% - 80px)",
      minHeight: "unset !important"
    }
  })
);

interface IProps {
  comments: ISingleCommentProps[];
  replySubmitHandler: any;
}

const CommentThread: React.FunctionComponent<IProps> = props => {
  const [isReplyOpen, setState] = React.useState<boolean>(true);

  return (
    <Container flexDirection="row">
      <Content flexDirection="row">
        <VerticalDivider></VerticalDivider>
        <CommentsContainer flexDirection="column">
          {Array.isArray(props.comments) &&
            props.comments.map((comment, index) => {
              if (index === 1 && isReplyOpen) {
                return (
                  <div >
                    <Divider marginTop={'0'}></Divider>
                    <CommentForm submitHandler={props.replySubmitHandler} />
                    <Divider></Divider>
                    <SingleComment replyOnClickHandler={() => setState(true)} isReply={Boolean(index)} {...comment} />
                  </div>
                );
              }
              return <SingleComment replyOnClickHandler={() => setState(true)} isReply={Boolean(index)} {...comment} />;
            })}
        </CommentsContainer>
      </Content>
    </Container>
  );
};

export default CommentThread;
