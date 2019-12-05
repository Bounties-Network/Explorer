import React from "react";
import moment from "moment";
import emotionStyled from "./emotion-styled";
import css from "@styled-system/css";
import { Text, Flex } from "@theme-ui/components";

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "a few seconds",
    ss: "%dsecs",
    m: "a minute",
    mm: "%dmins",
    h: "an hour",
    hh: "%dhr",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months ago",
    y: "a year",
    yy: "%dy"
  }
});

const MetaDetail = emotionStyled(Flex)(() => css({}));

type NotExpiredVariants = "preview" | "explorer";

const NotExpired: React.FC<{
  variant?: NotExpiredVariants;
  expirationTimestamp: any;
}> = props => {
  switch (props.variant) {
    case "preview": {
      return (
        <MetaDetail>
          <Text variant="small" color="brandGray.400">{`${moment(
            props.expirationTimestamp
          ).fromNow(true)} remaining`}</Text>
        </MetaDetail>
      );
    }
    default: {
      return (
        <MetaDetail>
          <Text variant="small" sx={{ fontWeight: "medium" }}>
            {moment(props.expirationTimestamp).fromNow(true)}
          </Text>
          <Text
            variant="small"
            sx={{ fontWeight: "medium" }}
            color="brandGray.300"
          >
            remaining
          </Text>
        </MetaDetail>
      );
    }
  }
};

const Expired: React.FC<{
  variant?: NotExpiredVariants;
  expirationTimestamp: any;
}> = props => {
  switch (props.variant) {
    case "preview": {
      return (
        <MetaDetail>
          <Text variant="small" color="gray.400">{`Expired ${moment(
            props.expirationTimestamp
          ).fromNow(false)}`}</Text>
        </MetaDetail>
      );
    }
    default: {
      return (
        <MetaDetail>
          <Text variant="smallStrong">Expired</Text>
          <Text variant="smallStrong" color="gray.300">
            {moment(props.expirationTimestamp).fromNow(false)}
          </Text>
        </MetaDetail>
      );
    }
  }
};

type FormatExpirationProps = {
  variant: NotExpiredVariants;
  expirationTimestamp: any;
};

const FormatExpiration: React.FC<FormatExpirationProps> = props => {
  return moment(props.expirationTimestamp).isSameOrAfter(Date.now()) ? (
    <NotExpired {...props} />
  ) : (
    <Expired {...props}></Expired>
  );
};

export default FormatExpiration;
