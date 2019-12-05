import React from "react";
import moment from "moment";
import { Text } from "@theme-ui/components";

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

type NotExpiredVariants = "preview" | "explorer";

const NotExpired: React.FC<{
  variant?: NotExpiredVariants;
  expirationTimestamp: any;
}> = props => {
  switch (props.variant) {
    case "preview": {
      return (
        <React.Fragment>
          <Text variant="small" color="brandGray.400">{`${moment(
            props.expirationTimestamp
          ).fromNow(true)} remaining`}</Text>
        </React.Fragment>
      );
    }
    default: {
      return (
        <React.Fragment>
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
        </React.Fragment>
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
        <React.Fragment>
          <Text variant="small" color="gray.400">{`Expired ${moment(
            props.expirationTimestamp
          ).fromNow(false)}`}</Text>
        </React.Fragment>
      );
    }
    default: {
      return (
        <React.Fragment>
          <Text variant="smallStrong">Expired</Text>
          <Text variant="smallStrong" color="gray.300">
            {moment(props.expirationTimestamp).fromNow(false)}
          </Text>
        </React.Fragment>
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
