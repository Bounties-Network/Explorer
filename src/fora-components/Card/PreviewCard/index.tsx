import React from "react";
import emotionStyled from "lib/emotion-styled";
import { Flex, Card, Text, Box, Link } from "@theme-ui/components";
import css from "@styled-system/css";
import Pill from "fora-components/Pill";
import FormatExpiration from "lib/format-expiration";
import { CommunityProps } from "../ExplorerCard";
import typography from "theme/typography";

const CardContainer = emotionStyled(Card)(props =>
  css({
    position: "relative",
    py: 3,
    px: 3,
    "> div:first-of-type": {
      position: "absolute",
      left: props.theme.space[3],
      top: "-10px"
    }
  })
);
const Description = emotionStyled(Box)(() =>
  css({
    "> *": {
      display: "inline-block",
      textAlign: "left",
      ...typography.text.body,
      fontSize: "xs"
    },
    "> *:not(*:first-of-type)": { ml: 1 },
    "> a": { ml: 1 }
  })
);
const Content = emotionStyled(Flex)(() => css({ "> :first-child": { mr: 5 } }));
const ValueContainer = emotionStyled(Flex)(() =>
  css({ "> *:first-of-type": { mb: 2 }, flexDirection: "column" })
);

type PreviewCardProps = {
  href: string;
  title: string;
  expirationTimestamp: any;
  submissionCount: number;
  status: string;
  ethInUSD: number;
  ethAmount: number;
  community?: CommunityProps;
};
const PreviewCard: React.FC<PreviewCardProps> = ({
  href,
  title,
  expirationTimestamp,
  submissionCount,
  status,
  community,
  ethInUSD,
  ethAmount
}) => (
  <CardContainer>
    <Pill variant={`pill.status.${status}`} resourceType={status} />
    <Content>
      <Flex sx={{ flexDirection: "column" }}>
        <Link href={href} variant="text.link">
          {title}
        </Link>
        <Description>
          <Text color="brandGray.400">
            <FormatExpiration
              variant="preview"
              expirationTimestamp={expirationTimestamp}
            ></FormatExpiration>
          </Text>
          <Text color="brandGray.400">•</Text>
          <Text color="brandGray.400">{`${submissionCount} submissions`}</Text>
          {community !== undefined && (
            <>
              <Text color="brandGray.400">•</Text>
              <Link
                variant="text.link"
                href={community?.href}
              >{`f • ${community?.name}`}</Link>
            </>
          )}
        </Description>
      </Flex>
      <ValueContainer>
        <Text
          variant="headingSans"
          color="black"
          sx={{ fontWeight: "semiBold" }}
        >{`$${ethInUSD}`}</Text>
        <Text variant="label" color="brandGray.400">{`${ethAmount} ETH`}</Text>
      </ValueContainer>
    </Content>
  </CardContainer>
);

export default PreviewCard;
