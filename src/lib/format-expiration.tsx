import React from "react";
import moment from "moment";
import emotionStyled from "./emotion-styled";
import css from "@styled-system/css";
import { Text, Flex } from "@theme-ui/components";

const MetaDetail = emotionStyled(Flex)(() =>
  css({ "> :first-of-type": { mr: 1 }, textAlign: "center" })
);

type NotExpiredVariants = "preview" | "explorer";

const NotExpired: React.FC<{
  variant?: NotExpiredVariants;
  expirationTimestamp: any;
}> = props => {
  switch (props.variant) {
    case "preview": {
      return (
        <MetaDetail>
          <Text variant="body" color="brandGray.400">{`${moment(
            props.expirationTimestamp
          ).fromNow(true)} remaining`}</Text>
        </MetaDetail>
      );
    }
    default: {
      return (
        <MetaDetail>
          <Text variant="body" sx={{ fontWeight: 'medium' }}>
            {moment(props.expirationTimestamp).fromNow(true)}
          </Text>
          <Text variant="body" sx={{ fontWeight: 'medium' }} color="brandGray.300">
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
          <Text variant="bodyStrong">Expired</Text>
          <Text variant="bodyStrong" color="gray.300">
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
