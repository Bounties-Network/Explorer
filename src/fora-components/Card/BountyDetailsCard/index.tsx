import React from "react";
import emotionStyled from "lib/emotion-styled";
import { Flex, Card, Text, Link, Button } from "rebass";
import css from "@styled-system/css";
import AvatarImage, { AvatarImageProps } from "fora-components/AvatarImage";
import AvatarGroup from "fora-components/AvatarGroup";
import Divider from "fora-components/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faQuestionCircle } from "@fortawesome/pro-regular-svg-icons";
import Pill from "fora-components/Pill";

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

const CardContainer = emotionStyled(Card)(props =>
  css({
    display: "flex",
    backgroundColor: 'seaGlass500',
    variant: "card",
    flexDirection: "column",
    position: "relative",
    py: 6,
    px: 4,
    width: '170px',
    "> div:first-of-type": {
      position: "absolute",
      alignSelf: "center", // lol I can still do maths
      top: "-10px"
    },
  })
);

const Header = emotionStyled(Flex)(() => css({}));
const Content = emotionStyled(Flex)(() => css({ "> :first-of-type": { mb: 5 } }));
const ContentSection = emotionStyled(Flex)(() => css({ "> :last-of-type": { mt: 1 } }));
const PayoutTextContainer = emotionStyled(Flex)(props =>  css({ '> :first-of-type': { mr: 2 }, '> svg': { color: 'seaGlass100', mixBlendMode: 'normal' } }) );

type BountyDetailsCardProps = {
  status: string
  ethPayoutValue: number
  usdPayoutValue: number
  ethRemainingBalanceValue: number
  usdRemainingBalanceValue: number
};
const BountyDetailsCard: React.FC<BountyDetailsCardProps> = ({
  status,
  ethPayoutValue,
  usdPayoutValue,
  ethRemainingBalanceValue,
  usdRemainingBalanceValue
}) => (
  <CardContainer>
    <Pill variant={`pill.status.${status}`}>{status}</Pill>
      <Content flexDirection="column">
        <ContentSection flexDirection="column">
          <PayoutTextContainer>
            <Text css={{ mixBlendMode: 'normal' }} variant='label' color="white">Payout</Text>
            <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
          </PayoutTextContainer>
          <Text color='mustard200' variant='numeralMonospaceLarge'>{ethPayoutValue}</Text>
          <Text color='seaGlass100' variant='numeralMonospaceSmall'>${usdPayoutValue}</Text>
        </ContentSection>
        <ContentSection flexDirection="column">
          <Text css={{ mixBlendMode: 'normal' }} variant='label' color='white'>Remaining Balance</Text>
          <Text variant='numeralMonospaceLarge' color='seaGlass200'>{ethRemainingBalanceValue}</Text>
          <Text variant='numeralMonospaceSmall' color='seaGlass100'>${usdRemainingBalanceValue}</Text>
        </ContentSection>
      </Content>
  </CardContainer>
);

export default BountyDetailsCard;
