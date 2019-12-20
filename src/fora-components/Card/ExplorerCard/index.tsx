/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import emotionStyled from "lib/emotion-styled";
import css from "@styled-system/css";
import { Card, Text, Flex, Link } from "@theme-ui/components";
import Pill from "fora-components/Pill";
import Avatar, { AvatarProps } from "fora-components/Avatar";
import { faPeopleCarry, faPuzzlePiece, faClock, faArrowUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormatExpiration from "lib/format-expiration";
import { getStatusPillVariant } from "../../../utils/helpers";

const Container = emotionStyled(Card)(() =>
  css({
    display: "flex",
    background: "white",
    position: "relative",
    flexDirection: "row",
    width: "100%",
    padding: 4,
    "> div:first-of-type": { position: "absolute", top: -3, left: 3 }
  })
);

const MainDetails = emotionStyled(Flex)(() =>
  css({
    flexDirection: "column",
    maxWidth: "60%",
    "> :first-of-type": {
      mb: 3
    }
  })
);
const Tags = emotionStyled(Flex)(() =>
  css({
    display: "flex",
    flexWrap: "wrap",
    mt: -1,
    "> :not(:last-of-type)": { mr: 2, mb: 1 }
  })
);
const BountyMainDetails = emotionStyled(Flex)(() =>
  css({
    display: "flex",
    flexDirection: "column",
    "> a:first-of-type": { mb: 3 }
  })
);
const IssuerDetails = emotionStyled(Flex)(() => css({ display: "flex", flexDirection: "column" }));
const MetaDetails = emotionStyled(Flex)(() =>
  css({
    display: "flex",
    flexDirection: "row",
    ml: "auto",
    "> :first-of-type": { mr: 6 }
  })
);
const BountyMetaDetails = emotionStyled(Flex)(() =>
  css({
    display: "flex",
    flexDirection: "column",
    "> :not(:last-child)": { mb: 2 }
  })
);
const BountyValue = emotionStyled(Flex)(() =>
  css({
    display: "flex",
    flexDirection: "column",
    "> :first-of-type": { mb: 2 }
  })
);
const MetaDetail = emotionStyled(Flex)(() =>
  css({
    alignItems: "center",
    "> svg:first-of-type": { mr: 2, color: "brandGray.300" },
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
    <FontAwesomeIcon sx={{ color: "brandGray.300" }} icon={faPeopleCarry}></FontAwesomeIcon>
    <Link variant="text.link" href={props.href}>{`f • ${props.name}`}</Link>
  </MetaDetail>
);

interface IProps {
  status: string;
  title: string;
  submissionCount: number;
  href: string;
  difficulty: string | null;
  token: string;
  tokenInUSD: number;
  tokenValue: number;
  deadline: any;
  tags: string[];
  avatar: AvatarProps;
  currentTags?: string[];
  community?: CommunityProps;
  handleTagClick?: (tag: string) => void;
}
const ExplorerCard: React.FunctionComponent<IProps> = props => (
  <Container>
    <Pill variant={getStatusPillVariant(props.status)}>
      <Text variant="body">{props.status}</Text>
    </Pill>
    <MainDetails>
      <BountyMainDetails>
        <Link variant="text.link" href={props.href}>
          <Text variant="headingSans" sx={{ fontSize: "h5" }}>
            {props.title}
          </Text>
        </Link>
        <Tags>
          {props.tags.map(tag => (
            <Pill
              key={tag}
              onClick={() => props.handleTagClick && props.handleTagClick(tag.toLowerCase())}
              variant={`tag.explorer${
                Array.isArray(props.currentTags) &&
                props.currentTags.map(tag => tag.toLowerCase()).includes(tag.toLowerCase())
                  ? ".active"
                  : ""
              }`}
            >
              <Text variant="body">{tag}</Text>
            </Pill>
          ))}
        </Tags>
      </BountyMainDetails>
      <IssuerDetails>
        <Link variant="text.link" href={`/profile/${props.avatar.address}`}>
          <Avatar {...props.avatar}></Avatar>
        </Link>
      </IssuerDetails>
    </MainDetails>

    <MetaDetails>
      <BountyMetaDetails>
        {props.community && <Community {...props.community}></Community>}
        {props.difficulty && (
          <MetaDetail>
            <FontAwesomeIcon sx={{ color: "brandGray.300" }} icon={faPuzzlePiece}></FontAwesomeIcon>
            <Text variant="body" sx={{ fontWeight: "medium" }}>{`${props.difficulty}`}</Text>
            <Text variant="body" color={"brandGray.300"}>{`difficulty`}</Text>
          </MetaDetail>
        )}
        {props.deadline && (
          <MetaDetail>
            <FontAwesomeIcon sx={{ color: "brandGray.300" }} icon={faClock}></FontAwesomeIcon>
            <FormatExpiration variant="explorer" expirationTimestamp={props.deadline}></FormatExpiration>
          </MetaDetail>
        )}
        <MetaDetail>
          <FontAwesomeIcon sx={{ color: "brandGray.300" }} icon={faArrowUp}></FontAwesomeIcon>
          <Text variant="body" sx={{ fontWeight: "medium" }}>{`${props.submissionCount}`}</Text>
          <Text variant="body" color={"brandGray.300"}>{`submissions`}</Text>
        </MetaDetail>
      </BountyMetaDetails>
      <BountyValue>
        <Text
          variant="numeric"
          sx={{
            fontSize: "h2",
            fontWeight: "normal"
          }}
          color="brandDestructive.200"
        >{`$${props.tokenInUSD}`}</Text>
        <Text
          variant="body"
          sx={{
            fontWeight: "medium",
            textTransform: "capitalize"
          }}
          color="black"
        >{`${props.tokenValue} ${props.token}`}</Text>
      </BountyValue>
    </MetaDetails>
  </Container>
);

export default ExplorerCard;
