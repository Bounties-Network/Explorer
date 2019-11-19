import React from "react";
import { css } from "@styled-system/css";
import { Flex, Text, Link, Button } from "rebass";
import Logo from "assets/logo";
import emotionStyled from "lib/emotion-styled";
import Pill from "fora-components/Pill";
import { faPlus, faBell } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarImage from "fora-components/AvatarImage";

const Container = emotionStyled(Flex)(props =>
  css({
    minWidth: "100vw",
    boxShadow: props.theme.shadows[0],
    boxSizing: "border-box",
    px: 4,
    py: 3
  })
);
const LHS = emotionStyled(Flex)(() =>
  css({
    "> :not(:last-child)": { mr: 6 }
  })
);
const RHS = emotionStyled(LHS)(() => css({ ml: "auto" }));
const NetworkDot = emotionStyled(Flex)(props =>
  css({
    variant: props.variant,
    mr: 1
  })
);
const PlusIcon = emotionStyled(FontAwesomeIcon)(() => css({ mr: 1 }));
const BellIcon = emotionStyled(FontAwesomeIcon)(() =>
  css({ color: "gray.400" })
);
const NotificationContainer = emotionStyled(Flex)(() =>
  css({
    ":hover": { "> :first-of-type": { color: "black" } },
    cursor: "pointer",
    height: "40px",
    width: "40px",
    position: "relative",
    "> *": { position: "absolute" },
    "> svg:first-of-type": {
      top: "35%",
      transform: "rotate(30deg)",
      left: "-0%"
    },
    "> div:nth-of-type(2)": { top: "20%" }
  })
);

const NotificationCount: React.FC<{ notificationCount?: number }> = ({
  notificationCount = 21
}) => (
  <NotificationContainer justifyContent={"center"} alignItems="center">
    <BellIcon size={"lg"} icon={faBell} />
    <Pill variant={"pill.notificationCount"}>
      <Text variant="smallStrong" color="white">
        {notificationCount}
      </Text>
    </Pill>
  </NotificationContainer>
);

const LoggedInRHSContent = () => (
  <>
    <Pill variant={`pill.network`}>
      <NetworkDot variant="networkDot.mainnet" />
      <Text variant="small" color={"seaGlass.400"}>
        {"Main Ethereum Network"}
      </Text>
    </Pill>
    <Button variant="tertiary">
      <PlusIcon icon={faPlus} />
      Create New Bounty
    </Button>
    <NotificationCount />
    <AvatarImage
      address={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      src={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      resourceType="user"
    />
  </>
);

const LoggedOutRHSContent = () => (
  <>
    <Pill variant={`pill.network`}>
      <NetworkDot variant="networkDot.mainnet" />
      <Text variant="small" color={"seaGlass.400"}>
        {"Main Ethereum Network"}
      </Text>
    </Pill>
    <Button variant="secondary">Log in</Button>
    <Button variant="tertiary">Sign up</Button>
  </>
);

interface IProps {
  isLoggedIn: boolean;
}
const Navbar: React.FC<IProps> = ({ isLoggedIn }) => {
  return (
    <Container flexDirection="row" alignItems="center">
      <LHS flexDirection="row" alignItems="center">
        <Logo />
        <Link variant="link">Dashboard</Link>
        <Link variant="link">Explorer Bounties</Link>
        <Link variant="link">Browse Communities</Link>
        <Link variant="link">About</Link>
      </LHS>
      <RHS flexDirection="row" alignItems="center">
        {isLoggedIn ? <LoggedInRHSContent /> : <LoggedOutRHSContent />}
      </RHS>
    </Container>
  );
};

export default Navbar;
