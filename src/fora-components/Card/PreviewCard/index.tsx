import React from "react";
import emotionStyled from "lib/emotion-styled";
import { Flex, Card, Text, Box, Link } from "rebass";
import css from "@styled-system/css";
import Pill from "fora-components/Pill";
import FormatExpiration from "lib/format-expiration";
import { CommunityProps } from "../ExplorerCard";

const CardContainer = emotionStyled(Card)(props =>
  css({
    variant: "card",
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
    "> *": { display: "inline-block", textAlign: "left" },
    "> *:not(*:first-of-type)": { ml: 1 },
    "> a": { ml: 1 }
  })
);
const Content = emotionStyled(Flex)(() => css({ "> :first-child": { mr: 5 } }));
const ValueContainer = emotionStyled(Flex)(() =>  css({ '> :first-of-type': { mb: 1 } }) );

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
      <Flex flexDirection="column">
        <Link href={href} variant="link">
          {title}
        </Link>
        <Description>
          <Text variant="small" color="gray.400">
            <FormatExpiration variant="preview" expirationTimestamp={expirationTimestamp}></FormatExpiration>
          </Text>
          <Text variant="small" color="gray.400">
            •
          </Text>
          <Text variant="small" color="gray.400">
            {`${submissionCount} submissions`}
          </Text>
          {community !== undefined && (
            <>
              <Text variant="small" color="gray.400">
                •
              </Text>
              <Link color='gray.400' variant='linkSmall' href={community?.href}>{`f • ${community?.name}`}</Link>
            </>
          )}
        </Description>
      </Flex>
      <ValueContainer flexDirection="column">
        <Text fontFamily="secondary" variant="h5">{`$${ethInUSD}`}</Text>
        <Text fontFamily="secondary" variant="label" color="gray.400">{`${ethAmount} ETH`}</Text>
      </ValueContainer>
    </Content>
  </CardContainer>
);

export default PreviewCard;
