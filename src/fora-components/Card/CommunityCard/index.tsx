/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Card, Text, Link } from "@theme-ui/components";
import AvatarImage, { AvatarImageProps } from "fora-components/AvatarImage";
import AvatarGroup from "fora-components/AvatarGroup";
import Button from "fora-components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/pro-regular-svg-icons";

type CardContainerProps = Pick<CommunityCardProps, "isMember">;
const CardContainer: React.FC<CardContainerProps> = props => (
  <Card
    {...props}
    sx={{
      display: "flex",
      flexDirection: "column",
      p: 0,
      width: "100%"
    }}
  />
);

const CardHeader = props => (
  <header
    {...props}
    sx={{
      display: "flex",
      flexDirection: "column",
      position: "relative",
      alignItems: "center",
      px: 4,
      mb: 4
    }}
  />
);

const CardMain = props => (
  <main
    {...props}
    sx={{
      display: "flex",
      flexDirection: "column",
      p: 4,
      "> :first-child": { mb: 4 }
    }}
  />
);

const CardFooter = props => (
  <footer
    {...props}
    sx={{ alignItems: "stretch", borderTop: "base", display: "flex", p: 4 }}
  />
);

type CommunityCardProps = {
  activeBounties;
  name;
  description;
  avatars: AvatarImageProps[];
  memberCount?: number;
  href: string;
  goToExploreRoute: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  goToJoinRoute: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  avatarSrc: string;
  isMember?: boolean;
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
  isMember
}) => (
  <CardContainer isMember={isMember}>
    <CardHeader>
      <AvatarImage
        src={avatarSrc}
        variant="community"
        size="large"
        sx={{ transform: "translateY(-40%)" }}
      />
      <Text
        variant="headingSerif"
        href={href}
        sx={{ fontSize: "h2", lineHeight: "small", textAlign: "center" }}
      >
        {name}
      </Text>
      <Link sx={{ fontSize: "base", mt: 2 }}>
        <Text
          as="span"
          sx={{ color: "brandPrimary.400", fontWeight: "medium" }}
        >
          {activeBounties}
        </Text>
        {" active bounties"}
      </Link>
      {isMember ? (
        <Link sx={{ fontSize: "base", mt: 2 }}>
          <Text
            as="span"
            sx={{ color: "brandPrimary.400", fontWeight: "medium" }}
          >
            {memberCount}
          </Text>
          {" members"}
        </Link>
      ) : null}
    </CardHeader>
    {!isMember ? (
      <CardMain>
        <Text variant="body" color="brandGray.400">
          {description}
        </Text>
        <AvatarGroup avatars={avatars} href={href}></AvatarGroup>
      </CardMain>
    ) : null}
    <CardFooter>
      <Button
        onClick={goToExploreRoute}
        variant="secondary"
        fullWidth
        sx={{ mr: 4 }}
      >
        Explore
      </Button>
      {!isMember ? (
        <Button
          onClick={goToJoinRoute}
          variant="secondary.affirmative"
          fullWidth
        >
          Join
        </Button>
      ) : null}
      {isMember ? (
        <Button variant="secondary">
          <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
        </Button>
      ) : null}
    </CardFooter>
  </CardContainer>
);

export default CommunityCard;
