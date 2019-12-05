/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { Fragment } from "react";
import { Flex, Card, Text, Box, Link } from "@theme-ui/components";
import Pill from "fora-components/Pill";
import FormatExpiration from "lib/format-expiration";
import { CommunityProps } from "../ExplorerCard";
import { getStatusPillVariant } from "../../../utils/helpers";

const CardContainer = props => (
  <Card
    {...props}
    sx={{
      position: "relative",
      pt: 4,
      pb: 3,
      px: 3,
      "> div:first-of-type": {
        position: "absolute",
        left: 3,
        top: "-10px"
      }
    }}
  />
);

const CardContent = props => (
  <Flex {...props} sx={{ justifyContent: "space-between" }} />
);

const Title = props => (
  <Link {...props} sx={{ mb: 2, fontSize: "base", fontWeight: "medium" }} />
);

const Metadata = props => (
  <Box
    {...props}
    sx={{
      "> *": {
        color: "brandGray.400",
        display: "inline-block",
        fontSize: "small"
      }
    }}
  />
);

const ValueContainer = props => (
  <Flex
    {...props}
    sx={{ flexDirection: "column", ml: 4, textAlign: "right" }}
  />
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
    <Pill variant={getStatusPillVariant(status)}>{status}</Pill>
    <CardContent>
      <Flex sx={{ flexDirection: "column", justifyContent: "space-between" }}>
        <Title href={href}>{title}</Title>
        <Metadata>
          <FormatExpiration
            variant="preview"
            expirationTimestamp={expirationTimestamp}
          ></FormatExpiration>
          <Text as="span">・</Text>
          <Text>{`${submissionCount} submissions`}</Text>
          {community !== undefined && (
            <Fragment>
              <Text as="span">・</Text>
              <Link href={community?.href}>{`f/${community?.name}`}</Link>
            </Fragment>
          )}
        </Metadata>
      </Flex>
      <ValueContainer>
        <Text
          variant="bodyStrong"
          sx={{
            color: "black",
            lineHeight: "reset",
            mb: 2
          }}
        >
          {`${ethInUSD} `}
          <Text as="span" sx={{ fontSize: "small" }}>
            USD
          </Text>
        </Text>
        <Text variant="small" color="brandGray.400">
          {`${ethAmount} `}
          <Text as="span" sx={{ fontSize: "small" }}>
            ETH
          </Text>
        </Text>
      </ValueContainer>
    </CardContent>
  </CardContainer>
);

export default PreviewCard;
