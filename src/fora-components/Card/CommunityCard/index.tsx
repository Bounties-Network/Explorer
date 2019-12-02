/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import emotionStyled from "lib/emotion-styled";
import { Flex, Card, Text, Link, Button } from "@theme-ui/components";
import css from "@styled-system/css";
import AvatarImage, { AvatarImageProps } from "fora-components/AvatarImage";
import AvatarGroup from "fora-components/AvatarGroup";
import Divider from "fora-components/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/pro-regular-svg-icons";

let getResourceTypeWidth = resourceType => {
  switch (resourceType) {
    case "preview": {
      return 270;
    }
    default: {
      return 370;
    }
  }
};

const CardContainer = emotionStyled(Card)<{ resourceType: "preview" | undefined }>(props =>
  css({
    display: "flex",
    flexDirection: 'column',
    position: "relative",
    py: 3,
    px: 3,
    width: `${getResourceTypeWidth(props.resourceType)}px`,
    "> a:first-of-type": {
      position: "absolute",
      left: `calc((${getResourceTypeWidth(props.resourceType)}px / 2) - 50px)`, // lol I can still do maths
      top: "-30px"
    },
    "> div:first-of-type": {
      mt: "80px",
      mb: props.resourceType === "preview" ? 4 : 6
    }
  })
);

const Header = emotionStyled(Flex)(() => css({
  flexDirection:"column", alignItems: "center"
}));
const Content = emotionStyled(Flex)(() => css({
  flexDirection:"column",
  "> :first-child": { mb: 4 }
}));

type CommunityCardProps = {
  activeBounties;
  name;
  description;
  avatars: AvatarImageProps[];
  memberCount?: number;
  href: string;
  goToExploreRoute: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  goToJoinRoute: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  avatarSrc: string;
  resourceType?: "preview";
};
const CommunityCard: React.FC<CommunityCardProps> = ({
  activeBounties,
  name,
  description,
  avatars,
  memberCount,
  href,
  goToExploreRoute,
  goToJoinRoute,
  avatarSrc,
  resourceType
}) => (
  <CardContainer resourceType={resourceType}>
    <Link href={href}>
      <AvatarImage size={"large"} src={avatarSrc} variant="community" />
    </Link>
    <Header>
      <Link variant="link" href={href}>
        <Text color="black" variant="headingSerif" sx={{ fontSize: 'h2' }}>
          {name}
        </Text>
      </Link>
      <Text sx={{ display: "inline-block" }} variant="body" color="brandPrimary.300">
        <Text variant="bodyStrong" color="brandPrimary.300" sx={{ display: "inline-block" }}>
          {activeBounties}
        </Text>
        {` active bounties`}
      </Text>
      {resourceType === "preview" && (
        <Text sx={{ display: "inline-block" }} variant="body" color="brandPrimary.300">
          <Text variant="bodyStrong" color="brandPrimary.300" sx={{ display: "inline-block" }}>
            {memberCount}
          </Text>
          {` Members`}
        </Text>
      )}
    </Header>
    {resourceType !== "preview" && (
      <Content>
        <Text variant="body" color="brandGray.400">
          {description}
        </Text>
        <AvatarGroup avatars={avatars} href={href}></AvatarGroup>
      </Content>
    )}
    <Divider></Divider>
    <Flex sx={{  justifyContent: "space-between" }}>
      <Button onClick={goToExploreRoute} variant="secondary" sx={{ width: 'buttonWidth.lg', height: theme => theme.space[6] }}>
        Explore
      </Button>
      {resourceType !== "preview" && (
        <Button onClick={goToJoinRoute} variant="secondary.affirmative" sx={{ width: 'buttonWidth.lg', height: theme => theme.space[6] }}>
          Join
        </Button>
      )}
      {resourceType === "preview" && (
        <Button variant="secondary">
          <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
        </Button>
      )}
    </Flex>
  </CardContainer>
);

export default CommunityCard;
