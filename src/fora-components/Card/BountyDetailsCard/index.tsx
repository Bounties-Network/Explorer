/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import emotionStyled from "lib/emotion-styled";
import { Flex, Card, Text } from "@theme-ui/components";
import css from "@styled-system/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/pro-regular-svg-icons";
import Pill from "fora-components/Pill";

let getPillVariant = status => {
  switch (status) {
    case "draft":
      return "status.draft";
    case "active":
      return "status.affirmative";
    case "completed":
      return "status.neutral";
    case "dead":
      return "status.negative";
    case "expired":
      return "status.negative";
    default:
      return "status.neutral";
  }
};

const CardContainer = emotionStyled(Card)(() =>
  css({
    display: "flex",
    backgroundColor: "brandPrimary.500",
    flexDirection: "column",
    position: "relative",
    py: 6,
    px: 4,
    width: "170px",
    "> div:first-of-type": {
      position: "absolute",
      alignSelf: "center", // lol I can still do maths
      top: "-10px"
    }
  })
);

const Content = emotionStyled(Flex)(() =>
  css({ flexDirection: "column", "> :first-of-type": { mb: 5 } })
);
const ContentSection = emotionStyled(Flex)(() =>
  css({ flexDirection: "column", "> :not(:last-of-type)": { mb: 1 } })
);
const PayoutTextContainer = emotionStyled(Flex)(() =>
  css({
    alignItems: "center",
    "> :first-of-type": { mr: 2 },
    "> svg": { color: "brandPrimary.100", mixBlendMode: "normal" }
  })
);

type BountyDetailsCardProps = {
  status: string;
  ethPayoutValue: number;
  usdPayoutValue: number;
  ethRemainingBalanceValue: number;
  usdRemainingBalanceValue: number;
};
const BountyDetailsCard: React.FC<BountyDetailsCardProps> = ({
  status,
  ethPayoutValue,
  usdPayoutValue,
  ethRemainingBalanceValue,
  usdRemainingBalanceValue
}) => (
  <CardContainer>
    <Pill variant={getPillVariant(status)}>{status}</Pill>
    <Content>
      <ContentSection>
        <PayoutTextContainer>
          <Text css={{ mixBlendMode: "normal" }} variant="label" color="white">
            Payout
          </Text>
          <FontAwesomeIcon
            sx={{ color: "brandPrimary.100" }}
            icon={faQuestionCircle}
          ></FontAwesomeIcon>
        </PayoutTextContainer>
        <Text color="brandGold.200" variant="numeric" sx={{ fontSize: "xl" }}>
          {ethPayoutValue}
        </Text>
        <Text
          color="brandPrimary.100"
          variant="numeric"
          sx={{ fontSize: "md" }}
        >
          ${usdPayoutValue}
        </Text>
      </ContentSection>
      <ContentSection flexDirection="column">
        <Text css={{ mixBlendMode: "normal" }} variant="label" color="white">
          Remaining Balance
        </Text>
        <Text
          variant="numeric"
          sx={{ fontSize: "xl" }}
          color="brandPrimary.200"
        >
          {ethRemainingBalanceValue}
        </Text>
        <Text
          variant="numeric"
          sx={{ fontSize: "md" }}
          color="brandPrimary.100"
        >
          ${usdRemainingBalanceValue}
        </Text>
      </ContentSection>
    </Content>
  </CardContainer>
);

export default BountyDetailsCard;
