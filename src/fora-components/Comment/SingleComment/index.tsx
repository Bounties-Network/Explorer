import * as React from "react";
import emotionStyled from "lib/emotion-styled";
import css from "@styled-system/css";
import { Flex, Text, Link } from "rebass";
import { AvatarProps } from "fora-components/Avatar";
import AvatarImage from "fora-components/AvatarImage";
import moment from "moment";
import { faReply } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = emotionStyled(Flex)(props => css({ 
  '> :first-of-type': { mr: 3 }
}));
const DetailsContainer = emotionStyled(Flex)(props => css({ 
  '> :not(:last-child)': { mr: 1 }, mb: 2
}));
const ContentContainer = emotionStyled(Flex)(props => css({ maxWidth: '600px', mb: 3 }));
const ReplyLink = emotionStyled(Link)(props => css({ display: 'flex', alignItems: 'center', '> :first-of-type': { mr: 2, cursor: 'pointer' }, '> svg:first-of-type': { color: 'seaGlass200' } }));

export type Commenter = Pick<AvatarProps, "name" | "screenName" | "address" | "src" | "onDark">;
interface IProps {
  isReply: boolean;
  replyHref?: string;
  content: string;
  timestamp: any;
  commenter: Commenter;
}
const SingleComment: React.FunctionComponent<IProps> = props => (
  <Container>
    <Link href={`/address/${props.commenter.address}`}>
      <AvatarImage src={props.commenter.src}></AvatarImage>
    </Link>
    <Flex flexDirection="column">
      <DetailsContainer alignItems='center'>
        <ReplyLink variant='link' href={`/address/${props.commenter.address}`}>
        <Text variant='body' color='black'>{props.commenter.name}</Text>
          <Text>@{props.commenter.screenName}</Text>
        </ReplyLink>
        <Text >{` ∙ `}</Text>
        <Text variant='body' color='gray400'>{moment(props.timestamp).fromNow()}</Text>
      </DetailsContainer>
      <ContentContainer>
        <Text variant='body' color='gray500'>{props.content}</Text>
      </ContentContainer >
      {!props.isReply && (
        <ReplyLink variant='link' href={props.replyHref}>
            <FontAwesomeIcon icon={faReply}></FontAwesomeIcon>
            <Text variant='body' color='seaGlass300'>{`Reply`}</Text>
          </ReplyLink>
      )}
    </Flex>
  </Container>
);

export default SingleComment;
