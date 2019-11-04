import React from "react";
import emotionStyled from "lib/emotion-styled";
import { Flex, Card, Text, Link, Button } from "rebass";
import css from "@styled-system/css";
import AvatarImage, { AvatarImageProps } from "fora-components/AvatarImage";
import AvatarGroup from "fora-components/AvatarGroup";
import Divider from "fora-components/Divider";

const CardContainer = emotionStyled(Card)(() =>
  css({
    variant: "card",
    position: "relative",
    py: 3,
    px: 3,
    maxWidth: "370px",
    "> a:first-of-type": {
      position: "absolute",
      left: "calc((370px / 2) - 50px)", // lol I can still do maths
      top: "-30px"
    },
    "> div:first-of-type": {
      mt: "80px",
      mb: 6
    }
  })
);

const Header = emotionStyled(Flex)(() => css({}));
const Content = emotionStyled(Flex)(() => css({ "> :first-child": { mb: 4 } }));

type CommunityCardProps = {
  activeBounties;
  name;
  description;
  avatars: AvatarImageProps[];
  href: string;
  goToExplorerRoute: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  goToJoinRoute: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  avatarSrc: string;
};
const CommunityCard: React.FC<CommunityCardProps> = ({
  activeBounties,
  name,
  description,
  avatars,
  href,
  goToExplorerRoute,
  goToJoinRoute,
  avatarSrc
}) => (
  <CardContainer>
    <Link href={href}>
      <AvatarImage variant={"large"} src={avatarSrc} resourceType="community" />
    </Link>
    <Header flexDirection="column" alignItems={"center"}>
      <Link variant="link" href={href}>
        <Text color="#000000" fontFamily="primary" variant="h2">
          {name}
        </Text>
      </Link>
      <Text variant="body" color="seaGlass300">
        {`${activeBounties} active bounties`}
      </Text>
    </Header>
    <Content flexDirection="column">
      <Text variant="body" color="gray400">
        {description}
      </Text>
      <AvatarGroup avatars={avatars} href={href}></AvatarGroup>
    </Content>
    <Divider></Divider>
    <Flex justifyContent={"space-between"}>
      <Button onClick={goToExplorerRoute} width="150px" variant="secondary">
        Explorer
      </Button>
      <Button onClick={goToJoinRoute} width="150px" variant="secondaryAffirmative">
        Join
      </Button>
    </Flex>
  </CardContainer>
);

export default CommunityCard;
