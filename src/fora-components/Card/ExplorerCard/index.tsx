import * as React from "react";
import emotionStyled from "lib/emotion-styled";
import css from "@styled-system/css";
import { Card, Text, Flex, Link } from "rebass";
import Pill from "fora-components/Pill";
import Avatar, { AvatarProps } from "fora-components/Avatar";
import {
  faPeopleCarry,
  faPuzzlePiece,
  faClock,
  faArrowUp
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormatExpiration from "lib/format-expiration";

const Container = emotionStyled(Card)(props =>
  css({
    display: "flex",
    position: "relative",
    flexDirection: "row",
    width: "100%",
    padding: 4,
    "> div:first-of-type": { position: "absolute", top: -2, left: 3 }
  })
);

const MainDetails = emotionStyled(Flex)(() =>
  css({
    display: "flex",
    flexDirection: "column",
    "> :first-of-type": {
      mb: 3
    }
  })
);
const Tags = emotionStyled(Flex)(props =>
  css({ display: "flex", "> :not(:last-of-type)": { mr: 2 } })
);
const BountyMainDetails = emotionStyled(Flex)(props =>
  css({
    display: "flex",
    flexDirection: "column",
    "> :first-of-type": { mb: 3 }
  })
);
const IssuerDetails = emotionStyled(Flex)(props =>
  css({ display: "flex", flexDirection: "column" })
);
const MetaDetails = emotionStyled(Flex)(props =>
  css({
    display: "flex",
    flexDirection: "row",
    ml: "auto",
    "> :first-of-type": { mr: 6 }
  })
);
const BountyMetaDetails = emotionStyled(Flex)(props =>
  css({
    display: "flex",
    flexDirection: "column",
    "> :not(:last-child)": { mb: 2 }
  })
);
const BountyValue = emotionStyled(Flex)(props =>
  css({
    display: "flex",
    flexDirection: "column",
    "> :first-of-type": { mb: 2 }
  })
);
const MetaDetail = emotionStyled(Flex)(props =>
  css({
    alignItems: "center",
    "> svg:first-of-type": { mr: 2, color: "gray.300" },
    "> div:nth-of-type(2)": { ml: 1 },
    textAlign: "center"
  })
);

export type CommunityProps = {
  name: string;
  href: string;
};
const Community: React.FC<CommunityProps> = props => (
  <MetaDetail>
    <FontAwesomeIcon icon={faPeopleCarry}></FontAwesomeIcon>
    <Link href={props.href}>{`f • ${props.name}`}</Link>
  </MetaDetail>
);

type Tag = { tag: string; href: string };
interface IProps {
  status: string;
  title: string;
  submissionCount: number;
  href: string;
  difficulty: string;
  ethInUSD: number;
  ethValue: number;
  deadline: any;
  tags: Tag[];
  avatar: AvatarProps;
  community?: CommunityProps;
}

const ExplorerCard: React.FunctionComponent<IProps> = props => (
  <Container variant="card">
    <Pill variant={`pill.status.${props.status}`}>{props.status}</Pill>
    <MainDetails>
      <BountyMainDetails>
        <Link href={props.href}>
          <Text variant="h4">{props.title}</Text>
        </Link>
        <Tags>
          {props.tags.map(({ href, tag }) => (
            <Link href={href}>
              <Pill variant={`pill.tag.explorer`}>{tag}</Pill>
            </Link>
          ))}
        </Tags>
      </BountyMainDetails>
      <IssuerDetails>
        <Avatar {...props.avatar}></Avatar>
      </IssuerDetails>
    </MainDetails>

    <MetaDetails>
      <BountyMetaDetails>
        {props.community && <Community {...props.community}></Community>}
        {props.difficulty && (
          <MetaDetail>
            <FontAwesomeIcon icon={faPuzzlePiece}></FontAwesomeIcon>
            <Text variant="bodyStrong">{`${props.difficulty}`}</Text>
            <Text variant="bodyStrong" color={"gray.300"}>{`difficulty`}</Text>
          </MetaDetail>
        )}
        {props.deadline && (
          <MetaDetail>
            <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
            <FormatExpiration
              variant="explorer"
              expirationTimestamp={props.deadline}
            ></FormatExpiration>
          </MetaDetail>
        )}
        {props.submissionCount && (
          <MetaDetail>
            <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
            <Text variant="bodyStrong">{`${props.submissionCount}`}</Text>
            <Text variant="bodyStrong" color={"gray.300"}>{`submissions`}</Text>
          </MetaDetail>
        )}
      </BountyMetaDetails>
      <BountyValue>
        <Text
          variant="h2"
          fontWeight={"normal"}
          color="rose.200"
        >{`$${props.ethInUSD}`}</Text>
        <Text
          variant="bodyStrong"
          color="gray.400"
        >{`${props.ethValue} ETH`}</Text>
      </BountyValue>
    </MetaDetails>
  </Container>
);

export default ExplorerCard;
