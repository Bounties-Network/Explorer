/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { Fragment } from "react";
import emotionStyled from "lib/emotion-styled";
import css from "@styled-system/css";
import { Flex, Text, Link } from "@theme-ui/components";
import { AvatarProps } from "fora-components/Avatar";
import AvatarImage from "fora-components/AvatarImage";
import moment from "moment";
import { faReply } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VerticalDivider from "fora-components/VerticalDivider";

const Container = emotionStyled(Flex)(() =>
  css({
    "> :first-of-type": { mr: 3 }
  })
);
const DetailsContainer = emotionStyled(Flex)(() =>
  css({
    alignItems: "center",
    "> :not(:last-child)": { mr: 1 },
    mb: 2
  })
);
const ContentContainer = emotionStyled(Flex)(() =>
  css({
    maxWidth: "600px",
    mb: 3
  })
);
const NameLink = emotionStyled(Link)(() =>
  css({
    display: "flex",
    alignItems: "center",
    "> :first-of-type": { mr: 2, cursor: "pointer" }
  })
);

const ReplyContainer = emotionStyled(Flex)(() =>
  css({
    display: "flex",
    alignItems: "center",
    "> :first-of-type": { mr: 2, cursor: "pointer" },
    "> svg:first-of-type": { color: "brandPrimary.200" }
  })
);

export type Commenter = Pick<
  AvatarProps,
  "name" | "screenName" | "address" | "src" | "onDark"
>;
export interface ISingleCommentProps {
  isReply?: boolean;
  replyOnClickHandler?: any;
  isPreview?: boolean;
  replyHref?: string;
  content: string;
  timestamp: any;
  commenter: Commenter;
}
const SingleComment: React.FunctionComponent<ISingleCommentProps> = props => (
  <Container>
    <Link href={`/address/${props.commenter.address}`}>
      <AvatarImage src={props.commenter.src}></AvatarImage>
    </Link>
    <Flex sx={{ flexDirection: 'column' }}>
      <DetailsContainer>
        <NameLink variant="text.link" href={`/address/${props.commenter.address}`}>
          <Text variant="body" color="black">
            {props.commenter.name}
          </Text>
          <Text>@{props.commenter.screenName}</Text>
        </NameLink>
        <Text>{` ∙ `}</Text>
        <Text variant="body" color="brandGray.400">
          {moment(props.timestamp).fromNow()}
        </Text>
      </DetailsContainer>
      <ContentContainer>
        {props.isPreview ? (
          <Fragment>
            <VerticalDivider marginLeft={1}></VerticalDivider>
            <Text variant="bodyItalic" color="brandGray.500">
              {props.content}
            </Text>
          </Fragment>
        ) : (
          <Text variant="body" color="brandGray.500">
            {props.content}
          </Text>
        )}
      </ContentContainer>
      {!props.isReply && (
        <ReplyContainer onClick={props.replyOnClickHandler}>
          <FontAwesomeIcon icon={faReply}></FontAwesomeIcon>
          <Text variant="body" color="brandPrimary.300">{`Reply`}</Text>
        </ReplyContainer>
      )}
    </Flex>
  </Container>
);

export default SingleComment;
